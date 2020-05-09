import React, { useState } from 'react';
import { ListItem, ListItemIcon, Checkbox, TextField, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

// Rename from Set to not collide with build-in Set class
export const WorkoutSet = ({ set, handleChange, handleRemove, selected, selectItem }) => {
    const handleReps = input => {
        const newSet = {
            ...set,
            reps: Number(input.target.value)
        };

        handleChange(newSet);
    };

    const handleWeight = input => {
        const newSet = {
            ...set,
            weight: Number(input.target.value)
        };

        handleChange(newSet);
    };

    const handleCompletion = input => {
        const newSet = {
            ...set,
            completed: Boolean(input.target.checked)
        };

        handleChange(newSet);;
    };
    return (
        set != null ?
            <ListItem selected={selected} onClick={() => selectItem(set.id)}>
                <ListItemIcon>
                    <Checkbox
                        checked={set.completed}
                        edge="end"
                        disableRipple
                        onChange={handleCompletion}
                    />
                </ListItemIcon>
                {<TextField type="number" variant="outlined" size="small" value={set.reps} onChange={handleReps} />}
                x
                    {<TextField type="number" variant="outlined" size="small" value={set.weight} onChange={handleWeight} inputProps={{ min: 0, step: 2.5 }} />}

                <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={() => handleRemove(set.id)}>
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            : null

    );
};