import React, {ClassAttributes, InputHTMLAttributes} from "react";
import "./CheckBox.scss"

type PropsType = {
    children: string
}

export type CheckNyaPropsType =PropsType & ClassAttributes<HTMLInputElement>
    & InputHTMLAttributes<HTMLInputElement>

// const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {


export const CheckBox = (props: CheckNyaPropsType) => {
    let {children, ...restProps}=props

    return (
        <div>
            <input className="styled-checkbox" id="styled-checkbox-1" type="checkbox" {...restProps}/>
            <label htmlFor="styled-checkbox-1">{children}</label>
        </div>
    );
};