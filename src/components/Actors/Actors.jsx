import React from "react";
import { Link, useParams } from "react-router-dom";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";

import useStyles from "./styles";
import { useGetActorQuery } from "../../services/TMDB";

// use params from react router dom to get the id of the actor useParams
// make a new call using redux toolkit query getActorDetails
// Research tmdb api docs...
// use newly created useGetActorHook to get actors info to the component

const Actors = () => {
  const classes = useStyles();
  const { id } = useParams();
  const { data, isFetching, error } = useGetActorQuery(id);
  console.log(data);
  if (isFetching) {
    <Box display="flex" justifyContent="center" alignItems="center">
      <CircularProgress size="8rem" />
    </Box>;
  }

  if (error) {
    <Box display="flex" justifyContent="center" alignItems="center">
      <Link to="/">Something has gone wrong - Go back</Link>
    </Box>;
  }
  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid item sm={12} lg={6}>
        <img
          className={classes.poster}
          src={`https://image.tmdb.org/t/p/w500${data?.profile_path}`}
          alt={data?.title}
        />
      </Grid>
      <Grid>
        <Typography variant="h4">{data?.name}</Typography>
      </Grid>
      <Typography variant="h5" align="center" gutterBottom>
        {data?.biography}
      </Typography>
    </Grid>
  );
};

export default Actors;
