import React, {useState} from 'react';
import './TestPage.scss';
import {Button} from "../../b1-ui/common/buttons/Button";
import {Input} from "../../b1-ui/common/input/Input";
import {CheckBox} from "../../b1-ui/common/checkbox/CheckBox";
import {SortButton} from '../../b1-ui/common/sortButton/SortButton';
import {Paginator} from '../../b1-ui/common/paginator/Paginator';


export const TestPage = () => {

    const acton = () => {
        alert("hey")
    }

    let [arrayNum, changeArrayNum]=useState([888, 986, 11, 1939, 1240, 1648, 1750, 2020])

    return (
        <div className={"wrapper"}>

            <div>
                <Button onClick={acton} className={'buttonInner'} disabled={true}>Victor</Button>
            </div>
            <div>
                <Button onClick={acton} className={'buttonInner'} disabled={false}>Victor</Button>
            </div>
            <div>
                <Button onClick={acton} className={'buttonOuter'}>Dima</Button>
            </div>
            <div>
                <Input error={''} onEnter={acton} type={"text"}/>
            </div>
            <div>
                <CheckBox>Checkbox</CheckBox>
            </div>
            <div>
                <SortButton ArrayNum={arrayNum}/>
            </div>
            <div>
                <Paginator/>
            </div>

        </div>
    )
}
