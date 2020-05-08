import React, { useState } from 'react';
import styled from 'styled-components';
import { CompletedCheckBox, CheckBox, CheckMark, RepsInput } from './WorkoutComponents';

const Container = styled.div`
display: flex;
margin-top: 5px;
`;

// Rename from Set to not collide with build-in Set class
export const WorkoutSet = ({ set, handleChange, handleRemove }) => {
    const handleReps = input => {
        const newSet = {
            ...set,
            reps: Number(input.target.value) || 0 // Default to 0 if NaN was provided
        };

        handleChange(newSet);
    };

    const handleWeight = input => {
        const newSet = {
            ...set,
            weight: Number(input.target.value) || 0 // Default to 0 if NaN was provided
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
                    {<RepsInput value={set.reps} onChange={handleReps} />}
                x
                {<RepsInput value={set.weight} onChange={handleWeight} />}
                </div>
                <div>
                    <button onClick={() => handleRemove(set.id)}>X</button>
                </div>
            </Container>
            : null

    );
};