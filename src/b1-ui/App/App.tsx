import React, {useEffect} from 'react';
import './App.scss';
import {TestPage} from "../../features/p0-test/TestPage";
import {Route, Switch} from 'react-router-dom';
import {LoginPage} from '../../features/p1-auth/LoginPage';
import {RegPage} from "../../features/p2-RegPage/RegPage";
import {RecoveryPage} from '../../features/p3-RecoveryPage/RecoveryPage';
import {ChangePasswordPage} from "../../features/p4-ChangePassPage/ChangePassPage";
import {ProfilePage} from "../../features/p5-ProfilePage/ProfilePage";
import {NavMenu} from '../header/NavMenu';
import {useDispatch} from "react-redux";
import {Autorization} from '../../b2-bll/LoginPageReducer';
import {PackCards} from "../../features/p6-PackCards/PackCards";
import { ListCardsPack } from '../../features/p7-ListCardsPack/ListCardsPack';

const App = () => {
    const dispatch = useDispatch();

    useEffect(
        () => {
            dispatch(Autorization())
        },[])

    return (
        <div className="App">
            <NavMenu/>
            <div className='container'>
                <Switch>
                    <Route path={'/test'} component={TestPage}/>
                    <Route path={'/login'} component={LoginPage}/>
                    <Route path={'/registration'} component={RegPage}/>
                    <Route path={'/recovery-password'} component={RecoveryPage}/>
                    <Route path={'/change-password'} component={ChangePasswordPage}/>
                    <Route path={'/profile'} component={ProfilePage}/>
                    <Route path={'/pack-cards'} component={PackCards}/>
                    <Route path={'/list-cards-pack/:id?'} render={() => <ListCardsPack/>}/>
                    {/*<Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>*/}


                    <Route path={'/eror'} render={() => <div>404 NOT FOUND </div>}/>
                    <Route exact path={'/'} component={ProfilePage}/>
                </Switch>
            </div>
        </div>
    );
}

export default App;
