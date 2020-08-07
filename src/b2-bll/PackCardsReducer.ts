import {AppStateType, InferActionTypes} from './store';
import {Dispatch} from 'redux';
import {restoreStateLocalStorage, saveStateToLocalStorage} from '../b1-ui/common/utils/LocalStorage';
import {CardsAPI, CardsPackType, PackType} from '../b3-dal/api';
import {ThunkDispatch, ThunkAction} from 'redux-thunk';

const SET_PACK_CARDS = 'joint_cards/LoginPageReducer/SET_PACK_CARDS';
const SET_PAGINATOR_SETTINGS = 'joint_cards/LoginPageReducer/SET_PAGINATOR_SETTINGS';

let initialState = {
    cards: [],
    pageCount: 800,  //количество елементов(колод) на странице
    packsTotalCount: 20,     //общее количество колод(елементов) полученые из сервере
    currentPage: 1,         //текущая страница
}

export type InitialStateType = {
    cards: Array<PackType>,
    pageCount: number
    packsTotalCount: number
    currentPage: number
}
// export type InitialStateType = typeof initialState

export const packCardsReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case SET_PACK_CARDS:
            return {
                ...state, cards: action.usersPack
            }
        case SET_PAGINATOR_SETTINGS:
            debugger
            return {
                ...state,
                pageCount: action.pageCount,
                packsTotalCount: action.packsTotalCount,
                currentPage: action.currentPage
            }
        default:
            return state
    }
}

type ActionType = InferActionTypes<typeof actions>;
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionType>;


//Actions
const actions = {
    SetPackCards: (usersPack:Array<PackType>) => {
        return ({type: SET_PACK_CARDS, usersPack} as const)
    },
    SetPaginatorSettings: (pageCount: number, packsTotalCount: number, currentPage: number) => {

        return ({type: SET_PAGINATOR_SETTINGS, pageCount, packsTotalCount, currentPage} as const)
    }
}

//Thunks

// export const GetPackCards = (myID?: any) => {
//     return async (dispatch: Dispatch<ActionType>, getState: () => AppStateType) => {
//         //достаем токен из стораджа
//         let token = restoreStateLocalStorage('authToken', '')
//
//         try {
//             let res = await CardsAPI.getCards(token, myID)
//             ////сохраняем полученный токен в сторадж
//             saveStateToLocalStorage(res.data.token, 'authToken')
//             ////устанавливаем успешно-полученные данные
//             dispatch(actions.SetPackCards(res.data.cardPacks))
//         } catch (e) {
//             let errorText = e.response.data.error;
//             debugger
//             alert(errorText)
//         }
//     }
// }

export const GetPacksCardsWithSettings = (myID?: any) => async (dispatch: Dispatch<ActionType>, getState: () => AppStateType) => {
    let token = restoreStateLocalStorage('authToken', '')
    try {
        let obj={
            // packName:'', //null  //работает
            // min:null,
            // max:null,
            // sortPacks:{goal:'', up:false}, //goal:'grade', up:false //работает
            // page:2, //работает
            // pageCount: 10,//работает
            // user_id:myID
        }
        let res = await CardsAPI.getCardsWithSettings(token, obj)
        debugger
        ////сохраняем полученный токен в сторадж
        saveStateToLocalStorage(res.data.token, 'authToken')
        ////устанавливаем успешно-полученные данные
        dispatch(actions.SetPackCards(res.data.cardPacks));
        // dispatch(actions.SetPaginatorSettings(pageCount,  res.data.cardPacksTotalCount, page ))
    } catch (e) {
        alert(e)
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

            dispatch(GetPacksCardsWithSettings())
        } catch (e) {
            let errorText = e.response.data.error;
            debugger
            alert(errorText)
        }
    }
}




