import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import _ from "lodash";
import { Droppable } from "react-beautiful-dnd";

import { Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Box, Card, Container, Grid, Stack, Typography } from "@mui/material";
import TaskCard from "./TaskCard";
import { getSingleTask, getTaskOfId } from "./taskSlice";
import { updateUserProfile } from "../user/userSlice";
import useAuth from "../../hooks/useAuth";

function TaskList() {
  const {user} = useAuth;
  const { personalTask } = useSelector((state) => state.task);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTaskOfId());
  }, [dispatch]);

  const PENDING = [];
  const REVIEW = [];
  const WORKING = [];
  const DONE = [];
  const ARCHIVE = [];

  useEffect(() => {
    personalTask.forEach((task) => {
      if (task?.status === "PENDING") {
        PENDING.push(task);
      }
      if(task?.status === "WORKING") {
        WORKING.push(task);
      }
      if(task?.status === "REVIEW") {
        REVIEW.push(task);
      }
      if(task?.status === "DONE") {
        DONE.push(task);
      }
      if(task?.status === "ARCHIVE") {
        ARCHIVE.push(task);
      }
      setState({
        PENDING: {
          title: "Pending",
          items: PENDING,
        },
        WORKING: {
          title: "In Processing",
          items: WORKING,
        },
        REVIEW: {
          title: "Reviewing",
          items: WORKING,
        },
        DONE: {
          title: "Complete",
          items: DONE,
        },
        ARCHIVE: {
          title: "Archive",
          items: ARCHIVE,
        },
      });
    });
  }, [personalTask]);

  const [state, setState] = useState({
    PENDING: {
      title: "PENDING",
      items: PENDING,
    },
    WORKING: {
      title: "In Processing",
      items: WORKING,
    },
    REVIEW: {
      title: "Reviewing",
      items: WORKING,
    },
    DONE: {
      title: "Complete",
      items: DONE,
    },
    ARCHIVE: {
      title: "Archive",
      items: ARCHIVE,
    },
  });

  const handleDragEnd = ({ destination, source }) => {
    if (!destination) {
      return;
    }
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    }
    if (source.droppableId === "PENDING" && destination.droppableId === "WORKING") {
      return;
    }
    if (source.droppableId === "WORKING" && destination.droppableId === "REVIEW") {
      return;
    }
    if (source.droppableId === "REVIEW" && destination.droppableId === "WORKING") {
      return;
    }
    if (source.droppableId === "REVIEW" && destination.droppableId === "DONE") {
      return;
    }
    if (source.droppableId === "DONE" && destination.droppableId === "REVIEW") {
      return;
    }
    if (source.droppableId === "DONE" && destination.droppableId === "ARCHIVE") {
      return;
    }

    const itemCopy = { ...state[source.droppableId].items[source.index] };
    setState((prev) => {
      prev = { ...prev };

      prev[source.droppableId].items.splice(source.index, 1);

      prev[destination.droppableId].items.splice(
        destination.index,
        0,
        itemCopy
      );
      if (
        source.droppableId === "WORKING" &&
        destination.droppableId === "REVIEW"
      ) {
        dispatch(updateUserProfile(itemCopy._id, "REVIEW"));
      }

      return prev;
    });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        <Card
          sx={{
            p: 3,
            backgroundColor: "background",
            boxShadow: "none",
            minHeight: "100vh",
            color:"#616161"
          }}
        >
          <Container>
            <Grid container spacing={3}>
              <DragDropContext onDragEnd={handleDragEnd}>
                {_.map(state, (tasks, key) => {
                  return (
                    <Grid item xs={4} key={key}>
                      <Typography variant="h5" sx={{ p: "10px 0px" }}>
                        {tasks?.title}
                      </Typography>
                      <Droppable droppableId={key}>
                        {(provided) => {
                          return (
                            <Card
                              component="div"
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              className={"droppable-col"}
                              sx={{
                                backgroundColor: "transparent",
                                boxShadow: "none",
                              }}
                            >
                              {tasks.items.map((el, index) => {
                                return (
                                  <Draggable
                                    key={el._id}
                                    index={index}
                                    draggableId={el._id}
                                  >
                                    {(provided) => {
                                      return (
                                        <Stack

                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                        >
                                          <TaskCard
                                            user={el.handler}
                                            task={el}
                                          />
                                        </Stack>
                                      );
                                    }}
                                  </Draggable>
                                );
                              })}
                              {provided.placeholder}
                            </Card>
                          );
                        }}
                      </Droppable>
                    </Grid>
                  );
                })}
              </DragDropContext>
            </Grid>
          </Container>
        </Card>
      </Grid>
    </Grid>
  );
}

export default TaskList;
