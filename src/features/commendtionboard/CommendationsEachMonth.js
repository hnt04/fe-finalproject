import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React from "react";
import {
  Box,
  Grid,
  Avatar,
} from "@mui/material";


function CommendationsEachMonth({ users, commendation }) {
  return (
    <>
      <Grid
        container
        maxWidth="lg"
        spacing={{ xs: 0, md: 1 }}
        columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}
      >
        {commendation.name.map((n) => (
          <Grid
            sx={{
              display: "flex",
              // paddingLeft: "0!important",
              marginTop: "70px",
              marginBottom: "70px",
            }}
            spacing={{ xs: 0, md: 3 }}
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
          >
            <Card
              sx={{
                textDecoration: "none",
                position: "relative",
                marginLeft:"10%"
              }}
              elevation={0}
            >
              <Avatar
                variant="rounded"
                src={`${n.avatarUrl}`}
                sx={{ margin: "auto", width: 300, height: 300 }}
              />
            </Card>
            <Card
              sx={{
                textDecoration: "none",
                position: "absolute",
                width: "16rem",
                height: "10rem",
                background: "#ebf3f5",
                marginTop: "5rem",
                marginLeft: "20rem",
              }}
              elevation={0}
            >
              <CardContent sx={{ paddingBottom: 0, textAlign: "center" }}>
                <Box sx={{marginTop:"5%"}}>
                  <Typography sx={{fontSize:"24px"}} color="#5d8187" fontWeight="600">
                     {n.name}
                  </Typography>
                </Box>
                <Typography sx={{fontSize:"20px"}} color="#1f2526" fontWeight="400">
                   {`${n.department}`} - {n.role} 
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default CommendationsEachMonth;
