import React from "react";
import {useSelector} from "react-redux";
import {AppStateType} from "../../b2-bll/store";
import { Redirect } from "react-router-dom";

export const ProfilePage=()=>{

    let isAuth=useSelector<AppStateType, boolean>(state =>state.loginPage.isAuth )

    if(!isAuth) return <Redirect to={"/login"}/>
    return(
        <div>
            PROFILE PAGE
        </div>
    )
}