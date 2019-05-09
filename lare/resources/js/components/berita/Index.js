import React, { Component } from 'react';
import {Link, Route} from 'react-router-dom';
import Listing from './Listing';
import Add from './Add';
import Edit from './Edit';

export default class Index extends Component {
    constructor(props){
		super(props);
		this.state = {
            news:[],
            alert_message:'',
            redirect:false,
            user:this.props.user,
            hak:0,
            auth:this.props.auth
        
        }
        // console.log(this.state)
	}
    render() {
        return (
            <>
                {/* <Route exact path="/dashboard/berita" component={Listing}/> */}
                <Route exact path='/dashboard/berita'  render={(props) => <Listing {...props} user={this.state.user} auth={this.state.auth}/>} />
                <Route exact path="/dashboard/berita/add" component={Add}/>
                <Route exact path="/dashboard/berita/edit/:id" component={Edit}/>
            </>
        );
    }
}

