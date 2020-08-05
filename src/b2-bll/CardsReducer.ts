import {InferActionTypes} from "./store";
const SET_CARDS = 'joint_cards/LoginPageReducer/SET_CARDS';


let initialState = {
    cards: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
}

export type InitialStateType = typeof initialState


export const cardsReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
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
