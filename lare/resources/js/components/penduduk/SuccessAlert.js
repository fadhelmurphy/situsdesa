import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class SuccessAlert extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <>
            <div class="alert alert-success" role="alert">
                {this.props.message}
            </div>
            <Redirect to='/dashboard/berita'/>
            </>
        );
    }
}

