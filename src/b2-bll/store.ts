import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {loginPageReducer} from "./LoginPageReducer";
import {regPageReducer} from "./RegPageReducer";
import {recoveryReducer} from "./RecoveryReducer";
import {profilePageReducer} from "./ProfilePageReducer";
import {searchReducer} from "./SearchReducer";
import { packCardsReducer } from "./PackCardsReducer";
import {cardsReducer} from './CardsReducer';
import { tableReducer } from "./TableReducer";

export type InferActionTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never;

const rootReducer = combineReducers({
    loginPage: loginPageReducer,
    regPage: regPageReducer,
    recoveryPage: recoveryReducer,
    profilePage: profilePageReducer,
    packCards: packCardsReducer,
    searchLayer: searchReducer,
    listCardsPack:cardsReducer,
    tableParams:tableReducer,
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

export type LPR = ReturnType<typeof loginPageReducer>


export const store = createStore(rootReducer, applyMiddleware(thunk))