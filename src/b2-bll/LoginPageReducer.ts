import {AppStateType, InferActionTypes} from './store';
import {Dispatch} from 'redux';
import {jointCardsApi} from '../b3-dal/api';
import {restoreStateLocalStorage, saveStateToLocalStorage} from '../b1-ui/common/utils/LocalStorage';

const AUTH_SUCCESS = 'joint_cards/LoginPageReducer/AUTH_SUCCESS';
const AUTH_FAILED = 'joint_cards/LoginPageReducer/AUTH_FAILED';
const IN_PROGRESS = 'joint_cards/LoginPageReducer/IN_PROGRESS'


let initialState = {
    email: '',
    name: '',
    publicCardPacksCount: 0,
    token: '',

    tokenDeathTime: 10000000000,
    _id: '',
    isAuth: false,
    ///для сообщения пользователю
    error: '',
    inProgress: false
}

export type InitialStateType = typeof initialState


export const loginPageReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {
                ...state, email: action.email, name: action.name, token: action.token,
                tokenDeathTime: action.tokenDeathTime, _id: action._id, isAuth: true, error: ''
            }

        case AUTH_FAILED:
            return {...state, error: action.error}
        case IN_PROGRESS:
            return {...state, inProgress: action.inProgress}
        default:
            return state
    }
}


type ActionType = InferActionTypes<typeof actions>

type DataType = {
    email: string
    name: string
    publicCardPacksCount: number
    token: string
    tokenDeathTime: number
    _id: string
}

const actions = {
    AuthFailed: (error: string) => {
        return ({type: AUTH_FAILED, error} as const)
    },
    setAuthSuccess: (data: DataType) => {
        return ({
            type: AUTH_SUCCESS,
            email: data.email,
            name: data.name,
            publicCardPacksCount: data.publicCardPacksCount,
            token: data.token,
            tokenDeathTime: data.tokenDeathTime,
            _id: data._id
        } as const)
    },
    inProgressAC: (inProgress: boolean) => {
        return (
            {type: IN_PROGRESS, inProgress} as const
        )
    }
}


export const LogIn = (mail: string, password: string, rememberMe: boolean) => {
    return async (dispatch: Dispatch<ActionType>, getState: () => AppStateType) => {
        dispatch(actions.inProgressAC(true))
        try {
            let res = await jointCardsApi.logIn(mail, password, rememberMe)
////сохраняем полученный токен в сторадж
            saveStateToLocalStorage(res.data.token, 'authToken')


            dispatch(actions.setAuthSuccess(res.data))
            dispatch(actions.inProgressAC(false))
        } catch (e) {
            let errorText = e.response.data.error;
            dispatch(actions.AuthFailed(errorText))
            dispatch(actions.inProgressAC(false))
            setTimeout(() => {
                dispatch(actions.AuthFailed(''))
            }, 2000)
        }
    }
}


export const Autorization = () => {
    return async (dispatch: Dispatch<ActionType>, getState: () => AppStateType) => {
        //достаем токен из стораджа
        let token = restoreStateLocalStorage('authToken', '')

        try {
            let res = await jointCardsApi.checkAuth(token)
            ////сохраняем полученный токен в сторадж
            saveStateToLocalStorage(res.data.token, 'authToken')
            ////устанавливаем успешно-полученные данные
            dispatch(actions.setAuthSuccess(res.data))

        } catch (e) {
            alert(e)
        }
    }
}


