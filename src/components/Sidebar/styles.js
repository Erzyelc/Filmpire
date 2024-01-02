import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  imageLink: {
    display: "flex",
    justifyContent: "center",
    padding: "10% 0",
  },
  image: {
    width: "70%",
  },
  links: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
  genreImage: {
    filter: theme.palette.mode === "dark" && "invert(1)",
  },
}));
