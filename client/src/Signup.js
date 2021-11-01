import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";
import SideBanner from "./components/SideBanner";

const Login = (props) => {
  const history = useHistory();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container spacing={2} >
      <Grid item xs={12} sm={12} md={6} style={{flexBasis:'40%'}}>
        <SideBanner />
      </Grid>
       <Grid  item xs={12} sm={12} md={6} style={{flexBasis:'60%'}}>
        <Box style={{flexBasis:'60%', width:'120%'}}>
          <Grid item align={'end'}  
                style={{display:'flex', justifyContent:'flex-end', margin:'30px 42px 86px'}}
          >
            <Typography
            style={{ margin:'auto', marginRight:'30px', color:'gray', fontSize:'14px'}}
            >Already have an account?</Typography>
            <Button 
            onClick={() => history.push("/login")}
            color="primary"
            boxShadow={3}
            style={{width:'170px', height:'54px', boxShadow: '0px 0px 10px 0px #8844'}}
            >
            Login
            </Button>
          </Grid>
          <form onSubmit={handleRegister} style={{width:'63%', marginLeft: '87px'}}>
           <Typography style={{fontSize: '26px', fontWeight:'600'}}>Create an account.</Typography>
            <Grid container
               direction="column"
              justifyContent="center"
              alignItems="center"
              >
              <Grid container direction="column">
                <FormControl  margin="normal" required style={{width:'100%', fontSize:'26px'}}>
                  <span style={{color:'gray', fontSize:'14px', marginBottom: '10px'}}>Username</span>
                  <TextField
                    aria-label="username"
                    name="username"
                    type="text"
                    autoFocus ={true}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid container direction="column">
                <FormControl>
                  <span style={{color:'gray', fontSize:'14px', marginBottom: '10px', marginTop: '20px'}}>E-mail address</span>
                  <TextField
                    aria-label="e-mail address"
                    type="email"
                    name="email"
                    required
                  />
                </FormControl>
              </Grid>
              <Grid container direction="column">
                <FormControl error={!!formErrorMessage.confirmPassword}>
                <span style={{color:'gray', fontSize:'14px', marginBottom: '10px', marginTop: '20px'}}>Password</span>
                  <TextField
                    aria-label="password"
                    type="password"
                    inputProps={{ minLength: 6 }}
                    name="password"
                    required
                  />
                  <FormHelperText>
                    {formErrorMessage.confirmPassword}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid container direction="column">
                <FormControl error={!!formErrorMessage.confirmPassword}>
                  <span style={{color:'gray', fontSize:'14px', marginBottom: '10px', marginTop: '20px'}}>Confirm Password</span>
                  <TextField
                    aria-label="confirm password"
                    type="password"
                    inputProps={{ minLength: 6 }}
                    name="confirmPassword"
                    required
                  />
                  <FormHelperText>
                    {formErrorMessage.confirmPassword}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Button type="submit" variant="contained" size="large" color="primary" style={{width:'160px', height:'56px', marginTop: '40px'}}>
                Create
              </Button>
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
