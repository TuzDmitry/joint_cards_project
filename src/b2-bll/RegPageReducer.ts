import {AppStateType, InferActionTypes} from "./store";
import {Dispatch} from "redux";
import {jointCardsApi} from "../b3-dal/api";
const SET_USER_DATA = 'SET_USER_DATA';
const IN_PROGRESS = "IN_PROGRESS";
const CHANGE_NOTIFICATION = "CHANGE_NOTIFICATION"

let initialState = {
    isRegistrated: false,
    ///для дизейблинга кнопки
    inProgress: false,
    ///для сообщения пользователю
    notification: ""
}

export type InitialStateType = typeof initialState


export const regPageReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {...state, isRegistrated: action.success}

        case CHANGE_NOTIFICATION:
            return {...state, notification: action.newText}
        case IN_PROGRESS:
            return {...state, inProgress: action.inProgress}

        default:
            return state
    }
}


type ActionType = InferActionTypes<typeof actions>

const actions = {
    setUserData: (success: boolean,) => {
        debugger
        return ({type: SET_USER_DATA, success} as const)
    },
    changeNotification: (newText: string) => {
        return (
            {type: CHANGE_NOTIFICATION, newText}
        )
    },
    inProgressAC: (inProgress: boolean) => {
        return (
            {type: IN_PROGRESS, inProgress}
        )
    }
}

//Thunk
export const sendUserData = (email: string, password: string) => async (dispatch: Dispatch<ActionType>, getState: () => AppStateType) => {
    dispatch(actions.inProgressAC(true))
    try {
        // enable preloyder
        const sendData = await jointCardsApi.setUserData(email, password)
        if (sendData.data.success) {
            dispatch(actions.changeNotification('ВЫ УСПЕШНО ЗАРЕГЕСТРИРОВАНЫ'))
            setTimeout(() => {
                dispatch(actions.setUserData(sendData.data.success))
            }, 3000)

// disable preloyder
        }
        else {
            dispatch(actions.changeNotification('ЧТО_ТО ПОШЛО НЕ ТАК'))
        }
        setTimeout(() => {
            dispatch(actions.changeNotification(''))
            dispatch(actions.setUserData(false))
        }, 3000)
// disable preloyder
        dispatch(actions.inProgressAC(false))
    }

    catch (e) {
        alert(e)
        setTimeout(() => {
            dispatch(actions.inProgressAC(false))
        }, 2000)
    }

}



