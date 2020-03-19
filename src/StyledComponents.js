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
justify-content: center;
background: rgb(62, 74, 101);
`;

export const AuthContainer = styled.div`
display: flex;
flex-direction: column;
`;

export const Field = styled.input`
border: none;
padding: 5px;
margin: 10px 0px;
border-radius: 3px;
font-size: 1.3em;
text-align: center;
`;

export const Button = styled.button`
border: 0px;
cursor: pointer;
border-radius: 2px;
margin: 10px 0px;
background: white;
padding: 5px;
&:hover{
    background: #e4e4e4
}
`;

export const Error = styled.span`
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