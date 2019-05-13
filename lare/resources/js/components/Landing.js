import React, { Component } from 'react';
import {Link} from 'react-router-dom';
export default class Landing extends Component {
    render(){
        return(
            <>
              <div class="jumbotron">
    <div class="container">
      <h1 class="display-3">Selamat Datang,</h1>
      <p>Ini adalah sistem administrasi input penduduk</p>
      <p><Link to="/login"><a class="btn btn-primary btn-lg" href="#" role="button">Lebih lanjut »</a></Link></p>
    </div>
  </div>
            </>
        );
    }

}