import React, { useState, useEffect } from 'react';
import { setUser } from '../Auth/AuthActions';
import { useDispatch, useSelector } from 'react-redux';
import { isTokenValid, getPayload } from '../core/TokenValidator';
import { TopBar } from './TopBar';
import { WorkoutsList } from '../Workouts/WorkoutsList';

export const MainContainer = () => {
    const dispatch = useDispatch();
    const login = useSelector(state => state.user.login);

    // Recreate the user from the saved token
    useEffect(() => {
        if (!login) {
            const token = localStorage.getItem('token');
            if (isTokenValid(token)) {
                const user = getPayload(token);
                dispatch(setUser(user));
            }
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <TopBar />
            <WorkoutsList />
        </div>
    );
};