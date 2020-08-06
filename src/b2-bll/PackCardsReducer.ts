import {AppStateType, InferActionTypes} from './store';
import {Dispatch} from 'redux';
import {restoreStateLocalStorage, saveStateToLocalStorage} from '../b1-ui/common/utils/LocalStorage';
import {CardsAPI, CardsPackType, PackType} from '../b3-dal/api';
import {ThunkDispatch, ThunkAction} from 'redux-thunk';

const SET_PACK_CARDS = 'joint_cards/LoginPageReducer/SET_PACK_CARDS';
// const ADD_PACK_CARDS = 'joint_cards/LoginPageReducer/ADD_PACK_CARDS';

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

type ActionType = InferActionTypes<typeof actions>;
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionType>;


//Actions
const actions = {
    SetPackCards: (usersPack: Array<PackType>) => {
        return ({type: SET_PACK_CARDS, usersPack} as const)
    },

}

//Thunks
export const GetPackCards = (myID?: any) => {
    return async (dispatch: Dispatch<ActionType>, getState: () => AppStateType) => {
        //достаем токен из стораджа
        let token = restoreStateLocalStorage('authToken', '')

        try {
            let res = await CardsAPI.getCards(token, myID)
            ////сохраняем полученный токен в сторадж
            saveStateToLocalStorage(res.data.token, 'authToken')
            ////устанавливаем успешно-полученные данные
            dispatch(actions.SetPackCards(res.data.cardPacks))
        } catch (e) {
            let errorText = e.response.data.error;
            debugger
            alert(errorText)
        }
    }
}

export const AddPackCards = (requestData: CardsPackType): ThunkType => {
    return async (dispatch: ThunkDispatch<AppStateType, unknown, ActionType>, getState: () => AppStateType) => {
        //достаем токен из стораджа
        let token = restoreStateLocalStorage('authToken', '')

        try {
            let res = await CardsAPI.addPackWithCards(requestData, token)
            ////сохраняем полученный токен в сторадж
            saveStateToLocalStorage(res.data.token, 'authToken')
            ////устанавливаем успешно-полученные данные

            dispatch(GetPackCards())
        } catch (e) {
            let errorText = e.response.data.error;
            debugger
            alert(errorText)
        }
    }
}




