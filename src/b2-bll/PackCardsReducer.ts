import {AppStateType, InferActionTypes} from "./store";
import {Dispatch} from "redux";
import {restoreStateLocalStorage, saveStateToLocalStorage} from "../b1-ui/common/utils/LocalStorage";
import {CardsAPI, PackType} from '../b3-dal/api';

const SET_PACK_CARDS = 'joint_cards/LoginPageReducer/SET_PACK_CARDS';

let initialState = {
    cards: []
}

export type InitialStateType = {
    cards: Array<PackType>
}
// export type InitialStateType = typeof initialState

export const packCardsReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case SET_PACK_CARDS:
            return {
                ...state, cards: action.usersPack
            }
        default:
            return state
    }
}

type ActionType = InferActionTypes<typeof actions>

const actions = {
    SetPackCards: (usersPack:Array<PackType>) => {
        return ({type: SET_PACK_CARDS, usersPack} as const)
    },
}

//Thunk
export const GetPackCards = () => {
    return async (dispatch: Dispatch<ActionType>, getState: () => AppStateType) => {
        //достаем токен из стораджа
        let token = restoreStateLocalStorage('authToken', '')

        try {
            let res = await CardsAPI.getCards(token)
            ////сохраняем полученный токен в сторадж
            saveStateToLocalStorage(res.data.token, 'authToken')
            ////устанавливаем успешно-полученные данные
            dispatch(actions.SetPackCards(res.data.cardPacks))
        } catch (e) {
            alert(e)
        }
    }
}



