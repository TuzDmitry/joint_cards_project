import React from 'react';
import {useSelector} from 'react-redux';
import {AppStateType} from '../../b2-bll/store';
import {Redirect} from 'react-router-dom';
import './ProfilePage.scss'
import {minLength1, minLength7} from '../../b1-ui/common/utils/validators';
import {SetNewPassword} from './SetNewPassword';

export const ProfilePage = () => {
    let {isAuth, email, name, publicCardPacksCount, _id} = useSelector<AppStateType, any>(state => state.loginPage)

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
                    <td>{name}</td>
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
                </tbody>
            </table>
        </div>
    )
}
