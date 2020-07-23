import React from "react";
import "./CheckBox.scss"

export const CheckBox = () => {
    return (
            <div>
                <input className="styled-checkbox" id="styled-checkbox-1" type="checkbox"/>
                <label htmlFor="styled-checkbox-1">Checkbox</label>
            </div>
    );
};