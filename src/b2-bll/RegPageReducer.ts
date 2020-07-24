import {InferActionTypes} from "./store";

let initialState={
    isRegistrated: false
}

type InitialStateType=typeof initialState



export const regPageReducer = (state:InitialStateType=initialState, action: any) => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return {...state}
        default:
            return state
    }
}


type ActionType =  InferActionTypes<typeof actions>

const actions = {
    setCounterValue: (value: number) => {
        return ( {type: '', value} as const)

    },
    setUserData: (email: string, password: string) => {
        return ({type: 'SET_USER_DATA', email, password} as const)
    }
}