import {
  Grid,
  Box,
  Card,
  Stack,
  Container,
  Typography,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import BadgeIcon from "@mui/icons-material/Badge";
import EmailIcon from "@mui/icons-material/Email";
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

function MemberProfile({user}) {

  const { userList } = useSelector(
    (state) => state.user
  );

  let  { userId }  = useParams();

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
        {userList?.name} Profile
      </Typography>
      <Avatar
                  alt="Missing image"
                  src={`${userList?.avatarUrl}`}
                  sx={{ margin: "auto", width: 120, height: 120 }}
                />
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
                {userList?.employeeId}
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
                {userList?.name}
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
                {userList?.email}
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
                {userList?.department}
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
                {userList?.role}
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
                {userList?.phone}
              </Typography>
            </Stack>
          </Stack>
        </Card>
      </Grid>
    </Container>
  );
}

export default MemberProfile;
