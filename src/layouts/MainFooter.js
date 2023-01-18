import React from "react";
import { Typography, Link } from "@mui/material";

function MainFooter() {
  return (
    <Typography variant="body2" color="#4a148c" align="center" p={1} mt={2}>
      {"Copyright © "}
    <Link color="#inherit" href="https://www.coderschool.vn">Tynna</Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default MainFooter;