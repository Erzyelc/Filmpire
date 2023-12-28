// import React, { useState, useEffect } from "react";
// import {
//   Modal,
//   Typography,
//   Button,
//   ButtonGroup,
//   Grid,
//   Box,
//   CircularProgress,
//   useMediaQuery,
//   Rating,
// } from "@mui/material";
// import {
//   Movie as MovieIcon,
//   Theaters,
//   Language,
//   PlusOne,
//   Favorite,
//   FavoriteBorderOutlined,
//   Remove,
//   ArrowBack,
// } from "@mui/icons-material";
// import { Link, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";

// import useStyles from "./styles";
// import {
//   useGetListQuery,
//   useGetMovieQuery,
//   useGetRecommendationsQuery,
// } from "../../services/TMDB";
// import genreIcons from "../../assets/genres";
// import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";
// import { MovieList } from "..";
// import { userSelector } from "../../features/auth";

// const MovieInformation = () => {
//   const { user } = useSelector(userSelector);
//   const { id } = useParams();
//   const classes = useStyles();
//   const dispatch = useDispatch();
//   const [open, setOpen] = useState(false);

//   const { data, isFetching, error } = useGetMovieQuery(id);

//   const { data: favoriteMovies } = useGetListQuery({
//     listName: "favorite/movies",
//     accountId: user.id,
//     sessionId: localStorage.getItem("session_id"),
//     page: 1,
//   });
//   const { data: watchlistMovies } = useGetListQuery({
//     listName: "watlist/movies",
//     accountId: user.id,
//     sessionId: localStorage.getItem("session_id"),
//     page: 1,
//   });

//   const { data: recommendations } = useGetRecommendationsQuery({
//     list: "/recommendations",
//     movie_id: id,
//   });

//   const [isMovieFavorited, setIsMovieFavorited] = useState(false);
//   const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false);

//   useEffect(() => {
//     setIsMovieFavorited(
//       !!favoriteMovies?.results?.find((movie) => movie?.id === data?.id)
//     );
//   }, [favoriteMovies, data]);

//   useEffect(() => {
//     setIsMovieWatchlisted(
//       !!watchlistMovies?.results?.find((movie) => movie?.id === data?.id)
//     );
//   }, [watchlistMovies, data]);

//   const addToFavorites = async () => {
//     await axios.post(
//       `https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${
//         process.env.REACT_APP_API_KEY
//       }&session_id=${localStorage.getItem("session_id")}`,
//       {
//         media_type: "movie",
//         media_id: id,
//         favorite: !isMovieFavorited,
//       }
//     );

//     setIsMovieFavorited((prev) => !prev);
//   };

//   const addToWatchlist = async () => {
//     await axios.post(
//       `https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${
//         process.env.REACT_APP_API_KEY
//       }&session_id=${localStorage.getItem("session_id")}`,
//       {
//         media_type: "movie",
//         media_id: id,
//         watchlist: !isMovieWatchlisted,
//       }
//     );

//     setIsMovieWatchlisted((prev) => !prev);
//   };

//   if (isFetching) {
//     <Box display="flex" justifyContent="center" alignItems="center">
//       <CircularProgress size="8rem" />
//     </Box>;
//   }

//   if (error) {
//     <Box display="flex" justifyContent="center" alignItems="center">
//       <Link to="/">Something has gone wrong - Go back</Link>
//     </Box>;
//   }

