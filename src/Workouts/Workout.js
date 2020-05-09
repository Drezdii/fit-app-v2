import React from 'react';
import { StyledWorkout, ExercisesContainer } from './WorkoutComponents';
import { useSelector, useDispatch } from 'react-redux';
import { Exercise } from './Exercise';
import moment from 'moment';
import { deleteExercise, saveExerciseChanges } from './WorkoutsActions';
import { Card, CardHeader, CardContent, makeStyles, Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    card: {
        marginTop: theme.spacing(8),
    },
    exercise: {
        marginRight: theme.spacing(8),
        marginBottom: theme.spacing(4)
    }
}));

export const Workout = props => {
    const workout = useSelector(state => state.workouts.byId[props.id]);

    const dispatch = useDispatch();

    const removeExercise = (exerciseId) => {
        dispatch(deleteExercise(props.id, exerciseId));
    };

    const classes = useStyles();
    return (
        <Card className={classes.card} elevation={18}>
            <CardHeader title={moment(workout.date).format('ddd, Do MMMM YYYY')} />
            <CardContent>
                <Grid container>

                    {workout && workout.exercises ?
                        <>
                            {workout.exercises.map(id => {

                                return (
                                    <Grid item xs={3} className={classes.exercise} key={id}>
                                        <Exercise id={id} key={id} removeExercise={removeExercise} saveExerciseChanges={saveExerciseChanges} />
                                    </Grid>);
                            })}
                        </>
                        : 'Could not load exercises. Try again.'}
                </Grid>
            </CardContent>
        </Card >
    );
};