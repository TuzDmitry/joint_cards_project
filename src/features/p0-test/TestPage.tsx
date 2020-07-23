import React from "react";
import './TestPage.scss';
import {Button} from "../../b1-ui/common/buttons/Button";
import {Input} from "../../b1-ui/common/input/Input";
import {CheckBox} from "../../b1-ui/common/checkbox/CheckBox";


export const TestPage = () => {

    const acton = () => {
        alert("hey")
    }


    return (
        <div className={"wrapper"}>

            <div>
                <Button onClick={acton} className={'buttonInner'}>Victor</Button>
            </div>
            <div>
                <Button onClick={acton} className={'buttonOuter'}>Dima</Button>
            </div>
            <div>
                <Input error={''} onEnter={acton} type={"text"}/>
            </div>
            <div>
                <CheckBox/>
            </div>


        </div>
    )
}