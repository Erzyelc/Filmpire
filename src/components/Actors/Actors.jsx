import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

import useStyles from "./styles";
import {
  useGetActorsDetailsQuery,
  useGetMoviesByActorIdQuery,
} from "../../services/TMDB";
import { MovieList } from "..";

const Actors = () => {
  const page = 1;
  const classes = useStyles();
  const { id } = useParams();
  const history = useHistory();
  const { data, isFetching, error } = useGetActorsDetailsQuery(id);
  const { data: movies } = useGetMoviesByActorIdQuery({ id, page });

  if (isFetching) {
    <Box display="flex" justifyContent="center" alignItems="center">
      <CircularProgress size="8rem" />
    </Box>;
  }

  if (error) {
    <Box display="flex" justifyContent="center" alignItems="center">
      <Button
        startIcon={<ArrowBack />}
        onClick={() => history.goBack}
        color="primary"
      >
        Go Back
      </Button>
    </Box>;
  }
  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={5} xl={4}>
          <img
            className={classes.image}
            src={`https://image.tmdb.org/t/p/w780${data?.profile_path}`}
            alt={data?.name}
          />
        </Grid>
        <Grid
          item
          lg={7}
          xl={8}
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h2" gutterBottom>
            {data?.name}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Born: {new Date(data?.birthday).toDateString()}
          </Typography>
          <Typography variant="body1" align="justify" paragraph>
            {data?.biography || "No biography available"}
          </Typography>
          <Box marginTop="2rem" display="flex" justifyContent="space-around">
            <Button
              variant="contained"
              color="primary"
              target="_blank"
              href={`https://www.imdb.com/name/${data?.imdb_id}`}
            >
              Imdb
            </Button>
            <Button
              starIcon={<ArrowBack />}
              onClick={() => history.goBack()}
              color="primary"
            >
              Back
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box margin="2rem 0">
        <Typography variant="h2" gutterBottom align="center">
          Movies
        </Typography>
        {movies && <MovieList movies={movies} numberOfMovies={12} />}
      </Box>
    </>
  );
};

export default Actors;
