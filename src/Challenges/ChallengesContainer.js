import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getChallengesByUserID } from './ChallengesActions';
import { Challenge } from './Challenge';

export const ChallengesContainer = () => {
    const dispatch = useDispatch();
    const userID = useSelector(state => state.user.id);

    useEffect(() => {
        dispatch(getChallengesByUserID(userID));
    }, [userID]); // eslint-disable-line react-hooks/exhaustive-deps

    const challengesIDs = useSelector(state => state.challenges.challengesIDs);

    return (<div>{
        challengesIDs.map((id => {
            return <Challenge id={id} key={id} userID={userID} />;
        }))
    }</div>);
};