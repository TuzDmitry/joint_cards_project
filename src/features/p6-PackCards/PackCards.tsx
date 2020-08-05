import React, {useEffect} from 'react';
import {Input} from '../../b1-ui/common/input/Input';
import {GetPackCards} from '../../b2-bll/PackCardsReducer';
import {useDispatch, useSelector} from 'react-redux';
import './PackCards.scss'
import {UserPack} from './UserPack';
import {AppStateType} from '../../b2-bll/store';
import {PackType} from '../../b3-dal/api';

export const PackCards = () => {

    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(GetPackCards())
        // console.log('перерисовка списка колод')
    }, [])

    let usersPack = useSelector<AppStateType, Array<PackType>>(state => state.packCards.cards)
    let UsersPackItems = usersPack.map(item => <UserPack key={item.user_id} item={item}/>)

    return (
        <div className={'PackCards'}>
            PACK CARDS SHOP
            <header>
                <Input placeholder={'search cards'} value={''}/>
            </header>
            <main>
                <div className={'table'}>
                    <div className={'navTable'}>
                        <div className={'item'}>
                            <div >USER ID</div>
                            <div className={'name'}>Name</div>
                            <div >USER NAME</div>
                            <div className={'grade'}>Crade</div>
                            <div>
                                <button className={'butTable'}>add</button>
                            </div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                    <div className={'itemsContainer'}>
                       {UsersPackItems}
                    </div>
                </div>

            </main>
            <footer>
Здесь будет пагинация
            </footer>
        </div>
    )
}


