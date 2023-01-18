import React from 'react';
import { Stack, Box } from "@mui/material";
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";
import { Outlet } from 'react-router-dom';
import AlertMsg from '../components/AlertMsg';
import MainBody from './MainBody';

function MainLayout() {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
        <MainHeader />
        <AlertMsg />
        {/* <MainBody /> */}
        <Outlet />
        {/* <Box sx={{ flexGrow: 1 }} /> */}
        <MainFooter />
    </Stack>
  );
}

export default MainLayout;
