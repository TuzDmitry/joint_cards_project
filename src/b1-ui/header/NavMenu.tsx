import React from 'react';
import {NavLink} from 'react-router-dom';
import './NavMenu.scss'
import {AppStateType} from '../../b2-bll/store';
import {useDispatch, useSelector} from 'react-redux';
import {InitialStateType, LogOut} from '../../b2-bll/LoginPageReducer';

export const NavMenu = () => {
    let {isAuth, avatar} = useSelector<AppStateType, InitialStateType>(state => state.loginPage)
    let dispatch = useDispatch();

    let onLogOutClick = () => {
        dispatch(LogOut())
    };
    return (
        <div className={'navBlock'}>
            <div className={'nav-wrapper'}>
                <div>
                    <span className={'navItem'}><NavLink to={'/test'}>TEST</NavLink></span>
                    <span className={'navItem'}><NavLink to={'/login'}>LOGIN</NavLink></span>
                    <span className={'navItem'}><NavLink to={'/registration'}>REGISTRATION</NavLink></span>
                    <span className={'navItem'}><NavLink to={'/profile'}>PROFILE</NavLink></span>
                    <span className={'navItem'}><NavLink to={'/pack-cards'}>CARDS</NavLink></span>
                    <span className={'navItem'}><NavLink to={'/own-cards'}>MY CARDS</NavLink></span>
                </div>
                {isAuth && <div className={'image-block'}>
                    {avatar !== ('some avatar') &&
                    <img src={`${avatar}`} width={'50px'} height={'50px'} alt="No Photo"/>}
                    <button onClick={onLogOutClick}>Log out</button>
                </div>}
            </div>
        </div>
    )
}
