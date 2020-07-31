import {AppStateType, InferActionTypes} from "./store";
import {Dispatch} from "redux";
import {jointCardsApi} from "../b3-dal/api";
const AUTH_SUCCESS = "AUTH_SUCCESS";
const AUTH_FAILED = "AUTH_FAILED";
const IN_PROGRESS = "IN_PROGRESS"


let initialState = {
    email: null,
    name: null,
    token: null,
    tokenDeathTime: null,
    _id: null,
    isAuth: false,
    ///для сообщения пользователю
    error: "",
    inProgress: false
}

type InitialStateType = typeof initialState


export const loginPageReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {
                ...state, email: action.email, name: action.name, token: action.token,
                tokenDeathTime: action.tokenDeathTime, _id: action._id, isAuth: true, error: ""
            }

        case AUTH_FAILED:
            return {...state, error: "bad response"}
        case IN_PROGRESS:
            return {...state, inProgress: action.inProgress}
        default:
            return state
    }
}


type ActionType = InferActionTypes<typeof actions>

type DataType = {
    email: string,
    name: string,
    token: string,
    tokenDeathTime: number,
    _id: string
}

const actions = {
    AuthFailed: () => {
        return ({type: AUTH_FAILED} as const)
    },
    setAuthSuccess: (data: DataType) => ({
        type: AUTH_SUCCESS,
        email: data.email,
        name: data.name,
        token: data.token,
        tokenDeathTime: data.tokenDeathTime,
        _id: data._id
    }),
    inProgressAC: (inProgress: boolean) => {
        return (
            {type: IN_PROGRESS, inProgress}
        )
    }
}

export const LogIn = (mail: string, password: string, rememberMe: boolean) => {
    return async (dispatch: Dispatch<ActionType>, getState: () => AppStateType) => {
        debugger
        dispatch(actions.inProgressAC(true))
        try {
            let res = await jointCardsApi.logIn(mail, password, rememberMe)
            debugger
            if (res.data.success) {
                let {email, name, token, tokenDeathTime, _id} = res.data
                let objData = {email, name, token, tokenDeathTime, _id}

                dispatch(actions.setAuthSuccess(objData))
            }else {
                dispatch(actions.AuthFailed())
            }
            dispatch(actions.inProgressAC(false))
        } catch (e) {
            console.log(e)
            debugger;
            dispatch(actions.AuthFailed())
            dispatch(actions.inProgressAC(false))
        }
    }
}



