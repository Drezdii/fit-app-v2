import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from '../Auth/AuthReducer';

const reducers = combineReducers({ user: authReducer});

// Clean up the user slice of the state on logout
const rootReducer = (state, action) => {
    return reducers(state, action);
};

export default createStore(rootReducer, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));