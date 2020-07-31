import {InputHTMLAttributes, DetailedHTMLProps, CSSProperties, useState, ChangeEvent} from "react";
import React from "react";
import "./Input.scss"
import {email, minLength7} from "../utils/validators";


export type InputNyaPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
    & { onEnter?: () => void, error?: string }
    & {
    changeValue?: (value: string) => void
    value?: string
    validate?: any
}
export const Input = (props: InputNyaPropsType) => {
    const {onEnter, error, changeValue, validate, ...restProps} = props;

    const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) onEnter && onEnter();
    }



    // let inputClass=error|check ?`red jointInput`:`jointInput`

    const onChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        changeValue && changeValue(e.currentTarget.value)
        // let rule = e.currentTarget.attributes[2].value
        // if (rule === "number") {
        //     check = /^\d+$/.test(e.currentTarget.value)
        // }
    }



    let check;
    let errorMessage;
    debugger
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

                   // default:
                   //     check = false
               }
       }else {check=false}
   }else {
       check=false
   }


    // check=restProps.value?!/^\d+$/.test(restProps.value):false

    let inputClass = check ? `red jointInput` : `jointInput`

    return (
        <div className='item'>
            <input className={inputClass} onKeyPress={onKeyPress} onChange={onChangeInputValue}  {...restProps} />
            {error ? <div className='error'>{error}</div> : null}
            <div>{errorMessage}</div>
        </div>
    );
};