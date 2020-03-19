import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWorkoutsByUserID } from './WorkoutsActions';
import { Workout } from './Workout';
import styled from 'styled-components';
import { Container } from '../StyledComponents';
import { AddWorkout } from './AddWorkout';

const WorkoutsContainer = styled(Container)`
display: flex;
flex-direction: column;
`;

export const WorkoutsList = () => {
    const dispatch = useDispatch();
    const userID = useSelector(state => state.user.id);
    const workoutsIDs = useSelector(state => state.workouts.workoutsIDs);

    // Get all workouts for the user at the startup
    useEffect(() => {
        dispatch(getWorkoutsByUserID(userID));
    }, [dispatch, userID]);

    return (
        <WorkoutsContainer>
            <AddWorkout />
            {
                workoutsIDs != null ?
                    workoutsIDs.map(id => {
                        return <Workout id={id} key={id} />;
                    })
                    : 'No workouts to show'
            }
        </WorkoutsContainer>
    );
};