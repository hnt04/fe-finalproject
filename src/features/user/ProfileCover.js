import { Avatar, Box, Typography, Stack } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import backdrop from "../../backdrop.jpg";

function ProfileCover({ profile }) {
  const { user } = useAuth();
  console.log("user", user);
  const { name, avatarUrl } = profile;

  return (
    <Box
      sx={{
        marginTop: "4%",
        padding: "2%",
        marginLeft: "10%",
        marginRight: "10%",
      }}
    >
      <Box sx={{ position: "relative", marginLeft:"-3%" }}>
        <img width="102%" height="350vh" src={backdrop} />
      </Box>
      <Stack sx={{ position: "absolute", marginTop:"-4%", marginLeft:"32%" }}>
        <Avatar
          src={avatarUrl}
          alt={name}
          sx={{
            mx: "auto",
            borderWidth: 2,
            borderStyle: "solid",
            borderColor: "common.white",
            marginTop: "-150%",
            width: { xs: 80, md: 128 },
            height: { xs: 80, md: 128 },
          }}
        />
        <Box
          sx={{
            ml: { md: 3 },
            mt: { xs: 1, md: 0 },
            color: "common.white",
            textAlign: { xs: "center", md: "center" },
          }}
        >
          <Typography
            sx={{ color: "#4D0019", marginTop: "5px", marginLeft: "-25px" }}
            variant="h4"
          >
            {name}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}

export default ProfileCover;
