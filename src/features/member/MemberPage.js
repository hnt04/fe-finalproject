import { Grid, Typography, Stack } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
// import useAuth from "../hooks/useAuth";
import { departmentType } from "./departmentType";
import { Link as RouterLink } from "react-router-dom";


function MemberPage() {
  //   const { user } = useAuth;
  //   console.log("user", user);
  return (
    <Container>
      <Grid container spacing={3}>
        {departmentType.map((item) => (
          <Grid
            sx={{
              color: "#f3e5f5",
              marginRight: "30px",
              marginBottom: "20px",
            }}
            item
            key={item}
            xs={6}
            sm={4}
            md={3}
          >
            <Stack
              direction="column"
              justifyContent="space-between"
              alignItems="center"
              height="100%"
            >
              <Typography
                sx={{
                  fontSize: "30px",
                  paddingTop: "50px",
                  backgroundColor: "#e0e0e06b",
                  borderRadius:"12px",
                  marginTop: "50px",
                  marginLeft: "500px",
                  height: "200px",
                  width: "240px",
                  textAlign:"center"
                }}
              >
                {item}
              </Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default MemberPage;
