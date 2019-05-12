import React, { Component } from 'react';
import Home from './Home';
import About from './About';
import Berita from './berita/Index';
import Penduduk from './penduduk/Index';
import {Link, Route, Redirect} from 'react-router-dom';
const a={
    cursor:'pointer'
}

export default class Header extends Component {
    constructor(){
        super();
        this.onLogout =this.onLogout.bind(this);
        this.state = {
            redirect:false,
            auth:false,
            isLoad:true,
            user:null
        };
    }
    componentWillMount(){
        var token=JSON.parse(window.localStorage.getItem('authUser'))
        if(token !=null){
            const header ={
                'Accept':'application/json',
                'Authorization':'Bearer '+ token.access_token
            }
            axios.get('http://localhost:8000/api/user', {headers:header})
            .then(res=>{
                // console.log(res.data)
                this.setState({auth:true,isLoad:false,user:res.data})
            }).catch(error=>{
                if(error.response.status===401){
                    window.localStorage.removeItem('authUser')        
                    this.setState({redirect:true})
                }
            })
        }else{
            this.setState({isLoad:false})
        }

    }

    componentDidMount(){
                    //An array of assets
    let scripts = [
        { src: "/matrix/assets/libs/jquery/dist/jquery.min.js" },
        { src: "/matrix/assets/libs/popper.js/dist/umd/popper.min.js" },
        { src: "/matrix/assets/libs/bootstrap/dist/js/bootstrap.min.js" },
        { src: "/matrix/assets/libs/perfect-scrollbar/dist/perfect-scrollbar.jquery.min.js" },
        { src: "/matrix/assets/extra-libs/sparkline/sparkline.js" },
        { src: "/matrix/dist/js/waves.js" },
        { src: "/matrix/dist/js/sidebarmenu.js" },
        { src: "/matrix/dist/js/custom.min.js" },
        { src: "/matrix/assets/libs/flot/excanvas.js" },
        { src: "/matrix/assets/libs/flot/jquery.flot.js" },
        { src: "/matrix/assets/libs/flot/jquery.flot.pie.js" },
        { src: "/matrix/assets/libs/flot/jquery.flot.time.js" },
        { src: "/matrix/assets/libs/flot/jquery.flot.stack.js" },
        { src: "/matrix/assets/libs/flot/jquery.flot.crosshair.js" },
        { src: "/matrix/assets/libs/flot.tooltip/js/jquery.flot.tooltip.min.js" },
        { src: "/matrix/dist/js/pages/chart/chart-page-init.js" },
    ]
    //Append the script element on each iteration
    scripts.map(item => { 
        const script = document.createElement("script")
        script.src = item.src
        script.async = true
        script.className = 'penduduk'
        document.body.appendChild(script)
    })
    
    }

