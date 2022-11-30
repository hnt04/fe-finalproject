import React, {useState, useEffect} from "react";
import {
  Grid,
  Box,
  Card,
  Stack,
  Modal,
  Typography,
  Link,
  Container,
  Button,
} from "@mui/material";
import { useDispatch,useSelector } from "react-redux";
// import AuthRequiredHR from "../../routes/AuthRequiredHR";
import useAuth from "../../hooks/useAuth";
import { getUsers } from "../user/userSlice";
import TaskForm from "./TaskForm";
import AddIcon from '@mui/icons-material/Add';
import { getTasks } from "./taskSlice";
import PaginationTool from "../member/Pagination";
import Skeleton from "@mui/material/Skeleton";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "80vw",
  bgcolor: '#ffff',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function CreateTask() {
  const {user} = useAuth();
  console.log("user1", user)
  const [open, setOpen] = useState(false);

  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = React.useState();


  const dispatch = useDispatch();
  const { currentPageUsers, usersById, totalUsers } = useSelector(
    (state) => state.user
  );

  const { currentPageTasks, tasksById } = useSelector(
    (state) => state.task
  );

  const users = currentPageUsers.map((userId) => usersById[userId]);

  const tasks = currentPageTasks.map((taskId) => tasksById[taskId]);
  console.log(tasks)

  useEffect(() => {
    dispatch(getUsers({ filterName, page: page, limit: rowsPerPage }));
  }, [dispatch, filterName, page, rowsPerPage]);

  useEffect(() => {
    dispatch(getTasks({ page: page, limit: rowsPerPage }));
  }, [dispatch, page, rowsPerPage]);

    const handleOpen = () => {
      setOpen(true);
      };

    const handleClose = () => {
      setOpen(false);
    }

  const placeholder = [0, 1, 2, 3];
  const detailSkeleton = (
      <Stack spacing={1}>
        <Skeleton variant="text" />
        <Skeleton variant="rectangular" width="100%" height={300} />
      </Stack>
    );

  return (
    <Stack width="100%">
      <Typography
        variant="h4"
        sx={{
          color: "#616161",
          fontWeight: "700",
          // paddingLeft: "2%",
          textAlign: "center",
        }}
        gutterBottom
      >
        Company's Tasks
      </Typography>
        <Button  onClick={handleOpen} sx={{ width:"20px",fontSize: "20px", marginRight:"10px", display:"flex", alignSelf:"center" }} size="small" variant="contained" color="success">
            <AddIcon />
        </Button>
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <TaskForm users={users}/>
          </Box>
        </Modal>
        <Container sx={{marginTop:"20px"}}>
          <PaginationTool
            page={page}
            setPageNum={setPage}
          />
        <Grid
              container
              maxWidth="1818px"
              spacing={{ xs: 0, md: 4 }}
              columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}
            >
              {tasks.map((task) => (
                <Grid
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    paddingLeft: "0!important",
                    
                  }}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                >
                  <Card
                    sx={{
                      // width: "12rem",
                      height: "10rem",
                      textDecoration: "none",
                      textAlign:"center",
                      width:"320px",
                      paddingLeft:"5px",
                      border: '1px solid white',
                      paddingTop:"50px"
                    }}
                    elevation={0}
                  >
                      <Typography variant="small" color="gray">
                        Task Name: {`${task?.task_name}`}
                      </Typography>
                      <br />
                      <Typography variant="small" color="gray">
                        Description: {`${task?.description}`}
                      </Typography>
                      <br />
                      <Typography variant="small" color="gray">
                        Status: {`${user?.status}`}
                      </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
        </Container>
      </Stack>
  );
}

export default CreateTask;
