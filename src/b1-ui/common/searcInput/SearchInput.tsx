import React, {ChangeEvent, useEffect} from 'react';
import {Input} from '../input/Input';

type PropsType = {
    seachLS: string
    changeSeachLS: (text: string) => void
    dispatchThunk: () => void
}


export const SearchInput = (props: PropsType) => {
    let {seachLS, changeSeachLS, dispatchThunk} = props

    useEffect(() => {
    }, []);

    let onSeachChange = (e: ChangeEvent<HTMLInputElement>) => {
        changeSeachLS(e.currentTarget.value)
    }

    let onSearchClick = () => {
        debugger;
        dispatchThunk()
        changeSeachLS('')
    }

    return (
        <div>
            <Input placeholder={'search cards'}
                   value={seachLS}
                   onEnter={onSearchClick}
                   onChange={onSeachChange}/>
            <button onClick={onSearchClick}>SEARCH</button>
        </div>
    )
}
