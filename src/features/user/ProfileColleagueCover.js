import { Avatar, Box, Typography } from "@mui/material";
import { Container } from "@mui/system";

function ProfileColleagueCover({ profileColleague }) {
  const {
    name,
    avatarUrl,
  } = profileColleague;
  console.log("profileColleagueCover",profileColleague)

  return (
    <Box sx={{marginTop:"4%",backgroundColor:"#E6CCFF",padding:"2%", marginLeft: "10%", marginRight:"10%"}}>
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

export default ProfileColleagueCover;