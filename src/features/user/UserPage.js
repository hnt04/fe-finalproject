import React from "react";
import useAuth from "../../hooks/useAuth";
import {Grid,Stack} from "@mui/material";
import PostForm from "../post/PostForm";
import PostList from "../post/PostList";

function UserPage({ profile }) {
    console.log("profile",profile)
    const { user } = useAuth();
    console.log("user","user")
    return profile && (
        <Grid item xs={12} md={8}>
          <Stack spacing={3} sx={{marginLeft:"20vw", marginTop:"10px"}}>
            {user?._id === profile?._id && <PostForm />}
            <PostList userId={profile?._id} />
          </Stack>
      </Grid>
    )
}

export default UserPage;