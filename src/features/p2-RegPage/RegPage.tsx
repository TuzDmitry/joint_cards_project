import React, {useState} from "react";
import {Input} from "../../b1-ui/common/input/Input";
import {CheckBox} from "../../b1-ui/common/checkbox/CheckBox";
import {Button} from "../../b1-ui/common/buttons/Button";
import {useDispatch, useSelector} from "react-redux";
import { AppStateType } from "../../b2-bll/store";

export const RegPage=()=>{




    const isRegistrated = useSelector<AppStateType, boolean>(state => state.regPage.isRegistrated)

    const dispatch = useDispatch()

    const submitData = () => {
        // dispatch(setUserData( email, password))
        alert(`${email} ${password}`)
    }

    let [email, changeEmail] = useState('')
    let [password, changePassword] = useState('')
    return(
        <div>
            <div>
                REGISTRATION PAGE
                !!!!
            </div>
            {isRegistrated ? <div>Registration success!!!</div> : <div>Registration failed</div> }
            <form>
                <Input placeholder={'email'} value={email} changeValue={changeEmail}  />
                <Input placeholder={'password'} value={password} changeValue={changePassword}/>
                {/*<CheckBox>remember me</CheckBox>*/}
                <Button className='buttonInner' children={'Submit'} onClick={submitData} />
            </form>
        </div>
    )
}