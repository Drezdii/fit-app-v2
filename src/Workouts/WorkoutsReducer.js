import { ADD_WORKOUTS, ADD_NEW_WORKOUT, ADD_EXERCISES, ADD_SETS, ADD_EXERCISES_INFO, UPDATE_EXERCISE, DELETE_EXERCISE } from './WorkoutsActions';

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

        case DELETE_EXERCISE:
            const exercisesCopy = { ...state.exercises };
            delete exercisesCopy[action.data.id];
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.data.workoutID]: {
                        ...state.byId[action.data.workoutID],
                        exercises: state.byId[action.data.workoutID].exercises.filter(id => id !== action.data.exerciseID)
                    }
                }
            };

        case UPDATE_EXERCISE:
            // Cast all IDs to ints
            // Default to an empty array because removing sets will pass empty sets array to this reducer
            const sets = action.data.sets !== undefined ? Object.keys(action.data.sets).map(id => Number(id)) : [];
            // All sets with deleted sets filtered out
            const filteredSets = [...state.exercises[action.data.id].sets, ...sets].filter(id => !action.data.deletedSetsIDs.includes(id));
            return {
                ...state,
                sets: {
                    ...state.sets,
                    ...action.data.sets
                },
                exercises: {
                    ...state.exercises,
                    // Add SetsIDs to the exercise with given ID
                    [action.data.id]: {
                        ...state.exercises[action.data.id],
                        // Use Set to only add unique values (the same setID kept getting added when updating reps/weight)
                        sets: [...new Set(filteredSets)]
                    }
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