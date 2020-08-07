import {AppStateType, InferActionTypes} from './store';
import {Dispatch} from 'redux';
import {restoreStateLocalStorage, saveStateToLocalStorage} from '../b1-ui/common/utils/LocalStorage';
import {CardsAPI, CardsPackType, PackType, QueryGetParamsType} from '../b3-dal/api';
import {ThunkDispatch, ThunkAction} from 'redux-thunk';

const SET_PACK_CARDS = 'joint_cards/LoginPageReducer/SET_PACK_CARDS';
const SET_PAGINATOR_SETTINGS = 'joint_cards/LoginPageReducer/SET_PAGINATOR_SETTINGS';
const SET_CURRENT_PAGE = 'joint_cards/PackPageReducer/SET_CURRENT_PAGE';
const SET_CURRENT_PAGE_COUNT = 'joint_cards/PackPageReducer/SET_CURRENT_PAGE_COUNT'

let initialState = {
    cards: [],
    pageCount: 10,  //количество елементов(колод) на странице
    packsTotalCount: 50,     //общее количество колод(елементов) полученые из сервере
    currentPage: 1,         //текущая страница
    packName:'', //null  //работает
    min:null,
    max:null,
    sortPacks:{
        goal:'',
        up:false}, //goal:'grade', up:false //работает
    user_id: ''
}

export type InitialStateType = {
    cards: Array<PackType>,
    pageCount: number
    packsTotalCount: number
    currentPage: number
    packName: string, //null  //работает
    min:number | null,
    max: number | null,
    sortPacks:{
        goal:string,
        up: boolean}, //goal:'grade', up:false //работает
    user_id: string
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
        case SET_CURRENT_PAGE: {
            return  {
                ...state, currentPage: action.page
            }
        }
        case SET_CURRENT_PAGE_COUNT: {
            return  {
                ...state, pageCount: action.pageCount
            }
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
    },
    SetCurrentPage: (page: number) => {
        return ({type: SET_CURRENT_PAGE, page} as const)
    },
    SetCurrentPageCount: (pageCount: number) => {
        return ({type: SET_CURRENT_PAGE_COUNT, pageCount} as const)
    }
}

//Thunks

export const GetPacksCards = () => async (dispatch: Dispatch<ActionType>, getState: () => AppStateType) => {
    let token = restoreStateLocalStorage('authToken', '')

    try {
        let obj={
            packName:getState().packCards.packName,
            min: getState().packCards.min,
            max: getState().packCards.max,
            sortPacks: getState().packCards.sortPacks, //goal:'grade', up:false //работает
            page: getState().packCards.currentPage, //работает
            pageCount: getState().packCards.pageCount,//работает
            user_id: getState().packCards.user_id
        }
        let res = await CardsAPI.getCardsWithSettings(token, obj)
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

            dispatch(GetPacksCards())
        } catch (e) {
            let errorText = e.response.data.error;
            debugger
            alert(errorText)
        }
    }
}

export const GetCurrentPage= ( page: number): ThunkType => async (dispatch: ThunkDispatch<AppStateType, unknown, ActionType>, getState: () => AppStateType) => {
    let token = restoreStateLocalStorage('authToken', '')
    dispatch(actions.SetCurrentPage(page))
    ///диспачим полученную страницу в бизнес и запускаем базовую санку
    dispatch(GetPacksCards())
}
export const GetPackCardsAccordingSelect= (pageCount: number): ThunkType => async (dispatch: ThunkDispatch<AppStateType, unknown, ActionType>, getState: () => AppStateType) => {
    let token = restoreStateLocalStorage('authToken', '')
    dispatch(actions. SetCurrentPageCount(pageCount))
    ///диспачим полученную страницу в бизнес и запускаем базовую санку
    dispatch(GetPacksCards())
}

//thunk 1 -простой запрос с базовыми параметрмаи
//2 ) изменение базовых параметров пагинатора в бизнесе + thunk 1
//3) изменение базовых параметров селектора в бизнесе + thunk 1
//4) изменение базовых параметров поиска в бизнесе + thunk 1
//5) изменение базовых параметров cортировки по (rating/grade/....) в бизнесе + thunk 1



