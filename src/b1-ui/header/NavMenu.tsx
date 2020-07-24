import React from "react";
import {NavLink} from "react-router-dom";
import "./NavMenu.scss"

export const NavMenu = () => {

    return (
        <div style={
            {
                height: "50px",
                backgroundColor: "rgba(1,13,41,0.87)"
            }
        }>
            <div>

                hey
                <span className={"navItem"}><NavLink to={'/test'}>TEST</NavLink></span>
                <span className={"navItem"}><NavLink to={'/login'}>LOGIN</NavLink></span>
                <span className={"navItem"}><NavLink to={'/registration'}>REGISTRATION</NavLink></span>
                <span className={"navItem"}><NavLink to={'/recovery-password'}>RECOVERY</NavLink></span>
                <span className={"navItem"}><NavLink to={'/change-password'}>CHANGE_PASSWORD</NavLink></span>
                <span className={"navItem"}><NavLink to={'/profile'}>PROFILE</NavLink></span>
            </div>
        </div>
    )
}