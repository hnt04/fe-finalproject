import EmailIcon from "@mui/icons-material/Email";
import { styled } from "@mui/material/styles";
import { Card, Typography, Stack, Box } from "@mui/material";
import Grid3x3Icon from "@mui/icons-material/Grid3x3";
import useAuth from "../../hooks/useAuth";
import BadgeIcon from "@mui/icons-material/Badge";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";

const IconStyle = styled(Box)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

function ProfileAbout() {
  const { user } = useAuth();

  return (
    <Card>
      <Stack spacing={2} sx={{ p: 3, backgroundColor: "#ebebeb" }}>
            <Typography sx={{color:"#40004D",fontSize:"32px",fontWeight:"700",textAlign:"center"}}>MY PROFILE</Typography>

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
                  fontWeight: "500",
                  marginLeft: "50px",
                  marginTop:"20px"
                }}
              >
                {user?.employeeId}
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
                  fontWeight: "500",
                  marginLeft: "50px",
                }}
              >
                {user?.name}
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
                  fontWeight: "500",
                  marginLeft: "50px",
                }}
              >
                {user?.email}
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
                  fontWeight: "500",
                  marginLeft: "50px",
                }}
              >
                {user?.department}
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
                  fontWeight: "500",
                  marginLeft: "50px",
                }}
              >
                {user?.role}
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
                  fontWeight: "500",
                  marginLeft: "50px",
                }}
              >
                {user?.phone}
              </Typography>
            </Stack>
          </Stack>
    </Card>
  );
}

export default ProfileAbout;