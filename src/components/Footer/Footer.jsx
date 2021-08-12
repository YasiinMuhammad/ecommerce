import { Link, CssBaseline, Typography, Grid, Box } from "@material-ui/core";
import React from "react";
import useStyles from "./styles";

const Footer = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://Yasiinmuhammad.com" target="_blank">
          Yasiin Muhammad
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  return (
    <div className={classes.root}>
      <CssBaseline />

      <footer className={classes.footer}>
        <Box >
          <Copyright />
        </Box>
      </footer>
    </div>
  );
};

export default Footer;
