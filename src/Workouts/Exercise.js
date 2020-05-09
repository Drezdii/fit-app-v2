import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyledExercise, AnimationBar, ExerciseName } from './WorkoutComponents';
import { WorkoutSetsList } from './WorkoutSetsList';
import { variants, loadingVariant } from './WorkoutAnimations';
import { Container, Card, CardContent } from '@material-ui/core';

export const Exercise = props => {
    const exercise = useSelector(state => state.workouts.exercises[props.id]);
    const sets = useSelector(state => state.workouts.sets);
    const exInfoID = exercise ? exercise.exerciseInfo : 0;
    const exerciseInfo = useSelector(state => state.workouts.exerciseInfo[exInfoID]);
    const [hasSucceeded, setHasSucceeded] = useState(false);
    const [hasFailed, setHasFailed] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

    const dispatch = useDispatch();

    const saveChanges = (changes) => {
        const exercise =
        {
            ID: props.id,
            sets: Object.values(changes.editedSets).map(set => {
                return {
                    ...set,
                    // Use ID of 0 if its an added set
                    id: Number(set.id) || 0
                };
            }),
            deletedSetsIDs: changes.deletedSetsIDs
        };
        setIsSaving(true);
        return dispatch(props.saveExerciseChanges(exercise)).then(() => { onSuccess(); }).catch(e => { onError(); return Promise.reject(e); });
    };

    useEffect(() => {
        if (!isSaving)
            return;

        const timer = setTimeout(() => {
            // Start the saving animation if it's still saving after the timeout
            if (isSaving) {
                setShowLoading(true);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [isSaving]);

    const onSuccess = () => {
        setIsSaving(false);
        setHasSucceeded(true);
        setShowLoading(false);
    };

    const onError = () => {
        setIsSaving(false);
        setShowLoading(false);
        setHasFailed(true);
    };

    const removeExercise = () => {
        props.removeExercise(props.id);
    };

    const animationState = hasFailed ? 'failed' : hasSucceeded ? 'active' : 'inActive';
    let textState = hasFailed ? 'Failed' : showLoading ? 'Saving' : hasSucceeded ? 'Saved' : exerciseInfo ? exerciseInfo.name : 'Exercise';
    return (
        <Card>
            <ExerciseName
                animate={animationState}
                variants={variants}
                onAnimationComplete={() => { setHasSucceeded(false); setHasFailed(false); }}>

                {textState}
                {showLoading ?
                    <AnimationBar
                        animate={'saving'}
                        variants={loadingVariant}
                    />
                    : null
                }
            </ExerciseName>
            {exercise != null
                ? < WorkoutSetsList sets={sets} exercise={exercise} saveChanges={saveChanges} removeExercise={removeExercise} />
                : null
            }

        </Card>
    );
};