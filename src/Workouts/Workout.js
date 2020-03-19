import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Exercise } from './Exercise';
import moment from 'moment';

const ExercisesContainer = styled.div`
display: flex;
flex-direction: row;
position: relative;
`;

const StyledWorkout = styled.div`
background: #b09997;
margin-top: 30px;
padding: 10px 10px;
`;

export const Workout = props => {
    const workout = useSelector(state => state.workouts.byId[props.id]);
    return (
        <StyledWorkout>
            <p>{moment(workout.date).format('ddd, Do MMMM YYYY')}</p>
            <ExercisesContainer>
                {workout && workout.exercises ?
                    <>
                        {workout.exercises.map(id => {
                            return <Exercise id={id} key={id} />;
                        })}
                    </>
                    : 'Could not load exercises. Try again.'}

            </ExercisesContainer>
        </StyledWorkout>
    );
};