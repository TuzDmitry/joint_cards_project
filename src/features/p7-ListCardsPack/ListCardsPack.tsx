import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '../../b2-bll/store';
import {Paginator} from '../../b1-ui/common/paginator/Paginator';
import {useParams} from 'react-router-dom';
import {CardType, GetCards, DeleteCard, SearchCards} from '../../b2-bll/CardsReducer';
import {CreateFormModal} from './CreateFormModal';
import {SearchInput} from '../../b1-ui/common/searcInput/SearchInput';

type PropsType =
    {
        item: CardType
        key: string
    }

export const CardItem = (props: PropsType) => {

    let dispatch = useDispatch();

    let onDeleteItem = () => {
        dispatch((DeleteCard(props.item._id, props.item.cardsPack_id)))
    }

    return (
        <div className={'item'}>
            <div>{props.item.question}</div>
            <div className={'name'}>{props.item.rating}</div>
            <div>{props.item.shots}</div>
            <div className={'grade'}>{props.item.grade}</div>
            <div>
                <button className={'butTable'}>CHANGE</button>
                <button onClick={onDeleteItem}>DELETE</button>
            </div>
        </div>
    )
};

export const ListCardsPack = () => {
    let paramURL: { id: string } = useParams();
    let cardsPack_id = paramURL.id

    let cardsPack = useSelector<AppStateType, Array<CardType>>(state => state.listCardsPack.cards)

    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(GetCards(cardsPack_id));
    }, [])


    let [hideCreatePanel, changeHide] = useState(true)


    // const onShowHideClick=()=>{
    //     changeHide(!hideItemPanel)
    // }


    // const onAddClick=(requestData:CardsPackType)=>{
    //     dispatch(AddPackCards(requestData))
    // }


    let ListCards = cardsPack.map(item => <CardItem key={item._id} item={item}/>)

    let [seachLS, changeSeachLS] = useState('')
    let dispatchThunk = () => dispatch(SearchCards(cardsPack_id, seachLS));

    return (
        <div>
            CARDS OF THIS PACK
            <header>
                <SearchInput seachLS={seachLS} changeSeachLS={changeSeachLS} dispatchThunk={dispatchThunk}/>
            </header>
            <main>

                {/*cards: [*/}
                {/*{*/}
                {/*    answer: "no answer"*/}
                {/*    question: "no question"*/}
                {/*    cardsPack_id: "5eb6a2f72f849402d46c6ac4"*/}
                {/*    grade: 4.987525071790364*/}
                {/*    rating: 0*/}
                {/*    shots: 1*/}
                {/*    type: "card"*/}
                {/*    created: "2020-05-13T11:05:44.867Z"*/}
                {/*    updated: "2020-05-13T11:05:44.867Z"*/}
                {/*    __v: 0*/}
                {/*    _id: "5ebbd48876810f1ad0e7ece3"*/}
                {/*},*/}
                {/*...*/}
                {/*]*/}
                <div className={'table'}>
                    <div className={'navTable'}>
                        <div className={'item'}>
                            <div>Question</div>
                            <div className={'name'}>Rating</div>
                            <div>Shots</div>
                            <div className={'grade'}>Grade</div>
                            <div>
                                <button className={'butTable'}>LEARN</button>
                            </div>
                            <div>
                                <button className={'butTable'} onClick={() => changeHide(!hideCreatePanel)}>CREATE
                                </button>
                            </div>

                        </div>
                    </div>
                    <div
                        className={!hideCreatePanel ? 'itemFormContainer itemFormContainer-show' : 'itemFormContainer'}>
                        {/*<FloatTable onAddClick={onAddClick} changeHide={changeHide}/>*/}
                        <CreateFormModal show={hideCreatePanel} cardsPack_id={cardsPack_id}/>
                    </div>

                    <div className={'itemsContainer'}>
                        {ListCards}
                        {/*<CardItem/>*/}
                        {/*<CardItem/>*/}
                        {/*<CardItem/>*/}
                        {/*<CardItem/>*/}
                    </div>

                </div>

            </main>
            <footer>
                <Paginator/>
            </footer>
        </div>
    )
}
