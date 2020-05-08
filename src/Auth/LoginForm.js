import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { setUser } from './AuthActions';
import { useDispatch } from 'react-redux';
import { getPayload } from '../core/TokenValidator';
import { useHistory } from 'react-router-dom';
import { apiLoginUser } from '../api';

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    error: {
        color: theme.palette.error.main
    }
}));

export const LoginForm = () => {
    const initialValues = {
        login: '',
        password: ''
    };

    const [shouldRedirect, setShouldRedirect] = useState(false);

    const dispatch = useDispatch();

    const handleLogin = async (user, actions) => {
        try {
            const response = await apiLoginUser(user);
            formik.setStatus({});
            if (response.data.token) {
                // Clean up any leftover API errors
                actions.setStatus({});
                localStorage.setItem('token', response.data.token);
                const user = getPayload(response.data.token);

                // Dispatch user data to the store
                dispatch(setUser(user));

                // Redirect after success
                setShouldRedirect(true);
            }
            else {
                // If there is no token in the response
                actions.setStatus({
                    api: 'Something went wrong. Try again.'
                });
            }
        }
        catch (e) {
            if (e.response !== undefined) {
                actions.setStatus({
                    api: e.response.data.errors
                });
            }
            else {
                actions.setStatus({
                    api: 'Something went wrong. Try again.'
                });
            }
        }
        finally {
            formik.setSubmitting(false);
        }
    };

    // Redirect to the main page
    const history = useHistory();
    useEffect(() => {
        if (shouldRedirect) {
            history.push('/');
        }
    }, [shouldRedirect]); // eslint-disable-line react-hooks/exhaustive-deps

    const formik = useFormik({
        initialValues,
        onSubmit: (values, actions) => {
            handleLogin(values, actions);
        }
    });

    const classes = useStyles();
    return (
        <Container maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Sign in</Typography>
                <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="login"
                        label="Login"
                        name="login"
                        autoComplete="email"
                        autoFocus
                        onChange={formik.handleChange}
                        value={formik.values.login}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                    <Typography component="p" variant="subtitle2" className={classes.error}>{formik.status && formik.status.api}</Typography>
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >Sign in</Button>
                    <Grid container>
                        <Grid item>
                            <Link href="/register" variant="body2">
                                {'Don\'t have an account? Sign Up'}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>

            </Box>
        </Container>
    );
};