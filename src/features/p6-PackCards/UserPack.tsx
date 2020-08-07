import React from 'react';
import './PackCards.scss'
import {PackType} from '../../b3-dal/api';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '../../b2-bll/store';
import {DeletePackCards, UpdatePackCards} from '../../b2-bll/PackCardsReducer';

type PropsType =
    {
        item: PackType
        key: string
    }
export const UserPack = (props: PropsType) => {
    debugger
    let dispatch=useDispatch()
    let myID = useSelector<AppStateType, string>(state => state.loginPage._id)
    let {user_id, user_name, name, grade, _id} = props.item


    let onDeleteClick=()=>{
        dispatch(DeletePackCards(_id))
    }


    let obj={
        // name: nameValue!=='No Name'?nameValue:undefined,
        //     path: pathValue!=='/def'?pathValue:undefined,
        // grade: gradeValue!==0?gradeValue:undefined,
        // shots: shotsValue!==0?shotsValue:undefined,
        // rating: ratingValue!==0?ratingValue:undefined,
        // deckCover: deckCoverValue!=='url or base64'?nameValue:undefined,
        // private: privateValue!==false?privateValue:undefined,
        // type: typeValue!=='pack'?typeValue:undefined,
    }

    let onUpdateClick=()=>{
        dispatch(UpdatePackCards(_id))
    }

    return (
        <div className={'item'}>
            <div>{user_id.slice(0,15)}</div>
            <div>{name}</div>
            <div className={'name'}>{user_name.slice(0,15)}</div>
            <div className={'grade'}>{grade}</div>
            <div>
                <button disabled={user_id !== myID} onClick={onDeleteClick}>del</button>
            </div>
            <div>
                <button disabled={user_id !== myID} onClick={onUpdateClick}>update</button>
            </div>
            <div><a href="">Has cards</a></div>
            <div><a href="">Learn cards</a></div>
        </div>

    )
}