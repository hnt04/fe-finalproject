import EmailIcon from "@mui/icons-material/Email";
import { styled } from "@mui/material/styles";
import { Card, Typography, Stack, Box, Avatar } from "@mui/material";
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
    <Card
      sx={{
        background: "#DFE3E8",
        marginLeft: { xs: "6%", md: "20%" },
        width: "84%",
      }}
    >
      <Stack spacing={3} sx={{ p: 2, backgroundImage: "profile" }}>
        <Stack direction="row" sx={{ marginTop: "5%", marginLeft: "-20%" }}>
          <Avatar
            src={user?.avatarUrl}
            alt={user.name}
            sx={{
              mx: "auto",
              borderWidth: 2,
              borderStyle: "solid",
              borderColor: "common.white",
              width: { xs: 100, md: 100 },
              height: { xs: 100, md: 100 },
            }}
          />
          <Box
            sx={{
              ml: { md: 3 },
              mt: { xs: 1, md: 0 },
              color: "common.white",
              textAlign: { xs: "left", md: "left" },
            }}
          >
            <Typography
              sx={{
                color: "#4D0019",
                marginTop: { xs: "20%", md: "20%" },
                marginLeft: { xs: "-100%", md: "-90%" },
                fontSize:"40px"
              }}
            >
              <b> {user.name}</b>
            </Typography>
          </Box>
        </Stack>
        <hr />
        <Stack direction="row" sx={{ paddingBottom: "20px" }}>
          <IconStyle sx={{ marginLeft: "30px", marginTop: "20px" }}>
            <Grid3x3Icon />
          </IconStyle>
          <Typography
            sx={{
              color: "#70809",
              fontSize: "24px",
              fontWeight: "500",
              marginLeft: "30px",
              marginTop: "20px",
            }}
          >
            {user?.employeeId}
          </Typography>
        </Stack>

        <Stack
          direction="row"
          sx={{ paddingBottom: "20px", marginLeft: "50px" }}
        >
          <IconStyle sx={{ marginLeft: "30px" }}>
            <ApartmentIcon />
          </IconStyle>
          <Typography
            sx={{
              color: "#70809",
              fontSize: "24px",
              fontWeight: "500",
              marginLeft: "30px",
            }}
          >
            {user?.department}
          </Typography>
        </Stack>

        <Stack
          direction="row"
          sx={{ paddingBottom: "20px", marginLeft: "50px" }}
        >
          <IconStyle sx={{ marginLeft: "30px" }}>
            <AssignmentIndIcon />
          </IconStyle>
          <Typography
            sx={{
              color: "#70809",
              fontSize: "24px",
              fontWeight: "500",
              marginLeft: "30px",
            }}
          >
            {user?.role}
          </Typography>
        </Stack>

        <Stack
          direction="row"
          sx={{ paddingBottom: "20px", marginLeft: "30px" }}
        >
          <IconStyle sx={{ marginLeft: "30px" }}>
            <ContactPhoneIcon />
          </IconStyle>
          <Typography
            sx={{
              color: "#70809",
              fontSize: "24px",
              fontWeight: "500",
              marginLeft: "30px",
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
