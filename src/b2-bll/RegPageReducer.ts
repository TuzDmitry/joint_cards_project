import {InferActionTypes} from "./store";

let initialState={
    email:null,
    password:null,
    firstName:null,
    lastName:null
}

type InitialStateType=typeof initialState



export const regPageReducer = (state:InitialStateType=initialState, action: any) => {
    switch (action.type) {
        case "fdsf":
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
    updateCounterValue: (value: number) => {
        return ({type: '', value: value} as const)
    }
}