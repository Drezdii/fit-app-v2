import React from 'react';
import { StyledWorkout, ExercisesContainer } from './WorkoutComponents';
import { useSelector, useDispatch } from 'react-redux';
import { Exercise } from './Exercise';
import moment from 'moment';
import { deleteExercise, saveExerciseChanges } from './WorkoutsActions';

export const Workout = props => {
    const workout = useSelector(state => state.workouts.byId[props.id]);

    const dispatch = useDispatch();

    const removeExercise = (exerciseId) => {
        dispatch(deleteExercise(props.id, exerciseId));
    };

    return (
        <StyledWorkout>
            <p>{moment(workout.date).format('ddd, Do MMMM YYYY')}</p>
            <ExercisesContainer>
                {workout && workout.exercises ?
                    <>
                        {workout.exercises.map(id => {
                            return <Exercise id={id} key={id} removeExercise={removeExercise} saveExerciseChanges={saveExerciseChanges} />;
                        })}
                    </>
                    : 'Could not load exercises. Try again.'}

            </ExercisesContainer>
        </StyledWorkout>
    );
};