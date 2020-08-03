import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {loginPageReducer} from "./LoginPageReducer";
import {regPageReducer} from "./RegPageReducer";
import {recoveryPageReducer} from "./RecoveryPageReducer";
import {changePasswordPageReducer} from "./ChangePasswordPageReducer";
import {profilePageReducer} from "./ProfilePageReducer";
import {cardsReducer} from "./CardsReducer";
import {searchReducer} from "./SearchReducer";

export type InferActionTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never;

const rootReducer = combineReducers({
    loginPage: loginPageReducer,
    regPage: regPageReducer,
    recoveryPage: recoveryPageReducer,
    changePasswordPage: changePasswordPageReducer,
    profilePage: profilePageReducer,
    packCards: cardsReducer,
    searchLayer: searchReducer

})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

export type LPR = ReturnType<typeof loginPageReducer>


export const store = createStore(rootReducer, applyMiddleware(thunk))