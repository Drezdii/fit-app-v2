import { ADD_WORKOUTS, ADD_NEW_WORKOUT, ADD_EXERCISES, ADD_SETS, ADD_EXERCISES_INFO, UPDATE_EXERCISE } from './WorkoutsActions';

const initialState = {
    byId: {},
    exercises: {},
    exerciseInfo: {},
    sets: {},
    workoutsIDs: []
};

export const workoutsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_WORKOUTS:
            return {
                ...state,
                byId: {
                    ...action.data.workouts
                },
                workoutsIDs: [...state.workoutsIDs, ...action.data.workoutsIDs]
            };

        case ADD_NEW_WORKOUT:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.data.id]: {
                        ...action.data
                    }
                },
                workoutsIDs: [action.data.id, ...state.workoutsIDs]
            };

        case ADD_EXERCISES:
            return {
                ...state,
                exercises: {
                    ...state.exercises,
                    ...action.data
                }
            };

        case UPDATE_EXERCISE:
            return {
                ...state,
                sets: {
                    ...state.sets,
                    ...action.data.sets
                }
            };
        case ADD_SETS:
            return {
                ...state,
                sets: {
                    ...state.sets,
                    ...action.data
                }
            };
        case ADD_EXERCISES_INFO:
            return {
                ...state,
                exerciseInfo: {
                    ...state.exerciseInfo,
                    ...action.data
                }
            };
        default:
            return state;
    }
};