import React from "react";
import useAuth from "../../hooks/useAuth";
import {Grid,Stack} from "@mui/material";
import PostForm from "../post/PostForm";
import PostList from "../post/PostList";
import ProfileAbout from "./ProfileAbout";

function UserPage({ profile }) {
    console.log("profile",profile)
    const { user } = useAuth();
    console.log("user",user)
    return profile && (
      <Grid container spacing={3} >
      <Grid item xs={12} md={4} >
        <Stack spacing={3} sx={{marginLeft:"4vw", marginTop:"4vh" }}>
          <ProfileAbout  profile={profile} />
        </Stack>
      </Grid>
        <Grid item xs={12} md={8}>
          <Stack spacing={3} sx={{  marginTop:"4vh", marginLeft:{xs : "8%", md: "0%"} }}>
            {user?._id === profile?._id && <PostForm />}
            <PostList userId={profile?._id} />
          </Stack>
      </Grid>
      </Grid>
    )
}

export default UserPage;