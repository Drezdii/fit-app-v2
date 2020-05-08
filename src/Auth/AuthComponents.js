import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const AuthWrapper = styled.div`
height: 100vh;
display: flex;
flex-direction: column;
align-items: center;
background: rgb(235, 235, 235);
justify-content: center;
`;

export const StyledForm = styled.form`
border: 1px solid white;
border-radius: 4px;
background: #512DA8;
padding-bottom: 15px;
`;

export const AuthTitle = styled.p`
font-weight: 200;
text-align: center;
color: white;
font-size: 25px;
`;

export const AuthBox = styled.div`
background: rgb(62, 74, 101);
`;

export const AuthItem = styled.div`
margin: 20px 30px 0px 30px;
text-align: center;
`;

export const AuthContainer = styled.div`
display: flex;
flex-direction: column;
`;

export const Field = styled.input`
border: none;
padding: 5px;
font-size: 1.2em;
color: white;
border-bottom: 1px solid white;
background: transparent;

&::placeholder{
    color: #d1cfcf;
}
`;

export const Button = styled.button`
width: 50%;
color: black;
border: 0px;
text-align: center;
cursor: pointer;
margin-top: 10px;
padding: 10px;

&:hover{
    background: #e4e4e4
}
`;

export const Error = styled.p`
margin: 0px;
color: red;
padding: 5px;
text-align: center;
`;

export const StyledLink = styled(Link)`
color: white;
`;