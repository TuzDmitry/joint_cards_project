import React, {useEffect, useState} from 'react';
import {Input} from '../../b1-ui/common/input/Input';
import {AddPackCards, GetPacksCardsWithSettings} from '../../b2-bll/PackCardsReducer';
import {useDispatch, useSelector} from 'react-redux';
import './PackCards.scss'
import {UserPack} from './UserPack';
import {AppStateType} from '../../b2-bll/store';
import {CardsPackType, PackType} from '../../b3-dal/api';
import {FloatTable} from './floatTable/FloatTable';
import {Paginator} from '../../b1-ui/common/paginator/Paginator';

export const PackCards = () => {
    let usersPack = useSelector<AppStateType, Array<PackType>>(state => state.packCards.cards)
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(GetPacksCardsWithSettings());
        // console.log('перерисовка списка колод')
    }, [])

    let UsersPackItems = usersPack.map(item => <UserPack key={item._id} item={item}/>)

    let [hideItemPanel, changeHide]=useState(true)


    const onShowHideClick=()=>{
        changeHide(!hideItemPanel)
    }


    const onAddClick=(requestData:CardsPackType)=>{
        dispatch(AddPackCards(requestData))
    }


    let _id = useSelector<AppStateType, any>(state => state.loginPage._id)

    return (
        <div className={'PackCards'}>
            PACK CARDS SHOP
            <header>
                <Input placeholder={'search cards'} value={''}/>
            </header>
            <main>
                <div style={{width: '100px', height: '60px'}}>
                    <button onClick={()=>dispatch(GetPacksCardsWithSettings())}>ALL CARDS</button>
                    <button onClick={()=>dispatch(GetPacksCardsWithSettings(_id))}>MY CARDS</button>
                </div>


                <div className={'table'}>
                    <div className={'navTable'}>
                        <div className={'item'}>
                            <div >USER ID</div>
                            <div className={'name'}>Name</div>
                            <div >USER NAME</div>
                            <div className={'grade'}>Crade</div>
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


