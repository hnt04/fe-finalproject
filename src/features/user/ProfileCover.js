import { Avatar, Box, Typography } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import { Container } from "@mui/system";

function ProfileCover({ profile }) {
  const { user } = useAuth();
  console.log("user",user)
  const {
    name,
    avatarUrl,
  } = profile;

  return (
    <Box sx={{marginTop:"4%",backgroundColor:"#E6CCFF",padding:"2%"}}>
        <Avatar
          src={avatarUrl}
          alt={name}
          sx={{
            mx: "auto",
            borderWidth: 2,
            borderStyle: "solid",
            borderColor: "common.white",
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
          <Typography sx={{color:"#4D0019", marginTop:"5px", marginLeft:"-25px"}} variant="h4">{name}</Typography>
        </Box>
    </Box>
  );
}

export default ProfileCover;