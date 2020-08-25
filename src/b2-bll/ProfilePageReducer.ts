import {AppStateType, InferActionTypes} from './store';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {FormDataType} from '../b1-ui/common/TemplateFormComponent/TemplateForm';
import {restoreStateLocalStorage, saveStateToLocalStorage} from '../b1-ui/common/utils/LocalStorage';
import {jointCardsApi} from '../b3-dal/api';

let initialState={
    firstName:null,
    lastName:null,
    age:null,
    city:null,
    email:null
}

type InitialStateType=typeof initialState



export const profilePageReducer = (state:InitialStateType=initialState, action: any) => {
    switch (action.type) {
        case "fdsf":
            return {...state}
        default:
            return state
    }
}


type ActionType =  InferActionTypes<typeof actions>
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionType>;

const actions = {
    setCounterValue: (value: number) => {
        return ( {type: '', value} as const)

    },
    updateCounterValue: (value: number) => {
        return ({type: '', value: value} as const)
    }
}


// export const UpdatePassword = (formData: FormDataType): ThunkType => async (dispatch: ThunkDispatch<AppStateType, unknown, ActionType>, getState: () => AppStateType) => {
//     debugger
//
//     let token = restoreStateLocalStorage('authToken', '')
//     try {
//         let res = await jointCardsApi.updatePassword(token, formData )
//         debugger
//         saveStateToLocalStorage(res.data.token, 'authToken')
//         alert(res.data.success)
//     }
//    catch (e) {
//
//    }
// }
