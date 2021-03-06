import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Login from './Login';
import Footer from './Footer';
import Home from './Home';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

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
        
        //An array of assets
    let links = [
        { src: "https://fonts.googleapis.com/css?family=Nunito:200,600" },
        { src: "/matrix/assets/libs/flot/css/float-chart.css" },
        { src: "/matrix/assets/libs/select2/dist/css/select2.min.css" },
        { src: "/matrix/assets/libs/jquery-minicolors/jquery.minicolors.css" },
        { src: "/matrix/assets/libs/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css" },
        { src: "/matrix/assets/libs/quill/dist/quill.snow.css" },
        { src: "/matrix/dist/css/style.min.css" },
    ]
    //Append the script element on each iteration
    links.map(item => { 
        const link = document.createElement("link")
        link.href = item.src
        link.rel = 'stylesheet'
        link.type = 'text/css'
        link.async = true
        link.className = 'dashboard'
        document.body.appendChild(link)
    })
    }
    render() {
        return (
            <div id="main-wrapper" data-sidebartype="full" className="">
            <Switch>
            {/* <Route exact path='/haha'  render={(props) => <Login {...props} acc={this.state.acc} akun={this.state.akun} />} /> */}
            
            <Route exact path="/login" name1={"halo"} component={Login}></Route>
            <Route path="/dashboard" component={Header}></Route>
            <Route path="/" component={Home}></Route>
            
            </Switch>
            </div>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<Router><Index /></Router>, document.getElementById('app'));
}
