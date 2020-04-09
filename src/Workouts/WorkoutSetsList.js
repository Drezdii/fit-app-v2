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
    const [deletedSetsIDs, setDeletedSetsIDs] = useState([]);

    const handleChange = set => {
        setEditedSets({ ...editedSets, [set.id]: { ...set } });
    };

    const clearSets = () => {
        setEditedSets({});
        setAddedSetsIDs([]);
    };

    const removeSet = id => {
        setDeletedSetsIDs([...new Set([...deletedSetsIDs, id])]);
    };

    const saveChanges = () => {
        props.saveChanges({ editedSets, deletedSetsIDs })
            .then(() => { clearSets(); })
            .catch(e => console.log(e));
    };

    const addSet = () => {
        const id = shortid.generate();
        setAddedSetsIDs([...addedSetsIDs, id]);
        setEditedSets({ ...editedSets, [id]: { id, reps: 0, weight: 0, completed: false, exerciseID: props.exercise.id } });
    };

    const allSets = [...props.exercise.sets, ...addedSetsIDs];
    const hasEditedSets = Object.keys(editedSets).length !== 0 || deletedSetsIDs.length !== 0;
    return (
        <>
            <div>
                {hasEditedSets ? <SaveButton onClick={saveChanges}>Save changes</SaveButton> : null}
                {hasEditedSets ? <CancelButton onClick={clearSets}>Cancel</CancelButton> : null}
                {<AddSetButton onClick={addSet}>Add set</AddSetButton>}
            </div>
            <SetsContainer>
                {
                    props.exercise != null ?
                        <div>
                            {allSets.map(id => {
                                if (deletedSetsIDs.includes(id)) {
                                    return null;
                                }
                                let set = props.sets[id];
                                // If the set with the given ID has been edited, use values from editedSets
                                if (Object.keys(editedSets).includes(id.toString())) {
                                    set = editedSets[id];
                                }

                                return <WorkoutSet set={set} key={id} handleChange={handleChange} handleRemove={removeSet} />;
                            })}
                        </div>
                        : 'No sets to show'
                }
            </SetsContainer>
        </>
    );
};