import React, {useEffect, useState} from 'react';
import {
    AddPackCards,
    GetMyPackCards,
    GetPacksCards,
    SearchPackCards, SortPackCards,
} from '../../b2-bll/PackCardsReducer';
import {useDispatch, useSelector} from 'react-redux';
import './PackCards.scss'
import {UserPack} from './UserPack';
import {AppStateType} from '../../b2-bll/store';
import {FloatTable} from './floatTable/FloatTable';
import {Paginator} from '../../b1-ui/common/paginator/Paginator';
import {SearchInput} from '../../b1-ui/common/searcInput/SearchInput';
import {SortButton} from '../../b1-ui/common/sortButton/SortButton';
import {CardsPackType, PackType} from '../../b1-ui/common/utils/types';

export const PackCards = () => {
    let usersPack = useSelector<AppStateType, Array<PackType>>(state => state.packCards.packs)

    let isAuth = useSelector<AppStateType, boolean>(state => state.loginPage.isAuth)
    let dispatch = useDispatch()
    useEffect(() => {
        if (isAuth) dispatch(GetPacksCards());
    }, [isAuth])


    let [hideItemPanel, changeHide] = useState(true)
    const onShowHideClick = () => {
        changeHide(!hideItemPanel)
    }
    const onAddClick = (requestData: CardsPackType) => {
        debugger
        dispatch(AddPackCards(requestData))
    }

    let _id = useSelector<AppStateType, any>(state => state.loginPage._id)

    let UsersPackItems = usersPack.map(item => <UserPack key={item._id} item={item}/>)

    let [seachLS, changeSeachLS] = useState('')
    let dispatchThunk = () => dispatch(SearchPackCards(seachLS));

    return (
        <div className={'PackCards'}>
            PACK CARDS SHOP
            <header>
                <SearchInput seachLS={seachLS} changeSeachLS={changeSeachLS} dispatchThunk={dispatchThunk}/>
            </header>
            <main>
                <div style={{width: '100px', height: '60px'}}>
                    <button onClick={() => dispatch(GetMyPackCards())}>ALL CARDS</button>
                    <button onClick={() => dispatch(GetMyPackCards(_id))}>MY CARDS</button>
                </div>

                <div className={'table'}>
                    <div className={'navTable'}>
                        <div className={'item'}>
                            <div>USER ID</div>
                            <div className={'name'}>Pack name</div>
                            <div>USER NAME</div>
                            <SortButton thunk={SortPackCards}>Grade</SortButton>
                            <div>
                                <button className={'butTable'} onClick={onShowHideClick}>add</button>
                            </div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                    <div className={!hideItemPanel ? 'itemFormContainer itemFormContainer-show' : 'itemFormContainer'}>
                        <FloatTable onAddClick={onAddClick} changeHide={changeHide}/>
                    </div>


                    <div className={'itemsContainer'}>
                        {UsersPackItems}
                    </div>
                </div>

            </main>
            <footer>
                <Paginator/>
            </footer>
        </div>
    )
}


