import {AppStateType, InferActionTypes} from "./store";
import {Dispatch} from "redux";
import {jointCardsApi} from "../b3-dal/api";

let initialState = {
    isRegistrated: false,
    ///для дизейблинга кнопки
    inProgress: false,
    ///для сообщения пользователю
    notification: ""
}

type InitialStateType = typeof initialState


export const regPageReducer = (state: InitialStateType = initialState, action: any) => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return {...state, isRegistrated: action.success}

        case "IN_PROGRESS":
            return {...state, inProgress: action.inProgress}

        case "CHANGE_NOTIFICATION":
            return {...state, notification: action.newText}

        default:
            return state
    }
}


type ActionType = InferActionTypes<typeof actions>

const actions = {
    setUserData: (success: boolean,) => {
        debugger
        return ({type: 'SET_USER_DATA', success} as const)
    },
    changeNotification: (newText: string) => {
        return (
            {type: "CHANGE_NOTIFICATION", newText}
        )
    }
}

//Thunk
export const sendUserData = (email: string, password: string) => async (dispatch: Dispatch<ActionType>, getState: () => AppStateType) => {
    try {
        const sendData = await jointCardsApi.setUserData(email, password)
        debugger
        if (sendData.data.success) {
            dispatch(actions.changeNotification('ВЫ УСПЕШНО ЗАРЕГЕСТРИРОВАНЫ'))
            setTimeout(() => {
                dispatch(actions.setUserData(sendData.data.success))
            }, 3000)

        } else {
            dispatch(actions.changeNotification('ЧТО_ТО ПОШЛО НЕ ТАК'))
        }
        setTimeout(() => {
            dispatch(actions.changeNotification(''))
            dispatch(actions.setUserData(false))
        }, 3000)

    } catch (e) {
        debugger
        alert(e)
    }
}

