import React, { Component } from 'react';

import {Link, Route} from 'react-router-dom';

import Antrian from './front/Antrian'
import Blog from './front/Blog'
import Read from './front/Read'
import Landing from './Landing'
import About from './About'
// import { Provider, Heading, Subhead } from 'rebass'
// import {
//   Hero, CallToAction, ScrollDownIndicator
// } from 'react-landing-page'

export default class Home extends Component {
    render() {
      const jumbo = {
        background:'linear-gradient(40deg,#45cafc,#303f9f)'
      }
        return (
            <>

<main role="main">
<div className="jumbotron jumbotron-fluid" style={jumbo}>
  <div className="container align-items-center">
  <nav className="navbar navbar-expand-lg navbar-light bg-light rounded">
  <Link className="navbar-brand" to="/">Sistem Administrasi</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarsExampleDefault">
    <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard/about">About Us</Link>
                  </li>
                  <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Berita</a>
        <div className="dropdown-menu" aria-labelledby="dropdown01">
        <Link to="/dashboard/berita" className="dropdown-item">Lihat list</Link>
        <Link to="/dashboard/berita/add" className="dropdown-item">Tambah</Link>
        </div>
      </li>
                  <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Penduduk</a>
        <div className="dropdown-menu" aria-labelledby="dropdown01">
        <Link to="/dashboard/penduduk" className="dropdown-item">Lihat list</Link>
        <Link to="/dashboard/penduduk" className="dropdown-item">Tambah</Link>
        </div>
      </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/antrian">Antrian</Link>
                  </li>
    </ul>
    <div className="form-inline my-2 my-lg-0">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
      <Link className="nav-link" to="/login">Login</Link>
      </li>
      </ul>
    </div>
  </div>
</nav>
      
<div className="row mt-md-5">
            
            <div className="col">
            <div className="blockquote text-center text-light">
      <h1 className="display-3">Selamat Datang,</h1>
      <p>Ini adalah aplikasi sistem administrasi desa</p>
      <p><Link to="/login"><a className="btn btn-outline-light" href="#" role="button">Lebih lanjut »</a></Link></p>
      </div>
            </div>
            </div>
      {/* <Route exact path="/dashboard/berita" acc={this.state.auth} component={Berita}></Route> */}
    </div>
    </div>
    <div className="jumbotron jumbotron-fluid bg-transparent">
  <div className="container align-items-center">
    <Route exact path="/antrian" component={Antrian}></Route>
    <Route exact path="/" component={Blog}></Route>
    <Route exact path="/blog/:id" component={Read}></Route>
      </div>
      </div>
</main>
            </>
        );
    }
}

