import React, {ButtonHTMLAttributes, DetailedHTMLProps} from "react";
import "./Button.scss"

export type ButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
& {onClick: () => void }



export const Button = (props: ButtonPropsType) => {
    let {children, ...restProps} = props
    debugger
    return (
        <button {...restProps}>
            {children}
        </button>
    )
}

