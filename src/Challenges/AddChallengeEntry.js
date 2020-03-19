import React, { useState } from 'react';
import styled from 'styled-components';

const AddInput = styled.input`
padding: 5px;
border: 1px solid #d1cfcb;
width: 30px;
height: 20px;
text-align: center;
`;

const AddButton = styled.button`
padding: 5px;
margin-top: 5px;
`;


export const AddChallengeEntry = props => {
    const [reps, setReps] = useState(0);

    const handleChange = event => {
        setReps(Number(event.target.value));
    };

    const handleAdd = () => {
        props.handleAdd(reps);
    };

    return (
        <div>
            <AddInput type="text" placeholder={String(reps)} onChange={handleChange} /><AddButton onClick={handleAdd}>Add</AddButton>
        </div>
    );
};