import React, {ChangeEvent, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '../../../b2-bll/store';
import {GetCurrentPage, GetPackCardsAccordingSelect} from '../../../b2-bll/PackCardsReducer';

export const Paginator = ({}) => {

    let pageCount = useSelector<AppStateType, number>(state => state.packCards.pageCount);
    let currentPage = useSelector<AppStateType, number>(state => state.packCards.currentPage);
    let packsTotalCount = useSelector<AppStateType, number>(state => state.packCards.packsTotalCount);
    let dispatch = useDispatch();

    let pagesCount = Math.ceil(packsTotalCount / pageCount);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let onPageChanged = (p: number) => {
        debugger
        dispatch(GetCurrentPage(p))
    }


    let onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        debugger
        dispatch(GetPackCardsAccordingSelect(+e.currentTarget.value))
    }

    return (
        <div>
            <select value={pageCount} onChange={onSelectChange}>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
                <option value={40}>40</option>
                <option value={50}>50</option>
            </select>
            <button>Previous</button>
            {pages.map((p) => <button key={p} onClick={() => onPageChanged(p)}
            >{p}</button>)}
            <button>Next</button>
        </div>
    )
}