//   return (
//     <Grid container className={classes.containerSpaceAround}>
//       <Grid
//         item
//         sm={12}
//         lg={4}
//         // style={{ display: "flex", marginBottom: "30px" }}
//       >
//         <img
//           className={classes.poster}
//           src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
//           alt={data?.title}
//         />
//       </Grid>
//       <Grid item container direction="column" lg={7}>
//         <Typography variant="h3" align="center" gutterBottom>
//           {data?.title} ({data?.release_date.split("-")[0]})
//         </Typography>
//         <Typography variant="h5" align="center" gutterBottom>
//           {data?.tagline}
//         </Typography>
//         <Grid item className={classes.containerSpaceAround}>
//           <Box display="flex" align="center">
//             <Rating readOnly value={data?.vote_average / 2} />
//             <Typography
//               variant="subtitle1"
//               gutterBottom
//               style={{ marginLeft: "10px" }}
//             >
//               {data?.vote_average} / 10
//             </Typography>
//           </Box>
//           <Typography variant="h6" align="center" gutterBottom>
//             {data?.runtime} min \ Language: {data?.spoken_languages[0].name}
//           </Typography>
//         </Grid>
//         <Grid item className={classes.genresContainer}>
//           {data?.genres.map((genre, i) => (
//             <Link
//               key={genre.name}
//               className={classes.links}
//               to="/"
//               onClick={() => dispatch(selectGenreOrCategory(genre.id))}
//             >
//               <img
//                 src={genreIcons[genre.name.toLowerCase()]}
//                 className={classes.genreImage}
//                 height={30}
//                 alt="Genre"
//               />
//               <Typography
//                 color="textPrimary"
//                 variant="subtitle1"
//                 style={{ textDecoration: "none" }}
//               >
//                 {genre?.name}
//               </Typography>
//             </Link>
//           ))}
//         </Grid>
//         <Typography variant="h5" gutterBottom style={{ marginTop: "10px" }}>
//           Overview
//         </Typography>
//         <Typography style={{ marginBottom: "2rem" }}>
//           {data?.overview}
//         </Typography>
//         <Typography variant="h5" gutterBottom>
//           Top Cast
//         </Typography>
//         <Grid item container spacing={2}>
//           {data &&
//             data?.credits?.cast
//               ?.map(
//                 (character, i) =>
//                   character?.profile_path && (
//                     <Grid
//                       key={i}
//                       item
//                       xs={4}
//                       md={2}
//                       component={Link}
//                       to={`/actors/${character.id}`}
//                       style={{ textDecoration: "none" }}
//                     >
//                       <img
//                         className={classes.castImage}
//                         src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
//                         alt={character.name}
//                       />
//                       <Typography color="textPrimary">
//                         {character?.name}
//                       </Typography>
//                       <Typography color="textSecondary">
//                         {character?.character.split(" / ")[0]}
//                       </Typography>
//                     </Grid>
//                   )
//               )
//               .slice(0, 6)}
//         </Grid>
//         <Grid item container style={{ marginTop: "2rem" }}>
//           <div className={classes.buttonsContainer}>
//             <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
//               <ButtonGroup size="medium" variant="outline">
//                 <Button
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   href={data?.homepage}
//                   endIcon={<Language />}
//                 >
//                   Website
//                 </Button>
//                 <Button
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   href={`https://www.imdb.com/title/${data?.imdb_id}`}
//                   endIcon={<MovieIcon />}
//                 >
//                   IMDB
//                 </Button>
//                 <Button
//                   onClick={() => setOpen(true)}
//                   href="#"
//                   endIcon={<Theaters />}
//                 >
//                   Trailer
//                 </Button>
//               </ButtonGroup>
//             </Grid>
//             <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
//               <ButtonGroup size="medium" variant="outline">
//                 <Button
//                   onClick={addToFavorites}
//                   endIcon={
//                     isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />
//                   }
//                 >
//                   {isMovieFavorited ? "Unfavorite" : "Favorite"}
//                 </Button>
//                 <Button
//                   onClick={addToWatchlist}
//                   endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}
//                 >
//                   Watchlist
//                 </Button>
//                 <Button
//                   endIcon={<ArrowBack />}
//                   sx={{ borderColor: "primary.main" }}
//                 >
//                   <Typography
//                     component={Link}
//                     to="/"
//                     color="inherit"
//                     variant="subtitle2"
//                     style={{ textDecoration: "none" }}
//                   >
//                     Back
//                   </Typography>
//                 </Button>
//               </ButtonGroup>
//             </Grid>
//           </div>
//         </Grid>
//       </Grid>
//       <Box marginTop="5rem" width="100%">
//         <Typography variant="h3" gutterBottom align="center">
//           You might also like
//         </Typography>
//         {recommendations ? (
//           <MovieList movies={recommendations} numberOfMovies={12} />
//         ) : (
//           <Box>Sorry nothing was found</Box>
//         )}
//       </Box>
//       <Modal
//         open={open}
//         onClose={() => setOpen(false)}
//         className={classes.modal}
//         closeAfterTransition
//       >
//         <iframe
//           autoPlay
//           className={classes.video}
//           frameBorder="0"
//           title="Video Player"
//           src={`https://www.youtube.com/embed/${data?.videos?.results?.[0]?.key}`}
//           allow="autoplay"
//         />
//       </Modal>
//     </Grid>
//   );
// };

