import {InputHTMLAttributes, DetailedHTMLProps, CSSProperties, useState, ChangeEvent} from "react";
import React from "react";
import "./Input.scss"
import {email, minLength7} from "../utils/validators";


export type InputNyaPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
    & { onEnter?: () => void, error?: string }
    & {
    changeValue?: (value: string) => void
    value?: string
    validate?: string
}
export const Input = (props: InputNyaPropsType) => {
    const {onEnter, error, changeValue, validate, ...restProps} = props;

    const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) onEnter && onEnter();
    }

    const onChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        changeValue && changeValue(e.currentTarget.value)
    }



    let check;
    let errorMessage;
   if(validate){
       if (restProps.value) {

               switch (validate) {
                   case "email":
                        errorMessage=email(restProps.value)
                       check=errorMessage?true:false
                       break;
                   case "password":
                       check=restProps.value.length<7?true:false
                       errorMessage=minLength7(restProps.value)
                       break;
               }
       }else {check=false}
   }else {
       check=false
   }

    let inputClass = check ? `red jointInput` : `jointInput`

    return (
        <div className='item'>
            <input className={inputClass} onKeyPress={onKeyPress} onChange={onChangeInputValue}  {...restProps} />
            {error ? <div className='error'>{error}</div> : null}
            <div className='error'>{errorMessage}</div>
        </div>
    );
};