import React, { useState } from 'react';
import styled from 'styled-components';
import { WorkoutSet } from './WorkoutSet';
import shortid from 'shortid';

const SetsContainer = styled.div``;

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

export const WorkoutSetsList = props => {
    const [editedSets, setEditedSets] = useState({});
    const [addedSetsIDs, setAddedSetsIDs] = useState([]);

    const handleChange = set => {
        setEditedSets({ ...editedSets, [set.id]: { ...set } });
    };

    const clearSets = () => {
        setEditedSets({});
        setAddedSetsIDs([]);
    };

    const cancelChanges = () => {
        // Reset the editedSets object
        clearSets();
    };

    const saveChanges = () => {
        props.saveChanges(editedSets);
    };

    const addSet = () => {
        const id = shortid.generate();
        setAddedSetsIDs([...addedSetsIDs, id]);
        setEditedSets({ ...editedSets, [id]: { id, reps: 0, weight: 0, completed: false, exerciseID: props.exercise.id } });
    };

    const allSets = [...props.exercise.sets, ...addedSetsIDs];
    console.log(allSets);

    const hasEditedSets = Object.keys(editedSets).length !== 0;
    return (
        <>
            <div>
                {hasEditedSets ? <SaveButton onClick={saveChanges}>Save changes</SaveButton> : null}
                {hasEditedSets ? <CancelButton onClick={cancelChanges}>Cancel</CancelButton> : null}
                {<AddSetButton onClick={addSet}>Add set</AddSetButton>}
            </div>
            <SetsContainer>
                {
                    props.exercise != null ?
                        <div>
                            {allSets.map(id => {
                                let set = props.sets[id];
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
        </>
    );
};