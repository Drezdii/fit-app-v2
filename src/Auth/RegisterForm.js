import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getPayload } from '../core/TokenValidator';
import { setUser } from './AuthActions';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { apiRegisterUser } from '../api';
import { CssBaseline, Container, TextField, Button, Typography, Avatar, Link } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(12),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
}));

export const RegisterForm = () => {
    const validationSchema = Yup.object({
        login: Yup.string().min(3, 'At least 3 characters'),
        password: Yup.string().min(8, 'At least 8 characters'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords don\'t match'),
        email: Yup.string().email('Please provide a valid e-mail address')
    });

    const initialValues = {
        login: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    const [shouldRedirect, setShouldRedirect] = useState(false);


    // Redirect to the main page
    const history = useHistory();
    useEffect(() => {
        if (shouldRedirect) {
            history.push('/');
        }
    }, [shouldRedirect]); // eslint-disable-line react-hooks/exhaustive-deps

    const dispatch = useDispatch();

    const handleRegister = async (user, actions) => {
        try {
            const response = await apiRegisterUser(user);
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
                // Iterate over errors returned from API
                let apiErrors = {};
                e.response.data.forEach(error => {
                    apiErrors[error.type] = error.message;
                });
                actions.setStatus(apiErrors);
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

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values, actions) => {
            handleRegister(values, actions);
        }
    });

    const classes = useStyles();

    const loginError = formik.errors.login !== undefined || (formik.status && formik.status.login !== undefined);
    const emailError = formik.errors.email !== undefined || (formik.status && formik.status.email !== undefined);
    const passwordError = formik.errors.password !== undefined || (formik.status && formik.status.password !== undefined);
    const confirmPasswordError = formik.errors.confirmPassword !== undefined || (formik.status && formik.status.confirmPassword !== undefined);
    return (
        <Container maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Register account</Typography>
                <form onSubmit={formik.handleSubmit} noValidate className={classes.form}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="login"
                        label="Login"
                        name="login"
                        autoFocus
                        error={loginError}
                        onChange={formik.handleChange}
                        helperText={(formik.status && formik.status.login) || formik.errors.login}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="email"
                        label="E-mail"
                        name="email"
                        required
                        autoComplete="email"
                        error={emailError}
                        helperText={formik.errors.email}
                        onChange={formik.handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        type="password"
                        label="Password"
                        name="password"
                        error={passwordError}
                        helperText={formik.errors.password}
                        onChange={formik.handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="confirmPassword"
                        type="password"
                        label="Confirm Password"
                        name="confirmPassword"
                        error={confirmPasswordError}
                        helperText={formik.errors.confirmPassword}
                        onChange={formik.handleChange}
                    />
                    <Link href="/login" variant="body2">
                        Sign in instead
                    </Link>
                    <Button
                        className={classes.submit}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >Register</Button>
                </form>
            </div>
        </Container>

    );
};