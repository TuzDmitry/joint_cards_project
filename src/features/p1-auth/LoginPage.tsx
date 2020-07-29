import React, {useState} from "react";
import {Input} from "../../b1-ui/common/input/Input";
import {CheckBox} from "../../b1-ui/common/checkbox/CheckBox";
import {Button} from "../../b1-ui/common/buttons/Button";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../b2-bll/store";
import {NavLink, Redirect} from "react-router-dom";
import {LogIn} from "../../b2-bll/LoginPageReducer";
import "./LoginPage.scss"

export const LoginPage = () => {

    let isAuth=useSelector<AppStateType, boolean>(state =>state.loginPage.isAuth )
    let errorE=useSelector<AppStateType, string>(state =>state.loginPage.error )


    let [email, changeEmail] = useState('')
    let [password, changePassword] = useState('')
    let [rememberMe, changeRemember] = useState(false)


    const dispatch = useDispatch()

    const onCheckBoxClick=()=>{
        changeRemember(!rememberMe)
    }


    const submitData = () => {
        // dispatch(sendUserData(email, password))
        alert(`${email} ${password} ${rememberMe}`)
        dispatch(LogIn(email, password, rememberMe))
    }


    if(isAuth) return <Redirect to={"/profile"}/>

    return (

        <div>
            LOGIN PAGE
            <form >
                <Input placeholder={'Email'} error={errorE} value={email} changeValue={changeEmail}/>
                <Input placeholder={'Password'} error='' value={password} changeValue={changePassword}/>
                <div>
                    <NavLink to={'/recovery-password'}>Forgot password?</NavLink>
                </div>
                <CheckBox onChange={onCheckBoxClick} checked={rememberMe}>remember me</CheckBox>
                <Button className='buttonInner' onClick={submitData}>Sign In</Button>
                <div>
                    <NavLink to={'/registration'}>Registration</NavLink>
                </div>
            </form>

        </div>
    )
}