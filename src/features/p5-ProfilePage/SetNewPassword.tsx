import {minLength7} from '../../b1-ui/common/utils/validators';
import React from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {CreateCard} from '../../b2-bll/CardsReducer';
import {useDispatch} from 'react-redux';
import { UpdatePassword } from '../../b2-bll/ProfilePageReducer';



// PropsType = {
//
// }
export type FormDataType = {
    newPassword: string
}

export const SetNewPassword = () => {
    const {handleSubmit, register, errors, reset} = useForm();

    let dispatch = useDispatch();


    const onSubmit = (formData:any ) => {
        debugger
        console.log(formData);
        dispatch(UpdatePassword(formData))
    }
    return (
        <div>
            <b>Set new Password:</b>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input name="newPassword"
                       placeholder="Write new password"
                       ref={register({
                           required: 'Required',
                           validate: value => minLength7(value)
                       })}/>
                {errors.newPassword && errors.newPassword.message}

                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}
