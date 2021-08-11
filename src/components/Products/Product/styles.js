import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  root: {
    maxWidth: "100%",
  },
  media: {
    paddingTop: "100%",

    maxWidth: "100%",
    maxHeight: "100%",
    display: "block",
    backgroundSize: "contain",
  },
  cardActions: {
    display: "flex",
    justifyContent: "flex-end",
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
  },
  MuiCardMedia: {},
  typography: {
    fontSize: 12,
  },
}));
