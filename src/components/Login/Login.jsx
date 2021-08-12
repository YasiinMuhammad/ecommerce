import React, { useState } from "react";
import useStyles from "./style";
import { Link } from "react-router-dom";
import littleBird from "../../assets/little-bird.svg";
import { Grid, CssBaseline, TextField } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import { useAuth } from "../../contexts/AuthContext";

function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logIn, registerAccount } = useAuth();
  var emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  const[error, setError] = useState(false);
  const signIn = (e) => {
    e.preventDefault();
    if (emailPattern.test(email)) {
      logIn(email, password);
    } else {
      setError(true)
    }
  };

  const register = (e) => {
    e.preventDefault();
    if (emailPattern.test(email)) {
      registerAccount(email, password);
    } else {
      setError(true)
    }
  };

  return (
    <>
      <CssBaseline />

      <div className={classes.login}>
        <Grid container justify="center">
          <Grid>
            <Link to="/">
              <img
                alt="Little Bird logo"
                style={{ objectFit: "contain" }}
                className={classes.loginLogo}
                src={littleBird}
              />
            </Link>
          </Grid>
          <Grid>
            <div className={classes.loginContainer}>
              <form>
                <h1 className={classes.loginContainerH1}>Sign-in</h1>
                <h5 className={classes.loginContainerh5}>E-mail</h5>
                <TextField
                  size="small"
                  variant="outlined"
                  className={classes.inputBox}
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={error}
                  helperText={ error ? "Please use a valid email" : ""}
                />

                <h5 className={classes.loginContainerh5}>Password</h5>
                <TextField
                  size="small"
                  variant="outlined"
                  className={classes.inputBox}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                 
                />

                <button
                  type="submit"
                  onClick={signIn}
                  className="login__signInButton"
                >
                  Sign In
                </button>
              </form>

              <p className={classes.p}>
                By signing-in you agree to the Little Birdie Conditions of Use &
                Sale. Please see our Privacy Notice, our Cookies Notice and our
                Interest-Based Ads Notice.
              </p>
              <Grid
                style={{
                  textAlign: "center",
                  fontSize: "10px",
                  color: "#767676",
                  marginTop: "-15px",
                }}
              >
                <p>New to Little Birdie?</p>
              </Grid>
              <Divider />
              <br />
              <button
                onClick={register}
                className={classes.loginRegisterButton}
              >
                Create your Birdie Account
              </button>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default Login;
