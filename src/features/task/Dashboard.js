import React, { useEffect, useState } from "react";
import AssignmentIcon from "@mui/icons-material/Assignment";
import TaskAllList from "./TaskAllList";
import {
  Box,
  Tab,
  Tabs,
  Grid,
  useMediaQuery,
  Typography,
  Badge,
} from "@mui/material";
import { capitalCase } from "change-case";
import { useSelector } from "react-redux";
// import { getStatusCount } from "../features/task/taskSlice";
import { useDispatch } from "react-redux";
import TaskList from "./TaskList";

function Dashboard() {
  const [currentTab, setCurrentTab] = useState("dashboard");
  const mediumViewport = useMediaQuery("(min-width:1024px)");

  const { countStatusType } = useSelector((state) => state.task);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getStatusCount());
  // }, [dispatch]);

  const handleChangeTab = (newValue) => {
    setCurrentTab(newValue);
  };

  const PROFILE_TABS = [
    // {
    //   value: "planner",
    //   icon: (
    //     <Badge badgeContent={countStatusType.review} color="error" showZero>
    //       <AssignmentIcon sx={{ fontSize: 24 }} />
    //     </Badge>
    //   ),
    //   component: <TaskAllList />,
    // },
    {
      value: "planner",
      icon: (
        <Badge color="error" showZero>
          <AssignmentIcon sx={{ fontSize: 24 }} />
        </Badge>
      ),
      component: <TaskList />,
    },
  ];

  return (
    <Grid container style={{ backgroundColor: "#FFCB05" }}>
      <Grid item md={2} sm={12}>
        <Tabs
          value={currentTab}
          scrollButtons="auto"
          orientation={mediumViewport ? "vertical" : "horizontal"}
          variant="scrollable"
          indicatorColor="primary"
          allowScrollButtonsMobile
          onChange={(e, value) => handleChangeTab(value)}
          style={{ backgroundColor: "#FFCB05" }}
        >
          {PROFILE_TABS.map((tab) => (
            <Tab
              disableRipple
              key={tab.value}
              value={tab.value}
              icon={tab.icon}
              label={<Typography>{capitalCase(tab.value)}</Typography>}
              iconPosition="start"
            />
          ))}
        </Tabs>
      </Grid>
      <Grid item md={10} sm={12}>
        {/* <Box sx={{ mb: 5 }} /> */}

        {PROFILE_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return (
            isMatched && (
              <Box
                sx={{ backgroundColor: "primary.lighter" }}
                key="{tab.value}"
              >
                {tab.component}
              </Box>
            )
          );
        })}
      </Grid>
    </Grid>
  );
}

export default Dashboard;
