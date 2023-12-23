import React, { useState, useEffect } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";
import useStyles from './styles';
import { LockOpenOutlined } from '@material-ui/icons';
import Input from './Input';
import Icon from './icon';
import { jwtDecode } from 'jwt-decode';
import {signup, signin} from '../../actions/auth';


const initialState = {firstName:"", lastName:"", email:"",password:"", confirmPassword:""}
const Auth = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const classses = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignUp] = useState(false)
    const [formData, setFormData]=  useState(initialState);

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    }

    const handleChange = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value});

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        if(isSignup)
        dispatch(signup(formData, navigate));

        else{
        dispatch(signin(formData, navigate));
         
        }
     }

    const switchMode = () => {
        setIsSignUp((prevSignUp) => !prevSignUp);
        setShowPassword(false);
       // handleShowPassword(false);
    }

    const googleSuccess = async (res) => {

        console.log(res);
        const result = jwtDecode(res?.credential);
        const token =  result.jti; 
        try {

          dispatch({type:'AUTH', data : {result, token}})
          navigate('/');
        }
        catch (error) {
            console.log(error)
        }
    }
    const googleFailure = (error) => {
        console.log(error);
        console.log("Google Sign In was Unsuccessful. Try Again Later");
    }

    return (<>
        <Container component="main" maxWidth="xs">
            <Paper className={classses.paper} elevation={3}>
                <Avatar className={classses.avatar}>
                    <LockOpenOutlined />
                </Avatar>
                <Typography variant='h5'>
                    {isSignup ? "Sign Up" : "Sign In"}
                </Typography>
                <form className={classses.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>

                                    <Input name='firstName' label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name='lastName' label="Last Name" handleChange={handleChange} autoFocus half />

                                </>
                            )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                    </Grid>
                    <Button type="submit" fullWidth variant='contained' color="primary" className='classes.submit'>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin
              
                render={(renderProps)=>(
                    <Button className={classses.googleButton}
                    color="primary"
                    fullWidth
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    startIcon={<Icon/>}
                    variant="contained">
                    Google Sign In
                    </Button>  
                )}
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy={"single_host_origin"}
                />
                    <Grid container justify="flex-end">
                        <Grid item >
                            <Button onClick={switchMode}>
                                {isSignup ? "Already have an account?Sign In" : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    </>)
}

export default Auth;