import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {loginPageReducer} from "./LoginPageReducer";
import {regPageReducer} from "./RegPageReducer";
import {recoveryPageReducer} from "./RecoveryPageReducer";
import {changePasswordPageReducer} from "./ChangePasswordPageReducer";
import {profilePageReducer} from "./ProfilePageReducer";

export type InferActionTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never;

const rootReducer = combineReducers({
    loginPage: loginPageReducer,
    regPage: regPageReducer,
    recoveryPage: recoveryPageReducer,
    changePasswordPage: changePasswordPageReducer,
    profilePage: profilePageReducer

})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>


export const store = createStore(rootReducer, applyMiddleware(thunk))