import React from "react";
import "./CheckBox.scss"

// type PropsType = {
//     children: string
// }

export const CheckBox = (props: any) => {
    let {children, ...restProps}=props

    return (
        <div>
            <input className="styled-checkbox" id="styled-checkbox-1" type="checkbox" {...restProps}/>
            <label htmlFor="styled-checkbox-1">{children}</label>
        </div>
    );
};