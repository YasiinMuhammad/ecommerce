import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import logo from "../../assets/little-bird.svg";
import useStyles from "./styles";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";


const Navbar = ({ totalItems }) => {
  const classes = useStyles();
  const location = useLocation();
  const { currentUser } = useAuth();

  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography
            to="/"
            component={Link}
            variant="h6"
            className={classes.title}
            color="inherit"
          >
            <img
              src={logo}
              alt="Commerce.js"
              height="25px"
              className={classes.image}
            />
            little Birdie
          </Typography>
          <div className={classes.grow} />
          {!currentUser ? (
            <>
              <Typography
                component={Link}
                to="/login"
                className={classes.logIn}
              >
                Hello, {!currentUser ? "Sign In" : currentUser.email}
              </Typography>
              {location.pathname === "/" && (
                <div className={classes.button}>
                  <Tooltip title="Sign in to access cart!">
                    <IconButton
                      
                      component={Link}
                      aria-label="Show cart items"
                      color="inherit"
                    >
                      <Badge badgeContent={totalItems} color="secondary">
                        <ShoppingCart />
                      </Badge>
                    </IconButton>
                  </Tooltip>
                </div>
              )}
            </>
          ) : (
            <>
              <Typography
                component={Link}
                to="/logout"
                className={classes.logIn}
              >
                Hello, {currentUser.email}
              </Typography>
              <Typography
                component={Link}
                to="/orders"
                className={classes.logIn}
              >
                Orders
              </Typography>
              
                <div className={classes.button}>
                  <IconButton
                    to="/cart"
                    component={Link}
                    aria-label="Show cart items"
                    color="inherit"
                  >
                    <Badge badgeContent={totalItems} color="secondary">
                      <ShoppingCart />
                    </Badge>
                  </IconButton>
                </div>
         
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
