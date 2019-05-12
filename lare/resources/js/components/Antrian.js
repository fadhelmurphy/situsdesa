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
             <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarsExampleDefault">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#">Disabled</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
        <div class="dropdown-menu" aria-labelledby="dropdown01">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"/>
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav>
<main role="main">

  <div class="jumbotron">
    <div class="container">
            <h1 className="text-center">Antrian</h1>
            <p>
            <div style={kotak} onClick={this.daftar} className="bg-info text-white d-flex justify-content-center align-items-center">{this.state.no_antrian} </div>
            </p>
            <p>
            <button type="button" onClick={this.daftar} class="btn btn-cyan btn-lg btn-block">+ Daftar</button>
            </p>
            </div>
            </div>
            </main>
            </>
        )
        
    }
}