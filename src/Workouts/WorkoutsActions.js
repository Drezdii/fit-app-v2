import { apiGetWorkoutsByUserID, apiAddWorkout, apiSaveExerciseChanges } from '../api';
import { schema, normalize } from 'normalizr';

export const ADD_WORKOUTS = 'ADD_WORKOUTS';
export const ADD_EXERCISES = 'ADD_EXERCISES';
export const ADD_SETS = 'ADD_SETS';
export const ADD_EXERCISES_INFO = 'ADD_EXERCISES_INFO';
export const ADD_NEW_WORKOUT = 'ADD_NEW_WORKOUT';
export const UPDATE_EXERCISE = 'UPDATE_EXERCISE';

export const getWorkoutsByUserID = userID => {
    return async dispatch => {

        if (userID == null) {
            return;
        }

        try {
            var response = await apiGetWorkoutsByUserID(userID);
        }
        catch (e) {
            console.log('Cannot connect to a server');
            return;
        }
        const normalized = _normalizeResponse(response.data.workouts);

        // Prepare an object for the store
        const workouts = {
            workouts: normalized.entities.workouts,
            workoutsIDs: normalized.result
        };

        dispatch(addWorkouts(workouts));
        dispatch(addExercises(normalized.entities.exercises));
        dispatch(addSets(normalized.entities.sets));
        dispatch(addExercisesInfo(normalized.entities.exerciseInfo));
    };
};

export const saveExerciseChanges = (exercise) => {
    return async dispatch => {
        try {
            const response = await apiSaveExerciseChanges(exercise.id, exercise);
            const sets = new schema.Entity('sets', {
                sets: ['sets'],
            });
            const normalizedSets = normalize(response.data.sets, [sets]);
            const obj = {
                ...response.data,
                sets: normalizedSets.entities.sets
            };
            dispatch(_updateExercise(obj));

        }
        catch (e) {
            console.log(e);
        }
    };
};

const _updateExercise = exercise => {
    return {
        type: UPDATE_EXERCISE,
        data: exercise
    };
};

export const addNewWorkout = workout => {
    return async dispatch => {
        try {
            var response = await apiAddWorkout(workout);
        }
        catch (e) {
            console.log('Cannot connect to a server');
            return;
        }
        dispatch(_addWorkout(response.data.workout));
    };
};

export const addWorkouts = workouts => {
    return {
        type: ADD_WORKOUTS,
        data: workouts
    };
};

const _addWorkout = workout => {
    return {
        type: ADD_NEW_WORKOUT,
        data: workout
    };
};

export const addExercises = exercises => {
    return {
        type: ADD_EXERCISES,
        data: exercises
    };
};

export const addSets = sets => {
    return {
        type: ADD_SETS,
        data: sets
    };
};

export const addExercisesInfo = exInfo => {
    return {
        type: ADD_EXERCISES_INFO,
        data: exInfo
    };
};

const _normalizeResponse = response => {

    const set = new schema.Entity('sets');
    const exInfo = new schema.Entity('exerciseInfo');

    const exercise = new schema.Entity('exercises', {
        sets: [set],
        exerciseInfo: exInfo
    });

    const workouts = new schema.Entity('workouts', {
        exercises: [exercise]
    });

    return normalize(response, [workouts]);
};