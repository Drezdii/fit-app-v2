import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Global container
export const Container = styled.div`
margin: 0 auto;
padding: 0;
width: 50%;
`;

export const AuthWrapper = styled.div`
height: 100vh;
display: flex;
flex-direction: column;
align-items: center;
background: rgb(235, 235, 235);
justify-content: center;
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
font-size: 1.3em;
text-align: center;
`;

export const Button = styled.button`
width: 50%;
color: black;
border: 0px;
text-align: center;
cursor: pointer;
margin: 10px;
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

export const ExerciseName = styled(motion.div)`
padding: 10px;
position: relative;
background: #3E4A65;
height: 20px;
text-align: center;
color: white;
`;