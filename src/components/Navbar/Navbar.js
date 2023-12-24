import React, { useState, useEffect} from 'react';
import { AppBar, Button, Typography, Toolbar } from '@mui/material';
import { Link , useLocation} from 'react-router-dom';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { Avatar } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    let location = useLocation();
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    console.log(user);

    const logout = () => {
        dispatch({ type: "LOGOUT" });
        navigate("/");
        setUser(null);
       }
useEffect(() => {
    const token = user?.token;
    setUser(JSON.parse(localStorage.getItem('profile')))
}, [location])
return (<>
    <AppBar className={classes.appBar} position="static" color="inherit" >
        <div className={classes.brandContainer}>
            <Typography component={Link} to='/' className={classes.heading} variant="h2" align="center">Memories</Typography>
            <img className={classes.images} src="https://raw.githubusercontent.com/adrianhajdin/project_mern_memories/master/client/src/images/memories.png?token=AF56X74XONEUGZ4FD2FUIA27UURPI" alt="memoriies" height="60" />
        </div>
        <Toolbar className={classes.toolbar}>
            {user ? (
                <div className={classes.profile}>
                    <Avatar className={classes.profile} alt={user.result.name} src={user.result.imageUrl}>{user.result.profile}</Avatar>
                    <Typography className={classes.name} variant="h6">{user.result.name}</Typography>
                    <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>LogOut</Button>
                </div>
            ) :
                (
                    <Button component={Link} to='/auth' variant="contained" color="primary">SignIn</Button>)}
        </Toolbar>

    </AppBar>
</>)
};

export default Navbar;