import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import {
  Box,
  Link,
  Container,
  Grid,
  Avatar,
  Pagination,
  Stack,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Skeleton from "@mui/material/Skeleton";
import { getCommendations } from "./commendationSlice";

function CommendationsEachMonth({ users, commendation }) {
  const [page, setPage] = React.useState(0);

  const dispatch = useDispatch();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

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
              paddingLeft: "0!important",
              marginTop:"70px",
              marginBottom:"70px"
            }}
            item
            xs={12}
            sm={6}
            md={4}
            lg={4}
          >
            <Card
              sx={{
                width: "12rem",
                height: "19rem",
                textDecoration: "none",
              }}
              elevation={0}
            >
              <div
                style={{
                  borderRadius: 50,
                  padding: 30,
                }}
              >
                <Avatar
                  alt="Missing image"
                  sx={{ margin: "auto", width: 120, height: 120 }}
                />
              </div>
              <CardContent sx={{ paddingBottom: 0, textAlign: "center" }}>
                <Typography variant="small" color="#dbabf5" fontWeight="600">
                  {`${n.employeeId}`}
                </Typography>

                <Typography>
                  <Link
                    variant="subtitle2"
                    sx={{ fontWeight: 600 }}
                    component={RouterLink}
                  >
                    {n.name}
                  </Link>
                </Typography>
                <Typography variant="small" color="gray">
                  {`${n.department}`}
                </Typography>
              </CardContent>
            </Card>
          </Grid>))}
    </Grid>

    </>
  );
}

export default CommendationsEachMonth;
