import React from "react";
import {useSelector} from "react-redux";
import {AppStateType} from "../../b2-bll/store";
import { Redirect } from "react-router-dom";
import "./ProfilePage.scss"

export const ProfilePage=()=>{
    let {isAuth,email,name,id}=useSelector<AppStateType, any>(state =>state.loginPage )
debugger

    if(!isAuth) return <Redirect to={"/login"}/>
    return(
        <div>
            PROFILE PAGE
            <table style={{border:"2px solid black", borderCollapse: "collapse",}}>
                <caption>Profile Data</caption>
                <tr>
                    <td >name</td>
                    <td>{name}</td>
                </tr>
                <tr>
                    <td >email</td>
                    <td>{email}</td>
                </tr>
                <tr>
                    <td >id</td>
                    <td>{id}</td>
                </tr>
            </table>


        </div>
    )
}