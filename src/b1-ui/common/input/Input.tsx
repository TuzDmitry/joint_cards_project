import {InputHTMLAttributes, DetailedHTMLProps, CSSProperties, useState, ChangeEvent} from "react";
import React from "react";
import "./Input.scss"


export type InputNyaPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
    & { onEnter?: () => void, error?: string }
    & { changeValue?: (value: string ) => void
    value?: string }
export const Input = (props: InputNyaPropsType) => {
    const {onEnter, error, changeValue, ...restProps} = props;

    const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) onEnter && onEnter();
    }

    let inputClass=error ?`red jointInput`:`jointInput`

    const onChangeInputValue =  (e: ChangeEvent<HTMLInputElement>)=> {
        changeValue &&  changeValue(e.currentTarget.value)
    }


    return (
        <div className='item'>
            <input className={inputClass} onKeyPress={onKeyPress} onChange={onChangeInputValue}  {...restProps}/>
            {error ? <div className='error'>{error}</div> : null}
        </div>
    );
};