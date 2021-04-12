import {AppStateType, InferActionTypes} from './store';
import {Dispatch} from 'redux';
import {CardsAPI, jointCardsApi, LoginType} from '../b3-dal/api';
import {restoreStateLocalStorage, saveStateToLocalStorage} from '../b1-ui/common/utils/LocalStorage';

const AUTH_SUCCESS = 'joint_cards/LoginPageReducer/AUTH_SUCCESS';
const AUTH_FAILED = 'joint_cards/LoginPageReducer/AUTH_FAILED';
const IN_PROGRESS = 'joint_cards/LoginPageReducer/IN_PROGRESS';
const LOG_OUT = 'joint_cards/LoginPageReducer/LOG_OUT';
const SET_PROFILE_USER_NAME = 'joint_cards/LoginPageReducer/SET_PROFILE_USER_NAME';
const SET_PROFILE_USER_AVA = 'joint_cards/LoginPageReducer/SET_PROFILE_USER_AVA';

let initialState = {
    email: '',
    name: '',
    publicCardPacksCount: 0,
    token: '',
    avatar: '',
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
            debugger
            return {
                ...state, email: action.email, name: action.name, avatar: action.avatar, token: action.token,
                tokenDeathTime: action.tokenDeathTime, _id: action._id, isAuth: true, error: ''
            }

        case AUTH_FAILED:
            return {...state, error: action.error}
        case IN_PROGRESS:
            return {...state, inProgress: action.inProgress}
        case LOG_OUT:
            return {...state, isAuth: false}
        case SET_PROFILE_USER_NAME:
            debugger
            return {...state, name: action.name}
        case SET_PROFILE_USER_AVA:
            debugger
            return {...state, avatar: action.avatar}
        default:
            return state
    }
}


type ActionType = InferActionTypes<typeof actions>

const actions = {
    AuthFailed: (error: string) => {
        return ({type: AUTH_FAILED, error} as const)
    },
    setAuthSuccess: (data: LoginType) => {
        return ({
            type: AUTH_SUCCESS,
            email: data.email,
            name: data.name,
            avatar: data.avatar,
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
    },
    LogOut: () => {
        return (
            {type: LOG_OUT} as const
        )
    },
    setProfileUserName: (name: string) => ({type: SET_PROFILE_USER_NAME, name} as const),
    setProfileUserAva: (avatar: any) => ({type: SET_PROFILE_USER_AVA, avatar} as const)
}


export const LogIn = (mail: string, password: string, rememberMe: boolean) => {
    return async (dispatch: Dispatch<ActionType>, getState: () => AppStateType) => {
        dispatch(actions.inProgressAC(true))
        try {
            let res = await jointCardsApi.logIn(mail, password, rememberMe)
            // debugger
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

export const LogOut = () => {
    return (dispatch: Dispatch<ActionType>) => {
        localStorage.removeItem('authToken')
        dispatch(actions.LogOut())
    }
}

export const UpdateUserName = (name: string) => {
    return async (dispatch: Dispatch<ActionType>) => {
        let token = restoreStateLocalStorage('authToken', '')
        try {
            let res = await jointCardsApi.changeUserProfileData(token, {name})
            debugger
            saveStateToLocalStorage(res.data.token, 'authToken')
            dispatch(actions.setProfileUserName(name))
        } catch (e) {

        }
    }
}

// export const UpdateUserAva = (avatar: File) => {
//     return async (dispatch: Dispatch<ActionType>) => {
//         let bbb=window.URL.createObjectURL(avatar)
//         console.log(bbb)
//         debugger
//         let token = restoreStateLocalStorage('authToken', '')
//         debugger
//         try {
//             let res = await jointCardsApi.changeUserProfileData(token, {avatar:bbb})
//             debugger
//             saveStateToLocalStorage(res.data.token, 'authToken')
//             dispatch(actions.setProfileUserAva(res.data.updatedUser.avatar))
//         } catch (e) {
//
//         }
//     }
// }

export const UpdateUserAva = (avatar: any) => {
    return async (dispatch: Dispatch<ActionType>) => {

        // let bbb=window.URL.createObjectURL(avatar)
        // console.log(bbb)
        debugger
        let token = restoreStateLocalStorage('authToken', '')
        debugger
        try {
            let res = await jointCardsApi.changeUserProfileData(token, {avatar:avatar})
            debugger
            saveStateToLocalStorage(res.data.token, 'authToken')
            dispatch(actions.setProfileUserAva(res.data.updatedUser.avatar))
        } catch (e) {

        }
    }
}

export const Autorization = () => {
    return async (dispatch: Dispatch<ActionType>, getState: () => AppStateType) => {
        //достаем токен из стораджа
        let token = restoreStateLocalStorage('authToken', '')

        try {
            let res = await jointCardsApi.checkAuth(token)
            debugger
            ////сохраняем полученный токен в сторадж
            saveStateToLocalStorage(res.data.token, 'authToken')
            ////устанавливаем успешно-полученные данные
            dispatch(actions.setAuthSuccess(res.data))

        } catch (e) {
            let errorText = e.response.data.error;
            // debugger
            alert(errorText)
        }
    }
}