// export default MovieInformation;

import React, { useState, useEffect } from "react";
import {
  Modal,
  Typography,
  Button,
  ButtonGroup,
  Grid,
  Box,
  CircularProgress,
  useMediaQuery,
  Rating,
} from "@mui/material";
import {
  Movie as MovieIcon,
  Theaters,
  Language,
  PlusOne,
  Favorite,
  FavoriteBorderOutlined,
  Remove,
  ArrowBack,
} from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import {
  useGetMovieQuery,
  useGetRecommendationsQuery,
  useGetListQuery,
} from "../../services/TMDB";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";
import { userSelector } from "../../features/auth";
import genreIcons from "../../assets/genres";
import { MovieList } from "..";
import useStyles from "./styles";

const MovieInformation = () => {
  const { user } = useSelector(userSelector);
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width:600px)");

  const { data, isFetching, error } = useGetMovieQuery(id);
  const { data: favoriteMovies, refetch: refetchFavorites } = useGetListQuery({
    listName: "favorite/movies",
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });
  const { data: watchlistMovies, refetch: refetchWatchlisted } =
    useGetListQuery({
      listName: "watchlist/movies",
      accountId: user.id,
      sessionId: localStorage.getItem("session_id"),
      page: 1,
    });
  const { data: recommendations, isFetching: isRecommendationsFetching } =
    useGetRecommendationsQuery({ list: "/recommendations", movie_id: id });

  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false);

  useEffect(() => {
    refetchWatchlisted();
    refetchFavorites();
  }, []);

  useEffect(() => {
    setIsMovieFavorited(
      !!favoriteMovies?.results?.find((movie) => movie?.id === data?.id)
    );
  }, [favoriteMovies, data]);

  useEffect(() => {
    setIsMovieWatchlisted(
      !!watchlistMovies?.results?.find((movie) => movie?.id === data?.id)
    );
  }, [watchlistMovies, data]);

  const addToFavorites = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${
        process.env.REACT_APP_TMDB_KEY
      }&session_id=${localStorage.getItem("session_id")}`,
      {
        media_type: "movie",
        media_id: id,
        favorite: !isMovieFavorited,
      }
    );

    setIsMovieFavorited((prev) => !prev);
  };

  const addToWatchlist = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${
        process.env.REACT_APP_TMDB_KEY
      }&session_id=${localStorage.getItem("session_id")}`,
      {
        media_type: "movie",
        media_id: id,
        watchlist: !isMovieWatchlisted,
      }
    );

    setIsMovieWatchlisted((prev) => !prev);
  };

  const date = new Date(data?.release_date).toDateString();

  if (isFetching || isRecommendationsFetching) {
    return (
      <Box display="flex" justifyContent="center" alignContent="center">
        <CircularProgress size="9rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignContent="center">
        <Link to="/">Something has gone wrong - Go back</Link>
      </Box>
    );
  }

  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid item sm={12} lg={4}>
        <img
          className={classes.poster}
          alt={data?.title}
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
        />
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography variant="h3" align="center" gutterBottom>
          {data?.title} ({data.release_date.split("-")[0]})
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          {data?.tagline}
        </Typography>
        <Grid item className={classes.containerSpaceAround}>
          <Box display="flex" align="center">
            <Rating name="read-only" value={data?.vote_average / 2} readOnly />
            <Typography
              variant="subtitle1"
              gutterBottom
              style={{ marginLeft: "10px" }}
            >
              {data?.vote_average} / 10
            </Typography>
          </Box>
          <Typography variant="h6" align="center" gutterBottom>
            {data?.runtime}min / <span>{date.slice(4)}</span>{" "}
            <span>
              {data?.spoken_languages.length > 0
                ? `/ ${data?.spoken_languages[0].name}`
                : null}
            </span>
          </Typography>
        </Grid>
        <Grid item className={classes.genresContainer}>
          {data?.genres.map((genre, i) => (
            <Link
              className={classes.links}
              to="/"
              onClick={() => dispatch(selectGenreOrCategory(genre.id, 1))}
              key={i}
            >
              <img
                src={genreIcons[genre.name.toLowerCase()]}
                className={classes.genreImage}
                height={30}
                alt="Genre"
              />
              <Typography color="textPrimary" variant="subtitle1">
                {genre.name}
              </Typography>
            </Link>
          ))}
        </Grid>
        <Typography variant="h5" gutterBottom style={{ marginTop: "10px" }}>
          Overview
        </Typography>
        <Typography style={{ marginBottom: "2rem" }}>
          {data?.overview}
        </Typography>
        <Typography variant="h5" gutterBottom>
          Top Cast
        </Typography>
        <Grid item container spacing={2}>
          {data &&
            data.credits.cast
              .map(
                (character, i) =>
                  character.profile_path && (
                    <Grid
                      key={i}
                      item
                      xs={4}
                      md={2}
                      component={Link}
                      to={`/actors/${character.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <img
                        className={classes.castImage}
                        src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
                        alt={character.name}
                      />
                      <Typography color="textPrimary">
                        {character.name ? character.name : "Unknown"}
                      </Typography>
                      <Typography color="textSecondary">
                        {character.character.split("/")[0]}
                      </Typography>
                    </Grid>
                  )
              )
              .slice(0, 6)}
        </Grid>
        <Grid item container style={{ marginTop: "2rem" }}>
          <div className={classes.buttonsContainer}>
            <Grid
              item
              xs={12}
              sm={6}
              className={classes.buttonsContainer}
              style={{ marginBottom: isMobile && "2rem" }}
            >
              <ButtonGroup
                size={isMobile ? "small" : "medium"}
                variant="outlined"
              >
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`${data?.homepage}`}
                  endIcon={<Language />}
                >
                  Website{" "}
                </Button>
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.imdb.com/title/${data?.imdb_id}`}
                  endIcon={<MovieIcon />}
                >
                  IMDB
                </Button>
                <Button
                  onClick={() => setOpen(true)}
                  href="#"
                  endIcon={<Theaters />}
                >
                  Trailer
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size={isMobile ? "small" : "medium"}>
                <Button
                  onClick={addToFavorites}
                  endIcon={
                    isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />
                  }
                >
                  {isMovieFavorited ? "Unfavorite" : "Favorite"}
                </Button>
                <Button
                  onClick={addToWatchlist}
                  endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}
                >
                  Watchlist{" "}
                </Button>
                <Button
                  endIcon={<ArrowBack />}
                  sx={{ borderColor: "primary.main" }}
                >
                  <Typography
                    to="/"
                    component={Link}
                    color="inherit"
                    variant="subtitle2"
                  >
                    Back
                  </Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <Box marginTop="5rem" width="100%">
        <Typography variant="h3" gutterBottom align="center">
          You might also like
        </Typography>
        {recommendations ? (
          <MovieList movies={recommendations} numberOfMovies={12} />
        ) : (
          <Box>Sorry nothing was found</Box>
        )}
      </Box>
      <Modal
        closeAfterTransition
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
      >
        {data.videos.results.length > 0 && (
          <iframe
            autoPlay
            className={classes.video}
            frameBorder="0"
            title="Video Player"
            src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
            allow="autoplay"
          />
        )}
      </Modal>
    </Grid>
  );
};

export default MovieInformation;
