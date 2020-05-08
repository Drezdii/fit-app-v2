import styled from 'styled-components';
import { motion } from 'framer-motion';

export const StyledExercise = styled.div`
margin-right: 5%;
width: 20%;
display: flex;
flex-direction: column;
`;

export const AnimationBar = styled(motion.div)`
width: 15px;
height: 2px;
background-color: #FFFFFF;
position: absolute;
left: 0;
bottom: 0;
`;

export const ExerciseName = styled(motion.div)`
padding: 10px;
position: relative;
background: #3E4A65;
height: 20px;
text-align: center;
color: white;
`;

export const ExercisesContainer = styled.div`
display: flex;
flex-direction: row;
position: relative;
`;

export const StyledWorkout = styled.div`
background: #b09997;
margin-top: 30px;
padding: 10px 10px;
`;

export const CompletedCheckBox = styled.label`
display: block;
position: relative;
padding-left: 35px;
margin-bottom: 12px;
cursor: pointer;

-webkit-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
user-select: none;
`;

export const CheckMark = styled.span`
position: absolute;
top: 0;
left: 0;
height: 25px;
width: 25px;
background-color: #eee;
  
&:hover{
  background: #ccc;
}

&:after {
content: "";
position: absolute;
display: none;

left: 9px;
top: 5px;
width: 5px;
height: 10px;
border: solid white;
border-width: 0 2px 2px 0px;
-webkit-transform: rotate(45deg);
-ms-transform: rotate(45deg);
transform: rotate(45deg);
}
`;

export const CheckBox = styled.input`
position: absolute;
opacity: 0;
cursor: pointer;
height: 0;
width: 0;
left: 0;

/* Background color when checked */
&:checked ~ ${CheckMark}{
    background-color: #2196F3;
}

/* Show the checkmark */
&:checked ~ ${CheckMark}:after {
    display: block;
}
`;

export const Remove = styled.button`
border: 0px;
`;

export const RepsInput = styled.input`
width: 45%;
font-size: 1.2em;
`;