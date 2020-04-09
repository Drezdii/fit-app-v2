import React, { useState, useEffect } from 'react';
import { AuthWrapper, AuthContainer, AuthTitle, AuthItem, Field, Button, Error, StyledLink, AuthBox } from '../StyledComponents';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import { getPayload } from '../core/TokenValidator';
import { setUser } from './AuthActions';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { apiRegisterUser } from '../api';

export const RegisterForm = () => {
    const validationSchema = Yup.object({
        login: Yup.string().min(3, 'At least 3 characters'),
        password: Yup.string().min(8, 'At least 8 characters'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
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
                e.response.data.errors.forEach(error => {
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
    const loginError = formik.errors.login && formik.touched.login;
    const emailError = formik.errors.email && formik.touched.email;
    const passwordError = formik.errors.password && formik.touched.password;
    const confirmPasswordError = formik.errors.confirmPassword && formik.touched.confirmPassword;
    return (
        // Call setFieldTouched in onInput event to start validating the fields onChanged instead of onBlur
        <AuthWrapper>
            <AuthBox>
                <form onSubmit={formik.handleSubmit}>
                    <AuthTitle>FIT APP</AuthTitle>
                    <AuthContainer>
                        <AuthItem>
                            <Field placeholder="Login" name="login" onChange={formik.handleChange} onFocus={formik.handleBlur} onInput={() => formik.setFieldTouched('login', true, true)} />
                            {formik.status && formik.status.login ? <Error>{formik.status.login}</Error> : loginError ? <Error>{formik.errors.login}</Error> : null}
                        </AuthItem>
                        <AuthItem>
                            <Field placeholder="Email" name="email" onChange={formik.handleChange} onInput={() => formik.setFieldTouched('email', true, true)} />
                            {formik.status && formik.status.email ? <Error>{formik.status.email}</Error> : emailError ? <Error>{formik.errors.email}</Error> : null}
                        </AuthItem>

                        <AuthItem>
                            <Field placeholder="Password" name="password" type="password" onInput={() => formik.setFieldTouched('password', true, true)} onChange={formik.handleChange} />
                            {formik.status && formik.status.password ? <Error>{formik.status.password}</Error> : passwordError ? <Error>{formik.errors.password}</Error> : null}
                        </AuthItem>
                        <AuthItem>
                            <Field placeholder="Confirm password" name="confirmPassword" type="password" onChange={formik.handleChange} onInput={() => formik.setFieldTouched('confirmPassword', true, true)} />
                            {formik.status && formik.status.confirmPassword ? <Error>{formik.status.confirmPassword}</Error> : confirmPasswordError ? <Error>{formik.errors.confirmPassword}</Error> : null}
                            {formik.status && formik.status.api ? <Error>{formik.status.api}</Error> : null}
                        </AuthItem>
                        <StyledLink to="/login">Login</StyledLink>
                        <AuthItem>
                            <Button type="submit">{formik.isSubmitting ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Register'}</Button>
                        </AuthItem>
                    </AuthContainer>
                </form>
            </AuthBox>
        </AuthWrapper>
    );
};