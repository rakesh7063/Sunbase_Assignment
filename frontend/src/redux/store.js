import { applyMiddleware, combineReducers, compose, legacy_createStore } from 'redux'
import thunk from 'redux-thunk'

import { reducer as customersReducer } from './customers/customers.reducer';
import {reducer as authReducer} from './auth/auth.reducer'

const rootReducer = combineReducers({
     customersManager: customersReducer,
     authManager: authReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = legacy_createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));