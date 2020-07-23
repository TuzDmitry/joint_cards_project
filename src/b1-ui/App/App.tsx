import React from 'react';
import './App.scss';
import {TestPage} from "../../features/p0-test/TestPage";
import { Route, Switch } from 'react-router-dom';
import { LoginPage } from '../../features/p1-auth/LoginPage';
import {RegPage} from "../../features/p2-RegPage/RegPage";
import { RecoveryPage } from '../../features/p3-RecoveryPage/RecoveryPage';
import {ChangePasswordPage} from "../../features/p4-ChangePassPage/ChangePassPage";
import {ProfilePage} from "../../features/p5-ProfilePage/ProfilePage";
import { NavMenu } from '../header/NavMenu';

const App=()=> {
  return (
    <div className="App">
        <NavMenu/>
        <Switch>
            <Route path={'/test'} component={TestPage}/>
            <Route path={'/login'} component={LoginPage}/>
            <Route path={'/registration'} component={RegPage}/>
            <Route path={'/recovery-password'} component={RecoveryPage}/>
            <Route path={'/change-password'} component={ChangePasswordPage}/>
            <Route path={'/profile'} component={ProfilePage}/>
            <Route  path={'*'} render={() => <div>404 NOT FOUND </div>}/>
        </Switch>

        {/*<Switch>*/}
        {/*    <Route path={'/counter'} render={() => <Counter/> } />*/}
        {/*    <Route path={'/settings'} render={() => <CounterSettings/> }/>*/}
        {/*    <Redirect exact path={'/'} to={'/counter'}/>*/}
        {/*    <Route  path={'*'} render={() => <div>404 NOT FOUND </div>}/>*/}
        {/*</Switch>*/}

    </div>
  );
}

export default App;
