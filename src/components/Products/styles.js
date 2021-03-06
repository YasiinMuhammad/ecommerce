import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  root: {
    flexGrow: 1,
  },

  textField: {
    width: "55ch",
  },
  carousel: {
    margin: "10px",
    maxHeight: "425px",
    alignContent: "center",

  },
  carouselImage: {
    maxHeight: "100%",
    maxWidth: "100%",
    height: "auto",
    objectFit: "contain",
  },
  carouselContainer: {
    textAlign: "center",
  },
  searchButton: {
    width: "225px",
    margin: "10px"
  },
}));
