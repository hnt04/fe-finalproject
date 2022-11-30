import {
  Grid,
  Box,
  Card,
  Stack,
  Container,
  Typography,
  Link,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import BadgeIcon from "@mui/icons-material/Badge";
import EmailIcon from "@mui/icons-material/Email";
import useAuth from "../../hooks/useAuth";
import Grid3x3Icon from "@mui/icons-material/Grid3x3";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getSingleUser } from "../user/userSlice";

const IconStyle = styled(Box)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

function MemberProfile({index}) {

  const { currentPageUsers, usersById } = useSelector(
    (state) => state.user
  );

  let  {userId}  = useParams();
  console.log("userId", userId )

  const user = currentPageUsers.map((userId) => usersById[userId]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleUser(userId));
  }, [dispatch, userId])

  console.log("user",user)
  return (
    <Container
      maxWidth="100vw"
      sx={{ height: "70vh", width: "75vw", paddingTop: "1%", marginTop: "2%" }}
    >
      <Typography
        variant="h4"
        sx={{ color: "#616161", fontWeight: "700", paddingLeft: "2%", textAlign:"center"}}
        gutterBottom
      >
        {user && user[0].name.toUpperCase()} PROFILE
      </Typography>
      <Grid item xs={12} md={8} sx={{ marginTop: "20px" }}>
        <Card
          sx={{
            p: 3,
            backgroundColor: "#2F4F4",
            marginTop: "2%",
          }}
        >
          <Stack spacing={2} sx={{ p: 3, backgroundColor: "#e0e0e06b" }}>
            {/* <Typography variant="body2">{aboutMe}</Typography> */}

            <Stack
              direction="row"
              sx={{ paddingBottom: "20px" }}
            >
              <IconStyle sx={{ marginLeft: "50px",marginTop:"20px"}}>
                <Grid3x3Icon />
              </IconStyle>
              <Typography
                sx={{
                  color: "#70809",
                  fontSize: "24px",
                  fontWeight: "700",
                  marginLeft: "50px",
                  marginTop:"20px"
                }}
              >
                {user && user[0].employeeId}
              </Typography>
            </Stack>

            <Stack direction="row" sx={{ paddingBottom: "20px" }}>
              <IconStyle sx={{ marginLeft: "50px" }}>
                <BadgeIcon />
              </IconStyle>
              <Typography
                sx={{
                  color: "#70809",
                  fontSize: "24px",
                  fontWeight: "700",
                  marginLeft: "50px",
                }}
              >
                {user && user[0].name}
              </Typography>
            </Stack>

            <Stack
              direction="row"
              sx={{ paddingBottom: "20px", marginLeft: "50px" }}
            >
              <IconStyle sx={{ marginLeft: "50px" }}>
                <EmailIcon />
              </IconStyle>
              <Typography
                sx={{
                  color: "#70809",
                  fontSize: "24px",
                  fontWeight: "700",
                  marginLeft: "50px",
                }}
              >
                {user && user[0].email}
              </Typography>
            </Stack>

            <Stack
              direction="row"
              sx={{ paddingBottom: "20px", marginLeft: "50px" }}
            >
              <IconStyle sx={{ marginLeft: "50px" }}>
                <ApartmentIcon />
              </IconStyle>
              <Typography
                sx={{
                  color: "#70809",
                  fontSize: "24px",
                  fontWeight: "700",
                  marginLeft: "50px",
                }}
              >
                {user && user[0].department}
              </Typography>
            </Stack>

            <Stack
              direction="row"
              sx={{ paddingBottom: "20px", marginLeft: "50px" }}
            >
              <IconStyle sx={{ marginLeft: "50px" }}>
                <AssignmentIndIcon />
              </IconStyle>
              <Typography
                sx={{
                  color: "#70809",
                  fontSize: "24px",
                  fontWeight: "700",
                  marginLeft: "50px",
                }}
              >
                {user && user[0].role}
              </Typography>
            </Stack>

            <Stack
              direction="row"
              sx={{ paddingBottom: "20px", marginLeft: "50px" }}
            >
              <IconStyle sx={{ marginLeft: "50px" }}>
                <ContactPhoneIcon />
              </IconStyle>
              <Typography
                sx={{
                  color: "#70809",
                  fontSize: "24px",
                  fontWeight: "700",
                  marginLeft: "50px",
                }}
              >
                {user && user[0].phone}
              </Typography>
            </Stack>
          </Stack>
        </Card>
      </Grid>
    </Container>
  );
}

export default MemberProfile;
