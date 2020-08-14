import {AppStateType, InferActionTypes} from './store';
import {Dispatch} from 'redux';
import {restoreStateLocalStorage, saveStateToLocalStorage} from '../b1-ui/common/utils/LocalStorage';
import {CardsAPI, PackType} from '../b3-dal/api';

const SET_TABLE_PARAMS = 'joint_cards/TableReducer/SET_TABLE_PARAMS';
const CLEAR_TABLE_PARAMS = 'joint_cards/TableReducer/CLEAR_TABLE_PARAMS';
const SET_PARAM_NAME = 'joint_cards/TableReducer/SET_PARAM_NAME';
const SET_PARAM_PATH = 'joint_cards/TableReducer/SET_PARAM_PATH';
const SET_PARAM_GRADE = 'joint_cards/TableReducer/SET_PARAM_GRADE';
const SET_PARAM_SHOTS = 'joint_cards/TableReducer/SET_PARAM_SHOTS';
const SET_PARAM_RATING = 'joint_cards/TableReducer/SET_PARAM_RATING';
const SET_PARAM_PRIVATE = 'joint_cards/TableReducer/SET_PARAM_PRIVATE';
const SET_PARAM_TYPE = 'joint_cards/TableReducer/SET_PARAM_TYPE';


let initialState = {
    name: 'No Name',
    path: '/def',
    grade: 0,
    shots: 0,
    rating: 0,
    deckCover: 'url or base64',
    private: false,
    type: 'pack',
    ////cardsPack_id
    _id: ''
}

// export type InitialStateType = {
//
// }
type InitialStateType = typeof initialState
export type ParamsTableType = InitialStateType

export const tableReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case SET_TABLE_PARAMS:
            return {
                ...state, name: action.packParams.name, path: action.packParams.path, grade: action.packParams.grade,
                shots: action.packParams.shots, rating: action.packParams.rating, private: action.packParams.private,
                type: action.packParams.type, _id: action.packParams._id
            }

        case CLEAR_TABLE_PARAMS:
            return {
                ...state, name: 'No Name', path: '/def', grade: 0, shots: 0, rating: 0,
                deckCover: 'url or base64', private: false, type: 'pack'
            }
        case SET_PARAM_NAME:
            return {...state, name: action.name}
        case SET_PARAM_PATH:
            return {...state, path: action.path}
        case SET_PARAM_GRADE:
            return {...state, grade: action.grade}
        case SET_PARAM_SHOTS:
            return {...state, shots: action.shots}
        case SET_PARAM_RATING:
            return {...state, rating: action.rating}
        case SET_PARAM_PRIVATE:
            return {...state, private: action.privat}
        case SET_PARAM_TYPE:
            return {...state, type: action.typeV}

        default:
            return state
    }
}

type ActionType = InferActionTypes<typeof actions>

// export type CardType = {
//     answer: string
//     question: string
//     cardsPack_id: string
//     grade: number
//     rating: number
//     shots: number
//     type: string
//     created: string
//     updated: string
//     __v: number
//     _id: string
// }


export const actions = {
    SetParams: (packParams: PackType) => {
        debugger
        return ({type: SET_TABLE_PARAMS, packParams} as const)
    },
    ClearParams: () => {
        return ({type: CLEAR_TABLE_PARAMS} as const)
    },

    SetParamName: (name: string) => {
        return ({type: SET_PARAM_NAME, name} as const)
    },
    SetParamPath: (path: string) => {
        return ({type: SET_PARAM_PATH, path} as const)
    },
    SetParamGrade: (grade: number) => {
        return ({type: SET_PARAM_GRADE, grade} as const)
    },
    SetParamShots: (shots: number) => {
        return ({type: SET_PARAM_SHOTS, shots} as const)
    },
    SetParamRating: (rating: number) => {
        return ({type: SET_PARAM_RATING, rating} as const)
    },
    SetParamPrivate: (privat: boolean) => {
        return ({type: SET_PARAM_PRIVATE, privat} as const)
    },
    SetParamType: (typeV: string) => {
        return ({type: SET_PARAM_TYPE, typeV} as const)
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
        // dispatch(actions.SetPackCardsTotalCount(res.data.cardPacksTotalCount));
    } catch (e) {
        let errorText = e.response.data.error;
        alert(errorText)
    }
}