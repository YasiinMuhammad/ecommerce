import React from "react";
import useStyles from "./style";
import { Link } from "react-router-dom";
import littleBird from "../../assets/little-bird.svg";
import { Grid, CssBaseline } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import { useAuth } from "../../contexts/AuthContext";

function Logout({refreshCart}) {
  const classes = useStyles();
  const { signout } = useAuth();

  const logging = (e) => {
    e.preventDefault();
    signout();
    refreshCart();
  };

  
  return (
    <>
      <CssBaseline />

      <div className={classes.login}>
        <Grid container justify="center">
          <Grid>
            <Link to="/">
              <img
              alt="Bird logo"
                style={{ objectFit: "contain" }}
                className={classes.loginLogo}
                src={littleBird}
              />
            </Link>
          </Grid>
          <Grid style={{marginTop: '75px'}}>
            <div className={classes.loginContainer}>
              <form>
                <h1 className={classes.loginContainerH1}>Logout</h1>

                <button
                  type="submit"
                  onClick={logging}
                  className={classes.loginRegisterButton}
                >
                  Sign out of account
                </button>
              </form>

              <Grid
                style={{
                  textAlign: "center",
                  fontSize: "16px",
                  color: "#767676",
                  marginTop: "15px",
                }}
              >
               
              <Divider />
                <p className={classes.p}>
                  Thank you for shpooing with Little Birdie!
                </p>
              </Grid>
              <br />
             
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default Logout;
