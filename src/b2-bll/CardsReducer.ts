import {AppStateType, InferActionTypes} from './store';
import {Dispatch} from 'redux';
import {restoreStateLocalStorage, saveStateToLocalStorage} from '../b1-ui/common/utils/LocalStorage';
import {CardsAPI} from '../b3-dal/api';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';

const SET_CARDS = 'joint_cards/LoginPageReducer/SET_CARDS';


let initialState = {
    cards: [],
    cardNumber: null,
    ///
    cardAnswer: '', // не обязательно
    cardQuestion: '', // не обязательно
    // &cardsPack_id=5eb6a2f72f849402d46c6ac7
    min: null, // не обязательно
    max: null, // не обязательно
    sortCards: {
        goal: '',
        up: false
    },// не обязательно
    currentPage: 1, // не обязательно
    pageCount: 10, // не обязательно

    ////
}

export type InitialStateType = {
    cards: Array<CardType>
    cardNumber: number | null
    ///
    cardAnswer: string
    cardQuestion: string
    min: number | null
    max: number | null
    sortCards: {
        goal: string,
        up: boolean
    }
    currentPage: number
    pageCount: number
}

// export type InitialStateType = typeof initialState


export const cardsReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case SET_CARDS:
            return {
                ...state,
                cards: action.cards
            }

        default:
            return state
    }
}

type ActionType = InferActionTypes<typeof actions>;
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionType>;

export type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    rating: number
    shots: number
    type: string
    created: string
    updated: string
    __v: number
    _id: string
}


const actions = {
    SetCards: (cards: Array<CardType>) => {
        return ({type: SET_CARDS, cards} as const)
    },
}

export const GetCards = (cardsPack_id: string) => async (dispatch: Dispatch<ActionType>, getState: () => AppStateType) => {

    let token = restoreStateLocalStorage('authToken', '')

    // cards: [],
    //     cardNumber: '',
    //     ///
    //     cardAnswer:'', // не обязательно
    //     cardQuestion:'', // не обязательно
    //                      // &cardsPack_id=5eb6a2f72f849402d46c6ac7
    //     min:null, // не обязательно
    //     max:null, // не обязательно
    //     sortCards:{
    //     goal:'',
    //         up:false},// не обязательно
    // currentPage:1, // не обязательно
    //     pageCount: 10, // не обязательно


    try {
        let obj = {
            cardAnswer: getState().listCardsPack.cardAnswer,
            cardQuestion: getState().listCardsPack.cardQuestion,
            cardsPack_id,
            min: getState().listCardsPack.min, // не обязательно
            max: getState().listCardsPack.max, // не обязательно
            sortCards: getState().listCardsPack.sortCards,// не обязательно
            page: getState().listCardsPack.currentPage, // не обязательно
            pageCount: getState().listCardsPack.pageCount, // не обязательно
        }
        // let res = await CardsAPI.getCards(token, obj)
        let res = await CardsAPI.getCards(token, cardsPack_id)
        debugger
        ////сохраняем полученный токен в сторадж
        saveStateToLocalStorage(res.data.token, 'authToken')
        ////устанавливаем успешно-полученные данные
        dispatch(actions.SetCards(res.data.cards));
        // dispatch(actions.SetPackCardsTotalCount(res.data.cardPacksTotalCount));
    } catch (e) {
        let errorText = e.response.data.error;
        alert(errorText)
    }
}


export const CreateCard = (formData: any,reset:any): ThunkType => async (dispatch: ThunkDispatch<AppStateType, unknown, ActionType>, getState: () => AppStateType) => {
    let token = restoreStateLocalStorage('authToken', '')
debugger
    try {
        let res = await CardsAPI.createCards(token, formData)
        saveStateToLocalStorage(res.data.token, 'authToken')
        dispatch(GetCards(formData.cardsPack_id))
        reset()
debugger
    } catch (e) {

    }




    // dispatch(toggleIsPending(true))
    // postForm(formData)
    //     .then((res) => {
    //             dispatch(toggleIsPending(false))
    //
    //             if (res.status===200) {
    //                 dispatch(reset('feedback'))
    //                 alert(res.data)
    //             } else {
    //                 alert(res)
    //             }
    //         }
    //     )

}