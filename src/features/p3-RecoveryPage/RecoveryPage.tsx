import React from "react";
import {email} from '../../b1-ui/common/utils/validators';
import {TemplateForm} from '../../b1-ui/common/TemplateFormComponent/TemplateForm';
import {RecoveryPassword} from '../../b2-bll/RecoveryReducer';


export const RecoveryPage=()=>{
    return(
        <div>
            RECOVERY PAGE
            <TemplateForm thunk={RecoveryPassword}
                          text='Enter Your Email:'
                          names="email"
                          placeholder="Write email"
                          required='Required'
                          validate={email}/>
        </div>
    )
}


