import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { ExerciseName } from '../StyledComponents';
import { saveExerciseChanges } from './WorkoutsActions';
import { motion } from 'framer-motion';
import { WorkoutSetsList } from './WorkoutSetsList';

const StyledExercise = styled.div`
margin-right: 5%;
display: flex;
flex-direction: column;
`;

const SavingAnimation = styled(motion.div)`
width: 15px;
height: 2px;
background-color: #FFFFFF;
position: absolute;
left: 0;
bottom: 0;
`;

// Animations
const variants = {
    active: {
        backgroundColor: '#4BB543',
        color: 'rgb(255, 255, 255)',
        transition: {
            duration: 0.7,
            // Display 'Saved' text for another 0.5s after finishing the animation
            repeatDelay: 0.5
        }
    },
    inActive: {
        transition: {
            delay: 0.5,
            duration: 0.7
        },
        backgroundColor: '#3E4A65',
    },
    failed: {
        backgroundColor: '#e33814',
        color: 'rgb(255, 255, 255)',
        transition: {
            duration: 0.7,
            // Display 'Saved' text for another 0.5s after finishing the animation
            repeatDelay: 0.5
        }
    }
};

const loadingVariant = {
    saving: {
        left: '95%',
        transition: {
            flip: Infinity,
            ease: 'easeOut',
            duration: 0.8
        }
    }
};


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
        return dispatch(saveExerciseChanges(exercise)).then(() => { onSuccess(); }).catch(e => { onError(); return Promise.reject(e); });
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
        <StyledExercise>
            <ExerciseName
                animate={animationState}
                variants={variants}
                onAnimationComplete={() => { setHasSucceeded(false); setHasFailed(false); }}>

                {textState}
                {showLoading ?
                    <SavingAnimation
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
        </StyledExercise >
    );
};