import React, { useEffect } from "react";
import { Typography, Button, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { ExitToApp } from "@mui/icons-material";

import { useGetListQuery } from "../../services/TMDB";
import { userSelector } from "../../features/auth";
import { RatedCards } from "..";

const Profile = () => {
  const { user } = useSelector(userSelector);

  const accountId = localStorage.getItem("accountId") || user.id;
  const sessionId = localStorage.getItem("session_id");

  // Get a list of all the movies you have added to your favorites.
  const { data: favoriteMovies, refetch: refetchFavorites } = useGetListQuery({
    listName: "favorite/movies",
    accountId,
    sessionId,
    page: 1,
  });
  // Get a list of all the movies you have added to your watchlist.
  const { data: watchlistMovies, refetch: refetchWatchlisted } =
    useGetListQuery({
      listName: "watchlist/movies",
      accountId,
      sessionId,
      page: 1,
    });

  useEffect(() => {
    refetchFavorites();
    refetchWatchlisted();
  }, []);

  const logOut = () => {
    localStorage.removeItem("session_id");
    localStorage.removeItem("authenticated");
    localStorage.removeItem("request_token");

    window.location.href = "/";
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>
        <Button color="inherit" onClick={logOut}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {!favoriteMovies?.results?.length && !watchlistMovies?.results?.length ? (
        <Typography variant="h5">
          Add favorites or watchlist some movies to see them here!
        </Typography>
      ) : (
        <Box>
          <RatedCards title="Favorite Movies" data={favoriteMovies} />
          <RatedCards title="Watchlist" data={watchlistMovies} />
        </Box>
      )}
    </Box>
  );
};

export default Profile;
