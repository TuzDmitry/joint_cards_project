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
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../b2-bll/store";

const App = () => {



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
                    <Route path={'/eror'} render={() => <div>404 NOT FOUND </div>}/>
                </Switch>
            </div>
        </div>
    );
}

export default App;
