import {InferActionTypes} from "./store";
import {Dispatch} from "redux";
import {jointCardsApi} from "../b3-dal/api";

// const AUTH_SUCCESS="JOINT_CARDS_PROJECT/LogiPageReducer/AUTH_SUCCESS"

let initialState = {
    email: null,
    name: null,
    token: null,
    tokenDeathTime: null,
    _id: null,
    isAuth: false,
    error:""
}

type InitialStateType = typeof initialState


export const loginPageReducer = (state: InitialStateType = initialState, action: any) => {
    switch (action.type) {
        case "AUTH_SUCCESS":
            return {
                ...state, email: action.email, name: action.name, token: action.token,
                tokenDeathTime: action.tokenDeathTime, _id: action._id, isAuth: true,error:""
            }

        case "AUTH_FAILED":
            return {...state,error:"not correct email/password"}
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
        return ({type: "AUTH_FAILED"} as const)
    },
    setAuthSuccess: (data: DataType) => ({
        type: "AUTH_SUCCESS",
        email: data.email,
        name: data.name,
        token: data.token,
        tokenDeathTime: data.tokenDeathTime,
        _id: data._id
    })
}


// export const Autorization = () => {
//     return async (dispatch: Dispatch<ActionType>) => {
//         debugger
//         let res = await API.checkAuth()
//         try {
//             debugger
//             if (res.resultCode === 0) {
//                 dispatch(setAuthSuccess(res.data))
//             } else {
//                 dispatch(setAuthFail())
//             }
//         } catch (e) {
//             debugger
//             console.log(e)
//         }
//         // dispatch(setAuthSuccess({email: "fdsfsdfsd", login: "fdsfs", userId: 21312}))
//     }
// }


export const LogIn = (email: string, password: string, rememberMe: boolean) => {
    return async (dispatch: Dispatch<ActionType>) => {

        try {
            let res = await jointCardsApi.logIn(email, password, rememberMe)
            debugger
            console.log(res.data)
            // let objData={res.email, res.name, res.token, res.tokenDeathTime, res._id}
            let objData = {
                email: "test@emali.nya",
                name: "test@emali.nya",
                token: "3579de60 - 32da-11ea-b98b - 2dd305a3a42a",
                tokenDeathTime: 1578658736966,
                _id: "5e15dd6eea213400048fca8b"
            };
            dispatch(actions.setAuthSuccess(objData))
        } catch (e) {
            console.log(e)
            debugger
            dispatch(actions.AuthFailed())
        }
    }
}

//
// let a = {
//     email: ""test@emali.nya"",
//     name: ""test@emali.nya"",
//     isAdmin: false,
//     rememberMe: false,
//     token: ""3579de60 - 32da-11ea-b98b - 2dd305a3a42a"",
//     tokenDeathTime: 1578658736966,
//     __v: 0,
//     _id: ""5e15dd6eea213400048fca8b"",
//     success: true
// }