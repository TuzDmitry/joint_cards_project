import {AppStateType, InferActionTypes} from './store';
import {FormDataType} from '../b1-ui/common/TemplateFormComponent/TemplateForm';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {jointCardsApi} from '../b3-dal/api';

const UPDATE_PASS_SUCCESS = 'joint_cards/RecoveryReducer/UPDATE_PASS_SUCCESS';


let initialState = {
    updatedPass: false
}

type InitialStateType = typeof initialState


export const recoveryReducer = (state: InitialStateType = initialState, action: any) => {
    switch (action.type) {
        case UPDATE_PASS_SUCCESS:
            return {...state, updatedPass: action.flag}
        default:
            return state
    }
}


type ActionType = InferActionTypes<typeof actions>
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionType>;
const actions = {
    updatePassSuccess: (flag: boolean) => ({type: UPDATE_PASS_SUCCESS, flag} as const),
}


///THUNKs


export const RecoveryPassword = (formData: { email: string, reset_Token: null }): ThunkType => async (dispatch: ThunkDispatch<AppStateType, unknown, ActionType>, getState: () => AppStateType) => {
    try {
        let res = await jointCardsApi.recoveryPassword(formData.email)
        debugger
        alert(`Инструкция по восстановлению пароля успешно отправлена на ${formData.email}`)
    } catch (e) {
        let errorText = e.response.data.error;
        alert(errorText)
    }
}


export const UpdatePassword = (formData: FormDataType): ThunkType => async (dispatch: ThunkDispatch<AppStateType, unknown, ActionType>, getState: () => AppStateType) => {
    try {
        let res = await jointCardsApi.updatePassword(formData)
        debugger
        alert('Пароль успешно изменен')
        dispatch(actions.updatePassSuccess(true))
        dispatch(actions.updatePassSuccess(false))
    } catch (e) {

    }
}
