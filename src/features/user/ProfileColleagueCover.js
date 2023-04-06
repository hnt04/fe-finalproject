import { Avatar, Box, Stack, Typography } from "@mui/material";
import backdrop from "../../backdrop.jpg";

function ProfileColleagueCover({ profileColleague }) {
  const { name, avatarUrl } = profileColleague;

  return (
    <Box
      sx={{
        marginTop: "1%",
        padding: "2%",
        marginLeft: "10%",
        marginRight: "10%",
      }}
    >

      <Stack sx={{ marginLeft: "10%" }}>
        <Avatar
          src={avatarUrl}
          alt={name}
          variant="rounded"
          sx={{
            mx: "auto",
            borderWidth: 2,
            borderStyle: "solid",
            borderColor: "common.white",
            width: { xs: 128, md: 256 },
            height: { xs: 128, md: 256 },
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
            sx={{ color: "#4D0019", marginTop: "4%", marginBottom:"4%", marginRight:"4%" }}
            variant="h3"
          >
            {name}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}

export default ProfileColleagueCover;
