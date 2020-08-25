import React, {useState} from 'react';
import './PackCards.scss'
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '../../b2-bll/store';
import {DeletePackCards, UpdatePackCards,} from '../../b2-bll/PackCardsReducer';
import {NavLink} from 'react-router-dom';
import {UpdateTable} from './floatUpdateTable/UpdateTable';
import {PackType, PropsUpdatePackType} from '../../b1-ui/common/utils/types';

type PropsType =
    {
        item: PackType
        key: string
    }

export const UserPack = (props: PropsType) => {

    let [updatePanel, hideUpdatePanel]=useState(true)

    let dispatch=useDispatch()
    let myID = useSelector<AppStateType, string>(state => state.loginPage._id)
    let {user_id, user_name, name, grade, _id} = props.item


    let onDeleteClick=()=>{
        dispatch(DeletePackCards(_id))
    }

    let onUpdateClick=()=>{
        // dispatch(actions.SetParams(props.item))
        hideUpdatePanel(!updatePanel)
    }

    let onPressUpdateButton=(data:PropsUpdatePackType)=>{
        hideUpdatePanel(!updatePanel)
        dispatch(UpdatePackCards(data))
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
            {/*<NavLink to={'/profile/'+ props.user.id}>*/}
            <div><NavLink to={'/list-cards-pack/'+_id}>Has cards</NavLink></div>
            <div><a href="">Learn cards</a></div>

            <div className={!updatePanel ? 'itemFormContainer itemFormContainer-show' : 'itemFormContainer'}>
                <UpdateTable item={props.item} onUpdateClick={onPressUpdateButton} hideUpdatePanel={hideUpdatePanel}/>
            </div>

        </div>

    )
}