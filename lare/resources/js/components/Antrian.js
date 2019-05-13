import React, { Component } from 'react';
import {Link, Route, Redirect} from 'react-router-dom';
import axios from 'axios'
import Pusher from 'pusher-js'
// import  from 'peer'
var kotak={
    width:'100px',
    height:'100px',
    margin:'0 auto',
    fontSize:'20px',
    cursor:'pointer'
}
export default class Antrian extends Component {
    constructor(props){
        super(props)
        this.daftar =this.daftar.bind(this);
        this.state={
            'no_antrian':0,
            'isLoad':true,
            'klik':false
        }
    }
    componentWillMount(){
        
        
        axios.get('/api/antrian-last')
        .then(res=>{
            this.setState({no_antrian:res.data.no_antrian+1, isLoad:false})
            // this.setState({nomor:res.data.no_antrian+1, isLoad:false})
            console.log(res.data)
        })
    }
    daftar(){
        if( this.state.klik) return console.log('double')
        this.setState({klik:true},function(e){
            // console.log(this.state)
            let no_antrian= this.state.no_antrian
            axios.post('/api/antrian-tambah',{no_antrian})
            .then(res=>{
                this.setState({'no_antrian':no_antrian+1})
                this.setState({klik:false})
                console.log(res)
            })
        })
        
    }
    render(){
        if(this.state.isLoad) return null
        return(
            <>
            <div class="jumbotron bg-transparent">
            <h1 className="text-center">Antrian</h1>
            <p>
            <div style={kotak} onClick={this.daftar} className="bg-info text-white d-flex justify-content-center align-items-center">{this.state.no_antrian} </div>
            </p>
            <p>
            <button type="button" onClick={this.daftar} class="btn btn-cyan btn-lg btn-block">+ Daftar</button>
            </p>
            </div>
            </>
        )
        
    }
}