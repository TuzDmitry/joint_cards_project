import React from "react";
import "./CheckBox.scss"



// type PropsType = {
//     title: string
// }

export const CheckBox = (props: any) => {
    return (
        <div>
            <input className="styled-checkbox" id="styled-checkbox-1" type="checkbox"/>
            <label htmlFor="styled-checkbox-1">{props.children}</label>
        </div>
    );
};