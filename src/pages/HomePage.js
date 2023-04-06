import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { Box } from '@mui/material';
import ProfileCover from '../features/user/ProfileCover';
import { styled } from "@mui/material/styles";
import UserPage from '../features/user/UserPage';

function HomePage() {
    const [currentTab, setCurrentTab] = useState("profile");
    const { user } = useAuth();


  return user && (
        <Box 
            sx={{ 
                mb: 3,
                maxHeight:"100%",
                height: "auto",
                position: "relative",
            }}>{user && <ProfileCover profile={user} />}
            <UserPage profile={user}/>
        </Box>
  );
}

export default HomePage;
