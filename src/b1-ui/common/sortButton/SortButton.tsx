import React from 'react';
import {useDispatch} from 'react-redux';
import arrow from '../../../assets/images/arrow.png'
import './SortButton.scss'

export const SortButton = (props: any) => {

    let sortGoal = props.children.toLowerCase()
    let cardsPack_id = props.cardsPack_id

    let dispatch = useDispatch()
    let onGradeSortClick = (direction: boolean) => {
        dispatch(props.thunk(sortGoal, direction, cardsPack_id))
    }

    return (
        <div className={'grade'}>
            <div>{props.children}</div>
            <div className='arrowConrtainer'>
                <img className='arrowUp' src={arrow} onClick={() => onGradeSortClick(true)}/>
                <img className='arrowDown' src={arrow} onClick={() => onGradeSortClick(false)}/>
            </div>
        </div>
    )
}
