import React from 'react';
import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import Logo from "../components/Logo";

function BlankLayout() {
  return (
    <Stack minHeight="100vh" justifyContent="center" alignItem="center">
        <Outlet />
    </Stack>
  );
}

export default BlankLayout;
