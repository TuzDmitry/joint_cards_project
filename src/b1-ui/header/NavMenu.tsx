import React from "react";
import {NavLink} from "react-router-dom";
import "./NavMenu.scss"

export const NavMenu = () => {

    return (
        <div className={"navBlock"}>
            <div>
                <span className={"navItem"}><NavLink to={'/test'}>TEST</NavLink></span>
                <span className={"navItem"}><NavLink to={'/login'}>LOGIN</NavLink></span>
                <span className={"navItem"}><NavLink to={'/registration'}>REGISTRATION</NavLink></span>
                <span className={"navItem"}><NavLink to={'/recovery-password'}>RECOVERY</NavLink></span>
                {/*<span className={"navItem"}><NavLink to={'/change-password'}>CHANGE_PASSWORD</NavLink></span>*/}
                <span className={"navItem"}><NavLink to={'/profile'}>PROFILE</NavLink></span>
                <span className={"navItem"}><NavLink to={'/pack-cards'}>CARDS</NavLink></span>
                <span className={"navItem"}><NavLink to={'/own-cards'}>MY CARDS</NavLink></span>
            </div>
        </div>
    )
}
