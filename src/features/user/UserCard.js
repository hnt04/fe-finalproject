import React, { useState, useEffect } from "react";
import { Avatar, Box, Divider, Typography, Link , Chip,Stack} from "@mui/material";
import useAuth from "../../hooks/useAuth";
import { Link as RouterLink, useParams } from "react-router-dom";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import IconButton from "@mui/material/IconButton";
import RecommendIcon from "@mui/icons-material/Recommend";
import { getSingleUser } from "./userSlice";
import { useDispatch } from "react-redux";

function UserCard({ profile }) {
  const { user } = useAuth();
  let  userId  = useParams();
  console.log("userId", userId )

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleUser(userId));
  }, [dispatch, userId])

  const [setBestEmployee] = useState([])
  const [employeeDetail, setEmployeeDetail] = useState(null);
  const [employeeError, setEmployeeError] = useState();

  const addBestEmployee = ({employeeId, name, avatarUrl, email, id}) => {
    console.log("id",id);
    let list = JSON.parse(localStorage.getItem("best"));
    if (list) {
      let targetUserId = [];
      for (let i = 0; i < list.length; i++) {
        targetUserId.push(list[i].targetUserId)
      }
      console.log("targetUserId",targetUserId)
      if (targetUserId.includes(id)) {
        setEmployeeError("This Employee Is Available!");
      } else {
        targetUserId.push({
          id: id,
          employeeId: employeeId,
          name: name,
          avatarUrl: avatarUrl,
          email: email,
        });
        localStorage.setItem("best", JSON.stringify(list));
        setEmployeeError("Added!");
      }
    } else {
      localStorage.setItem("best", JSON.stringify([]));
      list = JSON.parse(localStorage.getItem("best"));
      list.push({
        id: id,
          employeeId: employeeId,
          name: name,
          avatarUrl: avatarUrl,
          email: email,
      });
      localStorage.setItem("best", JSON.stringify(list));
      setEmployeeError("Added!");
    }

    setBestEmployee(list);
  }

  return (
    <>
    {employeeDetail ? (
        <Stack
          minWidth="80%"
          flexDirection={{ xs: "column", md: "row" }}
          sx={{ borderRadius: "10px" }}
        >
          <Stack
            my={3}
            minWidth="350px"
            sx={{
              borderRadius: "10px",
            }}
          >
            <Avatar  src={employeeDetail.avatarUrl} />
          </Stack>

          <Stack
            my={3}
            pl={{ xs: 0, md: 1 }}
            minHeight="100%"
            minWidth="400px"
            justifyContent="space-between"
          >
            <Stack
              justifyContent="space-between"
              alignItems="center"
              flexDirection="row"
            >
              <Typography mb={1} variant="h6">
                {`${employeeDetail.employeeId}` - `${employeeDetail.name}`}
              </Typography>
              <Stack flexDirection="column" alignItems="end">
                <IconButton
                  onClick={() =>
                    addBestEmployee({
                      id: employeeDetail.id,
                      employeeId: employeeDetail.employeeId,
                      name: employeeDetail.name,
                      avatarUrl: employeeDetail.avatarUrl,
                      email: employeeDetail.email,
                      }
                    )
                  }
                  size="large"
                  children={<StarBorderIcon fontSize="large" />}
                  sx={{
                    backgroundColor: "rgba(225,0,0,0.9)",
                    marginRight: "30px",
                  }}
                  />
                <Typography
                  sx={{
                    marginRight: "30px",
                    marginTop: "10px",
                  }}
                  color="error"
                >
                  {employeeError}
                </Typography>
              </Stack>
            </Stack>
            <Stack my={{ xs: 2, md: 0 }}>
              <Typography variant="body">
                {`${employeeDetail.department}`}
              </Typography>
            </Stack>
            
            <Stack
              my={{ xs: 2, md: 1 }}
              flexDirection="row"
              alignItems="center"
            >
              <Typography mr={1} variant="caption">
                Role
              </Typography>
              {`${employeeDetail.role}`}
            </Stack>

            <Stack
              my={{ xs: 2, md: 1 }}
              flexDirection="row"
              alignItems="center"
            >
              <Typography mr={1} variant="caption">
                Email
              </Typography>
              <Chip
                label={`${employeeDetail.email}`}
                size="small"
                variant="outlined"
              />
            </Stack>

          </Stack>
        </Stack>
      ) : (
        <Typography variant="h4" m={5}>
          Employee not found!
        </Typography>
      )}

      <Divider />
    </>
    
  )
}

export default UserCard;