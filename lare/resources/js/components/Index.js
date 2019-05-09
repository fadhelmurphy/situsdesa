import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Footer from './Footer';
import Login from './Login';
import Daftar from './Daftar'
import Home from './Home';
import Antrian from './Antrian'
import AdminAntrian from './AdminAntrian'
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
window.$ = window.jQuery = require('jquery');

export default class Index extends Component {
    constructor(props){
        super(props)
        this.state={
            // acc:'',
            // redirect:false,
            // akun:false
        }
        
    }
    // componentWillMount() {
    //     console.log('Component WILL MOUNT!')
    //  }
  
    componentWillMount(){
        
        // console.log(acc)
    }
    render() {
        return (
            <div id="main-wrapper" data-sidebartype="full" className="">
            <Switch>
            <Route exact path="/login" name1={"halo"} component={Login}></Route>
            {/* <Route exact path='/haha'  render={(props) => <Login {...props} acc={this.state.acc} akun={this.state.akun} />} /> */}
            <Route exact path="/home" component={Home}></Route>
            <Route exact path="/daftar" component={Daftar}></Route>
            <Route exact path="/antrian" component={Antrian}></Route>
            <Route exact path="/admin-antrian" component={AdminAntrian}></Route>
            <Route path="/" component={Header}></Route>
            
            
            </Switch>
            </div>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<Router><Index /></Router>, document.getElementById('app'));
}
