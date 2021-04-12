import React, {useState, ChangeEvent} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '../../b2-bll/store';
import {Redirect} from 'react-router-dom';
import './ProfilePage.scss'
import {UpdateProfileModal} from './UpateProfileModal';
import {log} from 'util';
import {ItemTable} from '../p6-PackCards/floatTable/ItemTable';
import {UpdateUserAva, UpdateUserName} from '../../b2-bll/LoginPageReducer';
import {TemplateForm} from '../../b1-ui/common/TemplateFormComponent/TemplateForm';
import {RecoveryPassword} from '../../b2-bll/RecoveryReducer';
import {email} from '../../b1-ui/common/utils/validators';

export const ProfilePage = () => {
    let {isAuth, email, name, publicCardPacksCount, _id, avatar} = useSelector<AppStateType, any>(state => state.loginPage)

    let [isShowedModal, changeShow] = useState(false)

    let onChangeClick = () => {
        changeShow(true)
    }

    let [nameValue, changeNameValue] = useState(name)
    let [nameEditMode, switchNameEditMode] = useState(false)
    let dispatch = useDispatch()

    const [file64, setFile64] = useState();


/////////////////////
//     let file: any;
    const upload = (e: ChangeEvent<HTMLInputElement>) => {
        let file: any = e.target.files && e.target.files[0]
        const reader = new FileReader();
        reader.readAsDataURL(file);
        if (file) {
            reader.onloadend = () => {
                setFile64(reader.result);
            };

        }
        debugger
    }
///////////////

    let [photoEditMode, changePhotoEditMode] = useState(false)

    if (!isAuth) return <Redirect to={'/login'}/>


    return (
        <div>
            PROFILE PAGE
            <table style={{border: '2px solid black', borderCollapse: 'collapse',}}>
                <caption>Profile Data</caption>

                <thead>
                <tr>
                    <th>Prop</th>
                    <th>Val</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>name</td>
                    <td>
                        <ItemTable itemValue={nameValue} changeItemValue={changeNameValue} type={'text'}
                                   itemEditMode={nameEditMode} switchItemEditMode={switchNameEditMode}
                                   thunkDispatch={() => dispatch(UpdateUserName(nameValue))}/>
                    </td>
                </tr>
                <tr>
                    <td>email</td>
                    <td>{email}</td>
                </tr>
                <tr>
                    <td>id</td>
                    <td>{_id}</td>
                </tr>
                <tr>
                    <td>cardsCount</td>
                    <td>{publicCardPacksCount}</td>
                </tr>
                <tr>

                    <td><img src={`${avatar}`} width='70px' height='70px'  alt="No Photo"/></td>
                    {!photoEditMode
                        ? <td>
                            <button onClick={() => changePhotoEditMode(true)}>Edit</button>
                        </td>
                        : <td>
                            <div><input onChange={upload}
                                      type="file"/></div>
                            <div className={'photo_edit_block'}>
                                <button onClick={() => {
                                    dispatch(UpdateUserAva(file64))
                                }}>Save
                                </button>
                                <button className={'cancel_btn'} onClick={() => changePhotoEditMode(false)}>x</button>
                            </div>
                        </td>
                    }
                </tr>
                </tbody>
            </table>
            {isShowedModal && <UpdateProfileModal changeShow={changeShow}/>}
            <button onClick={onChangeClick}>Change</button>
        </div>
    )
}