    onLogout(e){
        var token=JSON.parse(window.localStorage.getItem('authUser'))
        if(token !=null){
            window.localStorage.removeItem('authUser')
            this.setState({redirect:true})
        }
    }
    render() {
        if(this.state.redirect){
            return <Redirect to='/login'/>;
        }
        if(this.state.isLoad) return null
        let buttonLogout
        if(this.state.auth){
            buttonLogout=(
                <>
                <li className="nav-item">
                    <a className="nav-link" style={a} onClick={this.onLogout}>Log out</a>
                </li>
                </>
                )
        }
        return (
            <div>
            <header className="topbar" data-navbarbg="skin5">
            <nav className="navbar top-navbar navbar-expand-md navbar-dark">
            <div className="navbar-header" data-logobg="skin5">
            <a className="nav-toggler waves-effect waves-light d-block d-md-none" href="javascript:void(0)"><i className="ti-menu ti-close"></i></a>
            <a className="navbar-brand" href="index.html">
                <b className="logo-icon p-l-10">
                    <img src="/matrix/assets/images/logo-icon.png" alt="homepage" className="light-logo"/>

                </b>
                <span className="logo-text">
                     <img src="/matrix/assets/images/logo-text.png" alt="homepage" className="light-logo"/>

                </span>
            </a>
            <a className="topbartoggler d-block d-md-none waves-effect waves-light" href="javascript:void(0)" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><i className="ti-more"></i></a>
        </div>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav float-left mr-auto">
                  <li className="nav-item d-none d-md-block">
                    <a className="nav-link sidebartoggler waves-effect waves-light" href="javascript:void(0)" data-sidebartype="mini-sidebar">
                        <i className="mdi mdi-menu font-24"></i>
                    </a>
                  </li>
                  <li className="nav-item active">
                    <Link className="nav-link" to="/">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/about">About Us</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard/berita">Berita</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard/penduduk">Penduduk</Link>
                  </li>
                  {buttonLogout}
                  {/* <li className="nav-item">
                    <a className="nav-link" href="#">Logout</a>
                  </li> */}
                </ul>
              </div>
            </nav>
            </header>
            <aside className="left-sidebar" data-sidebarbg="skin5">

            <div className="scroll-sidebar">

                <nav className="sidebar-nav">
                    <ul id="sidebarnav" className="p-t-30">
                        {/* <li className="sidebar-item"> <a className="sidebar-link waves-effect waves-dark sidebar-link" href="index.html" aria-expanded="false"><i className="mdi mdi-view-dashboard"></i><span className="hide-menu">Dashboard</span></a></li>
                        <li className="sidebar-item"> <a className="sidebar-link waves-effect waves-dark sidebar-link" href="charts.html" aria-expanded="false"><i className="mdi mdi-chart-bar"></i><span className="hide-menu">Charts</span></a></li>
                        <li className="sidebar-item"> <a className="sidebar-link waves-effect waves-dark sidebar-link" href="widgets.html" aria-expanded="false"><i className="mdi mdi-chart-bubble"></i><span className="hide-menu">Widgets</span></a></li>
                        <li className="sidebar-item"> <a className="sidebar-link waves-effect waves-dark sidebar-link" href="tables.html" aria-expanded="false"><i className="mdi mdi-border-inside"></i><span className="hide-menu">Tables</span></a></li>
                        <li className="sidebar-item"> <a className="sidebar-link waves-effect waves-dark sidebar-link" href="grid.html" aria-expanded="false"><i className="mdi mdi-blur-linear"></i><span className="hide-menu">Full Width</span></a></li> */}
                        <li className="sidebar-item"> <Link className="sidebar-link waves-effect waves-dark sidebar-link" to="/"><i className="mdi mdi-view-dashboard"></i><span className="hide-menu">Dashboard</span></Link></li>
                        <li className="sidebar-item"> <Link className="sidebar-link waves-effect waves-dark sidebar-link" to="/dashboard/penduduk"><i className="mdi mdi-face"></i><span className="hide-menu">Penduduk</span></Link></li>
                        <li className="sidebar-item"> <Link className="sidebar-link waves-effect waves-dark sidebar-link" to="/dashboard/berita"><i className="mdi mdi-receipt"></i><span className="hide-menu">Berita</span></Link></li>
                        
                        {/* <li className="sidebar-item"> <a className="sidebar-link has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false"><i className="mdi mdi-receipt"></i><span className="hide-menu">Forms </span></a>
                            <ul aria-expanded="false" className="collapse  first-level">
                                <li className="sidebar-item"><a href="form-basic.html" className="sidebar-link"><i className="mdi mdi-note-outline"></i><span className="hide-menu"> Form Basic </span></a></li>
                                <li className="sidebar-item"><a href="form-wizard.html" className="sidebar-link"><i className="mdi mdi-note-plus"></i><span className="hide-menu"> Form Wizard </span></a></li>
                            </ul>
                        </li>
                        <li className="sidebar-item"> <a className="sidebar-link waves-effect waves-dark sidebar-link" href="pages-buttons.html" aria-expanded="false"><i className="mdi mdi-relative-scale"></i><span className="hide-menu">Buttons</span></a></li>
                        <li className="sidebar-item"> <a className="sidebar-link has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false"><i className="mdi mdi-face"></i><span className="hide-menu">Icons </span></a>
                            <ul aria-expanded="false" className="collapse  first-level">
                                <li className="sidebar-item"><a href="icon-material.html" className="sidebar-link"><i className="mdi mdi-emoticon"></i><span className="hide-menu"> Material Icons </span></a></li>
                                <li className="sidebar-item"><a href="icon-fontawesome.html" className="sidebar-link"><i className="mdi mdi-emoticon-cool"></i><span className="hide-menu"> Font Awesome Icons </span></a></li>
                            </ul>
                        </li>
                        <li className="sidebar-item"> <a className="sidebar-link waves-effect waves-dark sidebar-link" href="pages-elements.html" aria-expanded="false"><i className="mdi mdi-pencil"></i><span className="hide-menu">Elements</span></a></li>
                        <li className="sidebar-item"> <a className="sidebar-link has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false"><i className="mdi mdi-move-resize-variant"></i><span className="hide-menu">Addons </span></a>
                            <ul aria-expanded="false" className="collapse  first-level">
                                <li className="sidebar-item"><a href="index2.html" className="sidebar-link"><i className="mdi mdi-view-dashboard"></i><span className="hide-menu"> Dashboard-2 </span></a></li>
                                <li className="sidebar-item"><a href="pages-gallery.html" className="sidebar-link"><i className="mdi mdi-multiplication-box"></i><span className="hide-menu"> Gallery </span></a></li>
                                <li className="sidebar-item"><a href="pages-calendar.html" className="sidebar-link"><i className="mdi mdi-calendar-check"></i><span className="hide-menu"> Calendar </span></a></li>
                                <li className="sidebar-item"><a href="pages-invoice.html" className="sidebar-link"><i className="mdi mdi-bulletin-board"></i><span className="hide-menu"> Invoice </span></a></li>
                                <li className="sidebar-item"><a href="pages-chat.html" className="sidebar-link"><i className="mdi mdi-message-outline"></i><span className="hide-menu"> Chat Option </span></a></li>
                            </ul>
                        </li>
                        <li className="sidebar-item"> <a className="sidebar-link has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false"><i className="mdi mdi-account-key"></i><span className="hide-menu">Authentication </span></a>
                            <ul aria-expanded="false" className="collapse  first-level">
                                <li className="sidebar-item"><a href="authentication-login.html" className="sidebar-link"><i className="mdi mdi-all-inclusive"></i><span className="hide-menu"> Login </span></a></li>
                                <li className="sidebar-item"><a href="authentication-register.html" className="sidebar-link"><i className="mdi mdi-all-inclusive"></i><span className="hide-menu"> Register </span></a></li>
                            </ul>
                        </li>
                        <li className="sidebar-item"> <a className="sidebar-link has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false"><i className="mdi mdi-alert"></i><span className="hide-menu">Errors </span></a>
                            <ul aria-expanded="false" className="collapse  first-level">
                                <li className="sidebar-item"><a href="error-403.html" className="sidebar-link"><i className="mdi mdi-alert-octagon"></i><span className="hide-menu"> Error 403 </span></a></li>
                                <li className="sidebar-item"><a href="error-404.html" className="sidebar-link"><i className="mdi mdi-alert-octagon"></i><span className="hide-menu"> Error 404 </span></a></li>
                                <li className="sidebar-item"><a href="error-405.html" className="sidebar-link"><i className="mdi mdi-alert-octagon"></i><span className="hide-menu"> Error 405 </span></a></li>
                                <li className="sidebar-item"><a href="error-500.html" className="sidebar-link"><i className="mdi mdi-alert-octagon"></i><span className="hide-menu"> Error 500 </span></a></li>
                            </ul>
                        </li> */}
                    </ul>
                </nav>

            </div>

        </aside>
            <div className="page-wrapper">
                <div className="container-fluid">
                    <Link to="/">Home</Link>
                    <Link to="/about">About Us</Link>
                    <div className="row">
                    <div className="col-md-12">
                        <Route exact path="/" component={Home}></Route>
                        <Route exact path="/about" component={About}></Route>
                        {/* <Route exact path="/dashboard/berita" acc={this.state.auth} component={Berita}></Route> */}
                        <Route exact path='/dashboard/berita'  render={(props) => <Berita {...props} user={this.state.user} auth={this.state.auth}/>} />
                        <Route exact path="/dashboard/berita/add" component={Berita}></Route>
                        <Route exact path="/dashboard/berita/edit/:id" component={Berita}></Route>
                        <Route exact path="/dashboard/penduduk" component={Penduduk}></Route>
                        <Route exact path="/dashboard/penduduk/add" component={Penduduk}></Route>
                        <Route exact path="/dashboard/penduduk/edit/:id" component={Penduduk}></Route>
                    </div>
                    
                </div>
                </div>
            </div>
            </div>
        );
    }
}

