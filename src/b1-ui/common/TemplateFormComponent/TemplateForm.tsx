import React from 'react';
import { useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';

// PropsType = {
//
// }
export type FormDataType = {
    newPassword: string
    reset_Token:null|string
}

export const TemplateForm = ({thunk,text,placeholder,required,validate,names,reset_Token=null}:any) => {
    const {handleSubmit, register, errors, reset} = useForm();

    let dispatch = useDispatch();


    const onSubmit = (formData:any ) => {
        console.log(formData);
        dispatch(thunk({reset_Token, ...formData}))
    }

    // let obj={names}
    // user[objPropName]
    return (
        <div>
            <b>{text}</b>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input name={names}
                       placeholder={placeholder}
                       ref={register({
                           required: required,
                           validate: value => validate(value)
                       })}/>
                {errors[names] && errors[names].message}

                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}
