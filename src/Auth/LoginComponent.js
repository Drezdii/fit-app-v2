import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom';
import { setUser } from './AuthActions'
import { useDispatch } from 'react-redux'
import { getPayload } from '../core/TokenValidator'

const Wrapper = styled.div`
height: 100vh;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
background: rgb(62, 74, 101);
`

const LoginBox = styled.div`
display: flex;
flex-direction: column;
`

const Field = styled.input`
border: none;
padding: 5px;
margin: 10px 0px;
border-radius: 3px;
font-size: 1.3em;
text-align: center;
`

const Button = styled.button`
border: 0px;
cursor: pointer;
border-radius: 2px;
margin: 10px 0px;
background: white;
padding: 5px;
&:hover{
    background: #e4e4e4
}
`

const Error = styled.span`
color: red;
padding: 5px;
text-align: center;
`

export const LoginComponent = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('')
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')
    const [isWaiting, setIsWaiting] = useState(false)
    const [loggedSuccessfully, setLoggedSuccessfully] = useState(false)

    const dispatch = useDispatch();

    const handleLogin = async (event) => {
        // Show waiting icon
        setIsWaiting(true)

        // Prevent the form from reloading the page
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:64987/api/auth/login', { login, password });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token)
                const user = getPayload(response.data.token);
                // Dispatch user data to the store
                dispatch(setUser(user));
                setLoggedSuccessfully(true)
            }
            else {
                // If there is no token in the response
                setErrorMessage('Unexpected error. Try Again')
            }
        }
        catch (e) {
            setErrorMessage(e.response.data.errors)
        }
        finally {
            // Hide waiting icon
            setIsWaiting(false);
        }
    }
    // Redirect to main page after successful log in 
    let history = useHistory();
    useEffect(() => {
        if (loggedSuccessfully) {
            history.push('/');
        }
    }, [loggedSuccessfully]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        // Disable login button if any input is empty
        if (login.trim() && password.trim()) {
            setIsButtonDisabled(false)
        }
        else {
            setIsButtonDisabled(true)
        }

        // Clear any errors when login or password has changed
        if (errorMessage !== '') {
            setErrorMessage('')
        }
    }, [login, password]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Wrapper>
            <form onSubmit={handleLogin}>
                <LoginBox>
                    <Field placeholder="Login" onChange={(e) => setLogin(e.target.value)} />
                    <Field placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
                    <Error>{errorMessage}</Error>
                    <Button type="submit" disabled={isButtonDisabled}>{isWaiting ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Login'}</Button>
                </LoginBox>
            </form>
        </Wrapper>
    );
}