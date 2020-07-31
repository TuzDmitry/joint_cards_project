import React, {useState} from "react";
import {Input} from "../../b1-ui/common/input/Input";
import {CheckBox} from "../../b1-ui/common/checkbox/CheckBox";
import {Button} from "../../b1-ui/common/buttons/Button";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../b2-bll/store";
import {NavLink, Redirect} from "react-router-dom";
import {LogIn} from "../../b2-bll/LoginPageReducer";
import "./LoginPage.scss"
import {InitialStateType} from "../../b2-bll/RegPageReducer";
import {Preloader} from "../../b1-ui/common/preloader/Preloader";

export const LoginPage = () => {

    let isAuth=useSelector<AppStateType, boolean>(state =>state.loginPage.isAuth )
    let errorE=useSelector<AppStateType, string>(state =>state.loginPage.error )
    let inProgress = useSelector<AppStateType, boolean>(state => state.loginPage.inProgress)

    // let {isAuth, inProgress } = useSelector<AppStateType, InitialStateType>(state => state.loginPage)

    let [email, changeEmail] = useState('')
    let [password, changePassword] = useState('')
    let [rememberMe, changeRemember] = useState(false)

    const dispatch = useDispatch()

    const onCheckBoxClick=()=>{
        changeRemember(!rememberMe)
    }


    const submitData = () => {
        dispatch(LogIn(email, password, rememberMe))
    }


    if(isAuth) return <Redirect to={"/profile"}/>
    else if(inProgress) return   <Preloader/>

    debugger
    return (

        <div>
            LOGIN PAGE
            <form >
                <Input placeholder={'Email'} error={errorE} value={email} changeValue={changeEmail} validate={"email"}/>
                <Input placeholder={'Password'} error='' value={password} changeValue={changePassword} validate={"password"}/>
                <div>
                    <NavLink to={'/recovery-password'}>Forgot password?</NavLink>
                </div>
                <CheckBox onChange={onCheckBoxClick} checked={rememberMe}>remember me</CheckBox>
                <Button className='buttonInner' onClick={submitData} disabled={inProgress? true : false}>Sign In</Button>
                <div>
                    <NavLink to={'/registration'}>Registration</NavLink>
                </div>
            </form>

        </div>
    )
}