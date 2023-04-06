import EmailIcon from "@mui/icons-material/Email";
import { styled } from "@mui/material/styles";
import { Card, Typography, Stack, Box } from "@mui/material";
import Grid3x3Icon from "@mui/icons-material/Grid3x3";
import BadgeIcon from "@mui/icons-material/Badge";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import ProfileColleagueCover from "./ProfileColleagueCover";

const IconStyle = styled(Box)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

function TasksListColleagues({ profileColleague }) {
  const { employeeId, name, email, department, role, phone,tasks } = profileColleague;
  console.log("profileColleague", profileColleague);

  return (
    <Box sx={{ marginLeft: { xs: "6%", md: "20%" }, width: "84%", marginBottom:"50%" }}>
      {tasks}
    </Box>
  );
}

export default TasksListColleagues;
