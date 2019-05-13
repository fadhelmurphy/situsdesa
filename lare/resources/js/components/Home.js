import React, { Component } from 'react';

import {Link, Route} from 'react-router-dom';

import Daftar from './Daftar'
import Antrian from './Antrian'
import Landing from './Landing'
import About from './About'
// import { Provider, Heading, Subhead } from 'rebass'
// import {
//   Hero, CallToAction, ScrollDownIndicator
// } from 'react-landing-page'
export default class Home extends Component {
    render() {
        return (
            <>
               <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
  <Link class="navbar-brand" to="/">Sistem Administrasi</Link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarsExampleDefault">
    <ul class="navbar-nav mr-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard/about">About Us</Link>
                  </li>
                  <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Berita</a>
        <div class="dropdown-menu" aria-labelledby="dropdown01">
        <Link to="/dashboard/berita" class="dropdown-item">Lihat list</Link>
        <Link to="/dashboard/berita/add" class="dropdown-item">Tambah</Link>
        </div>
      </li>
                  <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Penduduk</a>
        <div class="dropdown-menu" aria-labelledby="dropdown01">
        <Link to="/dashboard/penduduk" class="dropdown-item">Lihat list</Link>
        <Link to="/dashboard/penduduk" class="dropdown-item">Tambah</Link>
        </div>
      </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/antrian">Antrian</Link>
                  </li>
    </ul>
    <div class="form-inline my-2 my-lg-0">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
      <Link className="nav-link" to="/login">Login</Link>
      </li>
      </ul>
    </div>
  </div>
</nav>
<main role="main">
      <Route exact path="/" component={Landing}></Route>
  <div class="container">
      <Route exact path="/antrian" component={Antrian}></Route>
      <Route exact path="/daftar" component={Daftar}></Route>
      {/* <Route exact path="/dashboard/berita" acc={this.state.auth} component={Berita}></Route> */}
    </div>

</main>
            </>
        );
    }
}

