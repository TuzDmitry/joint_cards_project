import React from "react";
import {NavLink, Redirect} from 'react-router-dom';
import "./NavMenu.scss"
import { AppStateType } from "../../b2-bll/store";
import {useDispatch, useSelector} from 'react-redux';
import {LogOut} from '../../b2-bll/LoginPageReducer';

export const NavMenu = () => {

    let isAuth=useSelector<AppStateType, boolean>(state =>state.loginPage.isAuth )

    let dispatch = useDispatch();

    let onLogOutClick = () => {
        dispatch(LogOut())
    }

    return (
        <div className={"navBlock"}>
            <div>
                <span className={"navItem"}><NavLink to={'/test'}>TEST</NavLink></span>
                <span className={"navItem"}><NavLink to={'/login'}>LOGIN</NavLink></span>
                <span className={"navItem"}><NavLink to={'/registration'}>REGISTRATION</NavLink></span>
                <span className={"navItem"}><NavLink to={'/profile'}>PROFILE</NavLink></span>
                <span className={"navItem"}><NavLink to={'/pack-cards'}>CARDS</NavLink></span>
                <span className={"navItem"}><NavLink to={'/own-cards'}>MY CARDS</NavLink></span>
                {isAuth  && <button onClick={onLogOutClick}>Log out</button> }
            </div>
        </div>
    )
}
