import React from "react";
import {CardPage} from "../p7-CardPage/CardPage";
import {Input} from "../../b1-ui/common/input/Input";

export const PackCards = () => {

    return (
        <div>
            PACK CARDS SHOP
            <Input placeholder={'search cards'} value={''} changeValue={() => {
            }}/>
            <div>
                <CardPage/>
                <CardPage/>
                <CardPage/>
                <CardPage/>
                <CardPage/>
                <CardPage/>
            </div>
        </div>
    )
}