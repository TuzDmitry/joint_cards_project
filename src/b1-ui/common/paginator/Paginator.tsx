import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '../../../b2-bll/store';
import {GetCurrentPage, GetPackCardsAccordingSelect} from '../../../b2-bll/PackCardsReducer';
import './Paginator.scss'

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

    let q = currentPage < 10 ? 0 : currentPage - 1
    let [a, chanA] = useState(q)
    let b = a + 10
    if (pages.length > 10) pages = pages.slice(a, b)

    let onPageChanged = (p: number) => {
        dispatch(GetCurrentPage(p))
    }


    let onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
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
            {(currentPage >= 1) && <button onClick={() => {
                onPageChanged(currentPage - 1);
                chanA(a - 1)
            }}
                                           disabled={currentPage < 2}>Previous</button>}
            {pages
                // .filter(p => p >= leftPortionPageNumber && p<= rightPortionPageNumber)
                .map((p) => <button className={currentPage === p ? 'curPage' : ''} key={p}
                                    onClick={() => onPageChanged(p)}
                >{p}</button>)}
            <button onClick={() => {
                onPageChanged(currentPage + 1);
                chanA(a + 1)
            }} disabled={currentPage === pagesCount}>Next
            </button>
        </div>
    )
}


