import React from "react";
import {TemplateForm} from '../../b1-ui/common/TemplateFormComponent/TemplateForm';
import {minLength7} from '../../b1-ui/common/utils/validators';
import {UpdatePassword} from '../../b2-bll/RecoveryReducer';
import {Redirect, useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {AppStateType} from '../../b2-bll/store';

export const ChangePasswordPage=()=>{
    let paramURL: { resetToken: string } = useParams();
    let reset_Token = paramURL.resetToken

    let isUpdatedPassSuccess=useSelector<AppStateType, boolean>(state => state.recoveryPage.updatedPass)

    if(isUpdatedPassSuccess) return <Redirect to={"/login"}/>

    return(
        <div>
            CHANGE PASSWORD PAGE
            <div>
                <TemplateForm thunk={UpdatePassword}
                              text='Set new Password:'
                              names="newPassword"
                              placeholder="Write new password"
                              required='Required'
                              validate={minLength7}
                              reset_Token={reset_Token}
                />
            </div>
        </div>
    )
}
