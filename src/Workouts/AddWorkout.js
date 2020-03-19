import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { addNewWorkout } from './WorkoutsActions';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddWorkoutContainer = styled.div`
background: grey;
height: 80px;
`;

export const AddWorkout = () => {
    const dispatch = useDispatch();
    const userID = useSelector(state => state.user.id);
    const [date, setDate] = useState(new Date());

    const workout = {
        'workoutype': 2,
        'date': date,
        'exercises': [],
        userID
    };

    const saveWorkout = () => {
        dispatch(addNewWorkout(workout));
    };
    return (
        <AddWorkoutContainer>
            <ReactDatePicker selected={date}
                dateFormat="dd/MM/yyyy"
                onChange={date => setDate(date)} />
            <button onClick={saveWorkout}>Save</button>
        </AddWorkoutContainer>
    );
};