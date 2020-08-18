import React from 'react';
import {useDispatch} from 'react-redux';

export const SortButton = (props: any) => {

    let sortGoal = props.children.toLowerCase()
    let cardsPack_id = props.cardsPack_id

    let dispatch = useDispatch()
    let onGradeSortClick = (direction: boolean) => {
        dispatch(props.thunk(sortGoal, direction, cardsPack_id))
    }

    return (
        <div className={'grade'}>{props.children}
            <button onClick={() => onGradeSortClick(true)}>up</button>
            <button onClick={() => onGradeSortClick(false)}>down</button>
        </div>
    )
}
