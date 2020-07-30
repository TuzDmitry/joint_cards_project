import React, {useState} from "react";
import {Input} from "../../b1-ui/common/input/Input";
import {Button} from "../../b1-ui/common/buttons/Button";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../b2-bll/store";
import {sendUserData} from "../../b2-bll/RegPageReducer";
import {Redirect} from "react-router-dom";

export const RegPage = () => {

    const isRegistrated = useSelector<AppStateType, boolean>(state => state.regPage.isRegistrated)
    // let isAuth=useSelector<AppStateType, boolean>(state =>state.loginPage.isAuth )

    const notification = useSelector<AppStateType, boolean>(state => state.regPage.notification)

    const dispatch = useDispatch()

    const submitData = () => {
        dispatch(sendUserData( email, password))
        // alert(`${email} ${password}`)
    }

    let [email, changeEmail] = useState('')
    let [password, changePassword] = useState('')


    if (isRegistrated) return <Redirect to={"/login"}/>
    return (
        <div>
            <div>
                REGISTRATION PAGE
                !!!!
            </div>
            <div>{notification}</div>
            <form>
                <Input placeholder={'email'} value={email} changeValue={changeEmail}/>
                <Input placeholder={'password'} value={password} changeValue={changePassword}/>
                {/*<CheckBox>remember me</CheckBox>*/}
                <Button className='buttonInner' children={'Submit'} onClick={submitData}/>
            </form>
        </div>
    )
}