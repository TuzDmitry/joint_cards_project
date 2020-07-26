import {AppStateType, InferActionTypes} from "./store";
import {Dispatch} from "redux";
import {jointCardsApi} from "../b3-dal/api";

let initialState={
    isRegistrated: false,

}

type InitialStateType=typeof initialState



export const regPageReducer = (state:InitialStateType=initialState, action: any) => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return {...state, isRegistrated: action.success}
        default:
            return state
    }
}


type ActionType =  InferActionTypes<typeof actions>

const actions = {
    setCounterValue: (value: number) => {
        return ( {type: '', value} as const)

    },
    setUserData: (success: boolean, ) => {
        debugger
        return ({type: 'SET_USER_DATA', success} as const)
    }
}

//Thunk
export const sendUserData = (email: string, password: string) => async (dispatch: Dispatch<ActionType>, getState: () => AppStateType) => {
    try {
        debugger
        const sendData = await jointCardsApi.setUserData(email, password)
        // dispatch(actions.setUserData(sendData.data.success))
    }
    catch (e) {
       alert(e)
    }


}