import { SET_USER } from './AuthActions';

const initialState = {
    id: null,
    login: null,
    exp: 0
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                id: Number(action.user.id),
                login: action.user.login,
                exp: action.user.exp
            };
        default:
            return state;
    }
};