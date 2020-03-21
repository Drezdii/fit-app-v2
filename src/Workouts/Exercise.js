import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { WorkoutSet } from './WorkoutSet';
import { ExerciseName } from '../StyledComponents';
import { saveExerciseChanges } from './WorkoutsActions';
import { motion } from 'framer-motion';
import shortid from 'shortid';

const SetsContainer = styled.div`
`;

const StyledExercise = styled.div`
margin-right: 5%;
display: flex;
flex-direction: column;
`;

const SaveButton = styled.button`
background: #3075bf;
border: 0px;
color: white;
cursor: pointer;
`;

const CancelButton = styled(SaveButton)`
background: red;
cursor: pointer;
`;

const AddSetButton = styled(SaveButton)`
background: green;
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
    const exInfoID = exercise ? exercise.exerciseInfo : 0;
    const exerciseInfo = useSelector(state => state.workouts.exerciseInfo[exInfoID]);
    const sets = useSelector(state => state.workouts.sets);
    const [editedSets, setEditedSets] = useState({});
    const [addedSetsIDs, setAddedSetsIDs] = useState([]);
    const [hasSucceeded, setHasSucceeded] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

    const dispatch = useDispatch();

    let allSets = [];

    if (exercise) {
        allSets = [...exercise.sets, ...addedSetsIDs];
    }

    const handleChange = set => {
        setEditedSets({ ...editedSets, [set.id]: { ...set } });
    };

    const clearSets = () => {
        setEditedSets({});
        setAddedSetsIDs([]);
    };

    const saveChanges = () => {
        if (!isSaving) {
            const exercise =
            {
                ID: props.id,
                sets: Object.values(editedSets).map(set => {
                    return {
                        ...set,
                        id: Number(set.id) || 0
                    };
                })
            };
            console.log(exercise);
            setIsSaving(true);
            dispatch(saveExerciseChanges(exercise, onSucces));
        }
    };

    const cancelChanges = () => {
        // Reset the editedSets object
        clearSets();
    };

    const addSet = () => {
        const id = shortid.generate();
        setAddedSetsIDs([...addedSetsIDs, id]);
        setEditedSets({ ...editedSets, [id]: { id, reps: 0, weight: 0, completed: false, exerciseID: props.id } });
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

    const onSucces = () => {
        setIsSaving(false);
        setHasSucceeded(true);
        setShowLoading(false);
        clearSets();
    };

    const hasEditedSets = Object.keys(editedSets).length !== 0;
    return (
        <StyledExercise>
            <ExerciseName
                animate={hasSucceeded ? 'active' : 'inActive'}
                variants={variants}
                onAnimationComplete={() => { setHasSucceeded(false); }}>

                {showLoading ? 'Saving' :
                    hasSucceeded ?
                        'Saved' :
                        exerciseInfo ? exerciseInfo.name : 'Exercise'
                }
                {showLoading ?
                    <SavingAnimation
                        animate={'saving'}
                        variants={loadingVariant}
                    />
                    : null
                }

            </ExerciseName>
            <div>
                {hasEditedSets ? <SaveButton onClick={saveChanges}>Save changes</SaveButton> : null}
                {hasEditedSets ? <CancelButton onClick={cancelChanges}>Cancel</CancelButton> : null}
                {<AddSetButton onClick={addSet}>Add set</AddSetButton>}
            </div>
            <SetsContainer>
                {
                    exercise != null ?
                        <div>
                            {allSets.map(id => {
                                let set = sets[id];
                                // Pass the set from the state if it has been edited
                                if (Object.keys(editedSets).includes(id.toString())) {
                                    set = editedSets[id];
                                }

                                return <WorkoutSet set={set} key={id} handleChange={handleChange} />;
                            })}
                        </div>
                        : 'No sets to show'
                }
            </SetsContainer>
        </StyledExercise >
    );
};