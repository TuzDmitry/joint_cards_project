import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '../../b2-bll/store';
import {Paginator} from '../../b1-ui/common/paginator/Paginator';
import {useParams} from 'react-router-dom';
import {CardType, GetCards, DeleteCard, SearchCards, SortCards} from '../../b2-bll/CardsReducer';
import {CreateFormModal} from './CreateFormModal';
import {SearchInput} from '../../b1-ui/common/searcInput/SearchInput';
import {SortButton} from '../../b1-ui/common/sortButton/SortButton';

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
    // let onChangeClick = () => {
    //     dispatch(ChangeCard())
    // }

    return (
        <div className={'item'}>
            <div>{props.item.question}</div>
            <div className={'name'}>{props.item.rating}</div>
            <div>{props.item.shots}</div>
            <div className={'grade'}>{props.item.grade}</div>
            <div>
                <button className={'butTable'} /*onClick={onChangeClick}*/ >CHANGE</button>
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
                <div className={'table'}>
                    <div className={'navTable'}>
                        <div className={'item'}>
                            <div>Question</div>
                            <SortButton cardsPack_id={cardsPack_id} thunk={SortCards}>Rating</SortButton>
                            <SortButton cardsPack_id={cardsPack_id} thunk={SortCards}>Shots</SortButton>
                            <SortButton cardsPack_id={cardsPack_id} thunk={SortCards}>Grade</SortButton>
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
                        <CreateFormModal show={hideCreatePanel} cardsPack_id={cardsPack_id}/>
                    </div>

                    <div className={'itemsContainer'}>
                        {ListCards}
                    </div>

                </div>

            </main>
            <footer>
                <Paginator/>
            </footer>
        </div>
    )
}
