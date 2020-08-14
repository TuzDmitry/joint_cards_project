import React, {useEffect, useState} from 'react';
import {Input} from '../../b1-ui/common/input/Input';
import {AddPackCards, GetMyPackCards, GetPacksCards, UpdatePackCards} from '../../b2-bll/PackCardsReducer';
import {useDispatch, useSelector} from 'react-redux';
import './PackCards.scss'
import {UserPack} from './UserPack';
import {AppStateType} from '../../b2-bll/store';
import {CardsPackType, PackType} from '../../b3-dal/api';
import {FloatTable} from './floatTable/FloatTable';
import {Paginator} from '../../b1-ui/common/paginator/Paginator';
import {UpdateTable} from './floatUpdateTable/UpdateTable';

export const PackCards = () => {
    let usersPack = useSelector<AppStateType, Array<PackType>>(state => state.packCards.packs)
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(GetPacksCards());
        // console.log('перерисовка списка колод')
    }, [])


    let [hideItemPanel, changeHide]=useState(true)
    const onShowHideClick=()=>{
        changeHide(!hideItemPanel)
    }
    const onAddClick=(requestData:CardsPackType)=>{
        debugger
        dispatch(AddPackCards(requestData))
    }








    let _id = useSelector<AppStateType, any>(state => state.loginPage._id)

    let UsersPackItems = usersPack.map(item => <UserPack key={item._id} item={item} />)

    return (
        <div className={'PackCards'}>
            PACK CARDS SHOP
            <header>
                <Input placeholder={'search cards'} value={''}/>
            </header>
            <main>
                <div style={{width: '100px', height: '60px'}}>
                    <button onClick={()=>dispatch(GetMyPackCards())}>ALL CARDS</button>
                    <button onClick={()=>dispatch(GetMyPackCards(_id))}>MY CARDS</button>
                </div>


                <div className={'table'}>
                    <div className={'navTable'}>
                        <div className={'item'}>
                            <div >USER ID</div>
                            <div className={'name'}>Pack name</div>
                            <div >USER NAME</div>
                            <div className={'grade'}>Grade</div>
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


