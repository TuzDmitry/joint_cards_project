import React from 'react';
import './UpateProfileModal.scss'

type PropsType={
    changeShow:(value:boolean)=>void
}

export const UpdateProfileModal=(props:PropsType)=>{


    let onSaveClick=()=>{
        props.changeShow(false)
    }

    return(
        <div>
            <div className={'back-ground'}></div>
            <div className={'update-modal'}>
                поменяй данные
                <div>
                    <input type="text"/>
                    <input type="text"/>
                    <input type="text"/>
                    <input type="text"/>
                    <input type="text"/>
                </div>
                <button onClick={onSaveClick}>Save</button>
            </div>
        </div>
    )
}