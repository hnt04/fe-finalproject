import React from "react";
import useAuth from "../../hooks/useAuth";
import {Grid,Stack} from "@mui/material";
import PostForm from "../post/PostForm";
import PostList from "../post/PostList";
import ProfileColleagues from "./ProfileColleagues";

function ColleaguePage({ profileColleague }) {
  console.log("profileColleague",profileColleague)
  // console.log("userListColleague",userList)

    return profileColleague && (
      <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Stack spacing={3} sx={{marginLeft:"4vw", marginTop:"4vh"}}>
          <ProfileColleagues profileColleague={profileColleague} />
        </Stack>
      </Grid>
        <Grid item xs={12} md={8}>
          <Stack spacing={3} sx={{  marginTop:"4vh", marginLeft:{xs : "8%", md: "0%"}}}>
            <PostList userColleagueId={profileColleague?._id} />
          </Stack>
      </Grid>
      </Grid>
    )
}

export default ColleaguePage;