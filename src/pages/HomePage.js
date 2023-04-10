import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { Box } from '@mui/material';
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
            }}>
            <UserPage profile={user} />
        </Box>
  );
}

export default HomePage;
