import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  InputAdornment
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
import SideBanner from "./components/SideBanner";

const Login = (props) => {
  const history = useHistory();
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={6} style={{ flexBasis: '40%' }}>
        <SideBanner />
      </Grid>
      <Grid item xs={12} sm={12} md={6} style={{ flexBasis: '60%' }}>
        <Box style={{ flexBasis: '60%', width: '120%' }}>
          <Grid item align={'end'}
            style={{ display: 'flex', justifyContent: 'flex-end', margin: '30px 42px 86px' }}
          >
            <Typography
              style={{ margin: 'auto', marginRight: '30px', color: 'gray', fontSize: '14px' }}
            >
              Don't have an account?
            </Typography>
            <Button
              color="primary"
              onClick={() => history.push("/register")}
              boxShadow={3}
              style={{ width: '170px', height: '54px', boxShadow: '0px 0px 10px 0px #8844' }}
            >
              Create account
            </Button>
          </Grid>
          <form onSubmit={handleLogin} style={{ width: '63%', marginLeft: '87px' }}>
            <Grid container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Grid container direction="column">
                <Typography style={{ fontSize: '26px', fontWeight: '600' }}>Welcome back!</Typography>
                <FormControl margin="normal" required style={{ width: '100%', fontSize: '26px' }}>
                  <span style={{ color: 'gray', fontSize: '14px', marginBottom: '20px' }}>User Name</span>
                  <TextField
                    aria-label="User Name"
                    name="username"
                    type="username"
                    autoFocus={true}
                    placeholder="User Name"
                  />
                </FormControl>
              </Grid>
              <FormControl margin="normal" required style={{ width: '100%' }}>
                <span style={{ color: 'gray', fontSize: '14px', marginBottom: '20px' }}>Password</span>
                <TextField
                  aria-label="password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  InputProps={{
                    endAdornment: <InputAdornment position="end"><Button color="primary" href="/forgot">Forgot?</Button></InputAdornment>,
                  }}
                />
              </FormControl>
              <Grid>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  style={{ width: '160px', height: '56px', marginTop: '60px' }}
                  color="primary"
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
