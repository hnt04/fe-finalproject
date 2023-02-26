import React, { useEffect } from "react";
import { Card, Container } from "@mui/material";
import ProfileColleagueCover from "../features/user/ProfileColleagueCover";
import { useParams } from "react-router-dom";
import {   useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../components/LoadingScreen";
import { getSingleUser } from "../features/user/userSlice";
import UserPage from "../features/user/UserPage";
import ColleaguePage from "../features/user/ColleaguePage";

// import UserPage from "../features/user/UserPage";
// import ColleaguePage from "../features/user/ColleaguePage";

function UserProfilePage() {
  const { userList,isLoading } = useSelector(
    (state) => state.user
  );
  console.log("userList",userList)

  let  { userId }  = useParams();
  console.log("userId", userId )

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleUser(userId));
  }, [dispatch, userId])
  return (
  <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Card
            sx={{
              mb: 3,
              marginTop:"4%",
              // height: 280,
              position: "relative",
            }}
          > {userList && <ProfileColleagueCover profileColleague={userList} />}
          <ColleaguePage profileColleague={userList} />
          </Card>
          
        </>
      )}
      </>
  );
}

export default UserProfilePage;