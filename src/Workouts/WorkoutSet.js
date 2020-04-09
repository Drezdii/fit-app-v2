import React, { useState } from 'react';
import styled from 'styled-components';

const CompletedCheckBox = styled.label`
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

const CheckMark = styled.span`
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

const CheckBox = styled.input`
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

const Container = styled.div`
display: flex;
margin-top: 5px;
`;

const Remove = styled.button`
border: 0px;
`;


// Rename from Set to not collide with build-in Set class
export const WorkoutSet = ({ set, handleChange, handleRemove }) => {
    const handleReps = input => {
        const newSet = {
            ...set,
            reps: Number(input.target.value)
        };

        handleChange(newSet);
    };

    const handleWeight = input => {
        const newSet = {
            ...set,
            weight: Number(input.target.value)
        };

        handleChange(newSet);
    };

    const handleCompletion = input => {
        const newSet = {
            ...set,
            completed: Boolean(input.target.checked)
        };

        handleChange(newSet);;
    };

    return (
        set != null ?
            <Container>
                <div>
                    <CompletedCheckBox>
                        <CheckBox type='checkbox' checked={set.completed} onChange={handleCompletion}></CheckBox>
                        <CheckMark></CheckMark>
                    </CompletedCheckBox>
                </div>
                <div>
                    {<input value={set.reps} onChange={handleReps} />}
                x
                {<input value={set.weight} onChange={handleWeight} />}
                </div>
                <div>
                    <button onClick={() => handleRemove(set.id)}>X</button>
                </div>
            </Container>
            : null

    );
};