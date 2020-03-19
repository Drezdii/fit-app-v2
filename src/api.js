import axios from 'axios';

const BASE_URL = 'http://localhost:64987';

export const apiLoginUser = user => {
    return axios.post(`${BASE_URL}/api/auth/login`, { ...user });
};

export const apiRegisterUser = user => {
    return axios.post(`${BASE_URL}/api/auth/register`, user);
};

export const apiGetChallengesByUserID = userid => {
    return axios.get(`${BASE_URL}/api/challenges/by-userid`, {
        params: {
            id: userid
        }
    });
};

export const apiAddChallengeEntry = data => {
    return axios.post(`${BASE_URL}/api/challenges/add-entry`, { ...data });
};

export const apiGetWorkoutsByUserID = userid => {
    return axios.get(`${BASE_URL}/api/workouts/by-userid/${userid}`);
};

export const apiAddWorkout = workout => {
    return axios.post(`${BASE_URL}/api/workouts/`, workout);
};

export const apiSaveExerciseChanges = (id, exercise) => {
    console.log(exercise);
    return axios.put(`${BASE_URL}/api/exercises/${id}`, exercise);
};

// Add Auth token to every request
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
}, err => {
    console.log(err);
});