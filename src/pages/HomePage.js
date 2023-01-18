import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';

import { Container, Stack } from '@mui/material';

import { Card } from '@mui/material';
// import ProfileCover from '../features/user/ProfileCover';
import { styled } from "@mui/material/styles";
import userSlice from '../features/user/userSlice';
import UserPage from '../features/user/UserPage';
// import ScheduleSendOutlinedIcon from '@mui/icons-material/ScheduleSendOutlined';

const TabsWrapperStyle = styled("div")(({ theme }) => ({
    zIndex: 9,
    bottom: 0,
    width: "100%",
    display:"flex",
    position: "absolute",
    backgroundColor: "#ece4f2",
    [theme.breakpoints.up("sm")] : {
        justifyContent:"center",
    },
    [theme.breakpoints.up("md")] : {
        justifyContent:"flex-end",
        paddingRight: theme.spacing(3),
    },
}))

function HomePage() {
    const [currentTab, setCurrentTab] = useState("profile");
    const { user } = useAuth();


  return user && (
    <Stack>
        <Card 
            sx={{ 
                mb: 3,
                maxHeight:"100%",
                height: "auto",
                position: "relative",

            }}>
            <UserPage  profile={user}/>
        </Card>
    </Stack>
  );
}

export default HomePage;
