import authReducer from "./Auth/Reducer";
import {thunk}from "redux-thunk";
import {combineReducers, legacy_createStore, applyMiddleware} from "redux";
const rootReducer=combineReducers({
 auth:authReducer
});
export const store=legacy_createStore(rootReducer,applyMiddleware(thunk))