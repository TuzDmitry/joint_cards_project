import React, {useState} from "react";
import {Input} from "../../b1-ui/common/input/Input";
import {Button} from "../../b1-ui/common/buttons/Button";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../b2-bll/store";
import {sendUserData, InitialStateType} from "../../b2-bll/RegPageReducer";
import {Redirect} from "react-router-dom";
import {Preloader} from "../../b1-ui/common/preloader/Preloader";

export const RegPage = () => {

    const notification = useSelector<AppStateType, string>(state => state.regPage.notification)
    const {isRegistrated, inProgress} = useSelector<AppStateType, InitialStateType>(state => state.regPage)


    const dispatch = useDispatch();

    const submitData = () => {
        dispatch(sendUserData(email, password))
    }

    let [email, changeEmail] = useState('')
    let [password, changePassword] = useState('')


    if (isRegistrated) return <Redirect to={"/login"}/>
    return (
        <div>
            <div>
                {inProgress && <Preloader/>}
                REGISTRATION PAGE
                !!!!
            </div>

            <div className='form'>
                <div>{notification}</div>
                <Input placeholder={'email'} value={email} changeValue={changeEmail} validate={"email"}/>
                <Input placeholder={'password'} value={password} changeValue={changePassword} validate={"password"}/>
                <Button className='buttonInner' children={'Submit'} onClick={submitData} disabled={inProgress}/>
            </div>

        </div>
    )
}