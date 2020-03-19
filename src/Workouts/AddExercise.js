import React from 'react';
import { ExerciseName } from '../StyledComponents';
import styled from 'styled-components';

const StyledAddButton = styled(ExerciseName)`
background-color: #268c38;
`;

export const AddExercise = () => {
    return (
        <StyledAddButton>Add exercise</StyledAddButton>
    );
};