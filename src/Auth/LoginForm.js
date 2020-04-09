import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { AuthWrapper, AuthContainer, AuthBox, AuthItem, AuthTitle, Field, Button, Error, StyledLink } from '../StyledComponents';
import { setUser } from './AuthActions';
import { useDispatch } from 'react-redux';
import { getPayload } from '../core/TokenValidator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import { apiLoginUser } from '../api';


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

    return (
        <AuthWrapper>
            <AuthBox>
                <form onSubmit={formik.handleSubmit}>
                    <AuthTitle>FIT APP</AuthTitle>
                    <AuthContainer>
                        <AuthItem>
                            <Field name='login' onChange={formik.handleChange} value={formik.values.login} placeholder='Login' />
                        </AuthItem>
                        <AuthItem>
                            <Field name='password' type='password' onChange={formik.handleChange} value={formik.values.password} placeholder='Password' />
                        </AuthItem>
                        {formik.status && formik.status.api ? <Error>{formik.status.api}</Error> : null}
                        <StyledLink to='/register'>Register</StyledLink>
                        <AuthItem>
                            <Button type='submit'>{formik.isSubmitting ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Login'}</Button>
                        </AuthItem>
                    </AuthContainer>

                </form>
            </AuthBox>
        </AuthWrapper>
    );
};