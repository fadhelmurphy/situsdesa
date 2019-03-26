import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Footer from './Footer';
import Login from './Login';
import Daftar from './Daftar'
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';

export default class Index extends Component {
    render() {
        return (
            <div id="main-wrapper" data-sidebartype="full" class="">
            <Switch>
            <Route exact path="/login" component={Login}></Route>
            <Route path="/" component={Header}></Route>
            <Route path="/daftar" component={Daftar}></Route>
            </Switch>
            </div>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<Router><Index /></Router>, document.getElementById('app'));
}
