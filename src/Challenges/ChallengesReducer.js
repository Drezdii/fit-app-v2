import { SET_CHALL_DATA, CHALL_ADD_TO_CURRENT } from './ChallengesActions';

const initialState = {
    byId: {},
    challengesIDs: []
};

export const challengesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CHALL_DATA:
            return {
                byId: {
                    ...action.data.challenges
                },
                challengesIDs: action.data.challengesIDs
            };
        case CHALL_ADD_TO_CURRENT:
            console.log(action);
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.data.challengeid]: {
                        ...state.byId[action.data.challengeid],
                        current: state.byId[action.data.challengeid].current + Number(action.data.amount)
                    }
                }
            };
        default:
            return state;
    }
};