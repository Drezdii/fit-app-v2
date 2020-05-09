import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Toolbar, AppBar, Container, IconButton, Badge, makeStyles } from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Home from '@material-ui/icons/Home';

const useStyles = makeStyles(themes => ({
    grow: {
        display: 'flex',
        flexGrow: 1
    }
}));

export const TopBar = () => {
    const login = useSelector(state => state.user.login);

    const classes = useStyles();
    return (
        <AppBar position="static">
            <Toolbar>
                <Container>
                    <div className={classes.grow}>
                        <IconButton color="inherit">
                            <Home />
                        </IconButton >
                        <div className={classes.grow}></div>
                        <IconButton>
                            <Badge badgeContent={0} color="secondary">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        <IconButton color="inherit">
                            <Badge badgeContent={0} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            aria-label="account of current user"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>

                    </div>
                </Container>
            </Toolbar>
        </AppBar>
    );
};