import {InferActionTypes} from "./store";

const SET_CARDS = 'joint_cards/LoginPageReducer/SET_CARDS';


let initialState = {
    cards: [
        {},
        {},
    ]
}

export type InitialStateType = typeof initialState


export const searchReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case SET_CARDS:
            return {
                ...state
            }

        default:
            return state
    }
}

type ActionType = InferActionTypes<typeof actions>


const actions = {
    SetCards: () => {
        return ({type: SET_CARDS} as const)
    },
}