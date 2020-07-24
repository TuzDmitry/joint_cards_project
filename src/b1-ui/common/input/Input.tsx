import {InputHTMLAttributes, DetailedHTMLProps, CSSProperties, useState, ChangeEvent} from "react";
import React from "react";
import "./Input.scss"


export type InputNyaPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
    & { onEnter?: () => void, error?: string }
    & {
    changeValue?: (value: string ) => void
    value?: string
}
export const Input = (props: InputNyaPropsType) => {
    const {onEnter, error, changeValue, ...restProps} = props;

    const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) onEnter && onEnter();
    }

    let St: CSSProperties = error ?
        {marginLeft: 10, marginRight: 10, borderColor: 'red'} :
        {marginLeft: 10, marginRight: 10};


    let errorStyle: CSSProperties = {color: 'red', fontWeight: 'bold'}


    const onChangeInputValue =  (e: ChangeEvent<HTMLInputElement>)=> {
        changeValue &&  changeValue(e.currentTarget.value)
    }

    debugger
    return (
        <>
            <input style={St} onKeyPress={onKeyPress} onChange={onChangeInputValue}  {...restProps}/>
            {error ? <div style={errorStyle}>{error}</div> : null}
        </>
    );
};