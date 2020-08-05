import React from 'react';
import './PackCards.scss'
import {PackType} from '../../b3-dal/api';
import {useSelector} from 'react-redux';
import {AppStateType} from '../../b2-bll/store';

type PropsType =
    {
        item: PackType
        key: string
    }

export const UserPack = (props: PropsType) => {
    let myID = useSelector<AppStateType, string>(state => state.loginPage._id)
    let {user_id, user_name, name, grade} = props.item

    return (
        <div className={'item'}>
            <div>{user_id}</div>
            <div>{name}</div>
            <div className={'name'}>{user_name}</div>
            <div className={'grade'}>{grade}</div>
            <div>
                <button disabled={user_id !== myID}>del</button>
            </div>
            <div>
                <button disabled={user_id !== myID}>update</button>
            </div>
            <div><a href="">Has cards</a></div>
            <div><a href="">Learn cards</a></div>
        </div>

    )
}