import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Tooltip,
  Typography,
  Menu,
  MenuItem,
  Button,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import logo from "../../assets/little-bird.svg";
import useStyles from "./styles";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import MenuIcon from "@material-ui/icons/Menu";

const Navbar = ({ totalItems }) => {
  const classes = useStyles();
  const location = useLocation();
  const { currentUser } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
              <IconButton
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <img
                  src={logo}
                  alt="Bird logo"
                  height="55px"
                  className={classes.image}
                />

                <MenuItem onClick={handleClose} to="/orders" component={Link}>
                  <Typography className={classes.logIn}>My Orders</Typography>
                </MenuItem>

                <MenuItem onClick={handleClose} component={Link} to="/logout">
                  <Typography className={classes.logIn}> Logout</Typography>
                </MenuItem>
              </Menu>

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
