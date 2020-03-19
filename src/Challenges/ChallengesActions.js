import { apiGetChallengesByUserID, apiAddChallengeEntry } from '../api';

export const SET_CHALL_DATA = 'SET_CHALL_DATA';
export const CHALL_ADD_TO_CURRENT = 'CHALL_ADD_TO_CURRENT';

export const getChallengesByUserID = id => {
    return async dispatch => {
        try {
            if (id === null) {
                return;
            }

            const response = await apiGetChallengesByUserID(id);
            
            const challenges = {};
            const challengesIDs = [];

            // Normalize the data to use ID as the key
            response.data.challenges.forEach(el => {
                challenges[el.challenge.id] = {
                    ...el.challenge,
                    current: el.current
                };
                challengesIDs.push(el.challenge.id);
            });

            dispatch(setChallengesData({ challenges, challengesIDs }));
        }
        catch (e) {

        }
    };
};

export const setChallengesData = data => {
    return {
        type: SET_CHALL_DATA,
        data
    };
};

export const addToCurrent = data => {
    return async dispatch => {
        try {
            const response = await apiAddChallengeEntry(data);
            dispatch({ type: CHALL_ADD_TO_CURRENT, data });
        }
        catch (e) {

        }
    };
};