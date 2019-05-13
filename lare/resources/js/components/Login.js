import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import axios from 'axios'
export default class Login extends Component{
    constructor(props){
        super(props)
        this.onSubmit =this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            email:'',
            password:'',
            redirect:false,
            secret:null
        }
        
    }
    
    componentWillMount(){
        var acc=JSON.parse(window.localStorage.getItem('authUser'))
        if(acc !=null){
            const header ={
                'Accept':'application/json',
                'Authorization':'Bearer '+ acc.access_token
            }
            axios.get('/api/user', {headers:header})
            .then(res=>{
                // console.log(res)
                this.setState({redirect:true})    
                return
            })
            .catch(err=>{
                console.log(err.response)
                    // this.setState({redirect:false})
                // }
            })
        }
        // }else{
            axios.get('/api/key')
            .then(res=>{
                console.log(res.data.secret)
                this.setState({secret:res.data.secret})
            })
        // }
        const script2 = document.createElement("script")
        script2.innerHTML = `

        $('[data-toggle="tooltip"]').tooltip();
        $(".preloader").fadeOut();
        // ============================================================== 
        // Login and Recover Password 
        // ============================================================== 
        $('#to-recover').on("click", function() {
            $("#loginform").slideUp();
            $("#recoverform").fadeIn();
        });
        $('#to-login').click(function(){
            
            $("#recoverform").hide();
            $("#loginform").fadeIn();
        });
        `
        script2.async = true
        script2.className = 'berita'
        document.body.appendChild(script2)
    }
    handleChange(e){
        // console.log(JSON.parse(window.localStorage.getItem('authUser'))['access_token'])
        if(e.target.name=='email'){
            this.setState({email: e.target.value});
        }else if(e.target.name='password'){
            this.setState({password: e.target.value});
        }
    }
    onSubmit(e){
        e.preventDefault()
        if(this.state.email=='' || this.state.password==''){
            return console.log('kosong') 
        }
          const postData={
            grant_type:'password',
            client_id:'2',
            client_secret:this.state.secret,
            // client_secret:'bkieyVQnUsmzHTiuTDTJOGsZtScjwYBglChCJerH',
            username:this.state.email,
            password:this.state.password,
            scope:''
               
          }
        const authUser={}
        axios.post('/oauth/token', postData).then(
            res=>{
              if(res.status===200){
                authUser.access_token=res.data.access_token
                authUser.refresh_token=res.data.refresh_token
                window.localStorage.setItem('authUser',JSON.stringify(authUser))
                // console.log('token',res.data)
                const header ={
                    'Content-Type':'application/json',
                    'Authorization':'Bearer '+ res.data.access_token
                }
                axios.get('/api/user', {headers:header})
                .then(res=>{
                    // console.log('user',res.data)
                  authUser.email=res.data.email
                  authUser.name=res.data.name
                  window.localStorage.setItem('authUser', JSON.stringify(authUser))
                    this.setState({redirect:true})

                })
                .catch(err=>console.log('error'))
              }
            //   if(res.status===401){
            //     console.log('gk diizinkan')
            //   }
            
        }).catch(err=>{
            if(err.response.status===401){
            //   console.log(err.response)
              console.log('Your email or password is wrong')
            }
            if(err.response.status===500){
              
              console.log('server has been problem')
            }
            console.log(err)
    
          })
        
    }
    render(){
        if(this.state.redirect){
            return <Redirect to='/dashboard'/>;
        }else{
            return(
                <>
                  {/* <div>
                      <form>
                          <input type="text"placeholder="input" onChange={this.handleChange} name="email"value={this.state.email}/>    
                      </form>
                  </div> */}
              <div className="auth-wrapper d-flex no-block justify-content-center align-items-center bg-dark">
                  <div className="auth-box bg-dark border-top border-secondary">
                      <div id="loginform">
                          <div className="text-center p-t-20 p-b-20">
                              <span className="db"><img src="matrix/assets/images/logo.png" alt="logo" /></span>
                          </div>
                          <form className="form-horizontal m-t-20" id="loginform" onSubmit={this.onSubmit}>
                              <div className="row p-b-30 mt-3">
                                  <div className="col-12">
                                      <div className="input-group mb-3">
                                          <div className="input-group-prepend">
                                              <span className="input-group-text bg-success text-white" id="basic-addon1"><i className="ti-user"></i></span>
                                          </div>
                                          <input type="text" className="form-control form-control-lg" name="email" value={this.state.email}  onChange={this.handleChange}placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" required/>
                                      </div>
                                      <div className="input-group mb-3">
                                          <div className="input-group-prepend">
                                              <span className="input-group-text bg-warning text-white" id="basic-addon2"><i className="ti-pencil"></i></span>
                                          </div>
                                          <input type="password" name="password" value={this.state.password}  onChange={this.handleChange} className="form-control form-control-lg" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" required/>
                                      </div>
                                  </div>
                              </div>
                              <div className="row border-top border-secondary">
                                  <div className="col-12">
                                      <div className="form-group mt-3">
                                          <div className="p-t-20">
                                              <button className="btn btn-info" id="to-recover" type="button"><i className="fa fa-lock m-r-5"></i> Lost password?</button>
                                              <button className="btn btn-success float-right" type="submit">Login</button>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </form>
                      </div>
                      <div id="recoverform">
                          <div className="text-center">
                              <span className="text-white">Enter your e-mail address below and we will send you instructions how to recover a password.</span>
                          </div>
                          <div className="row m-t-20">
                              <form className="col-12" action="index.html">
                                  <div className="input-group mb-3">
                                      <div className="input-group-prepend">
                                          <span className="input-group-text bg-danger text-white" id="basic-addon1"><i className="ti-email"></i></span>
                                      </div>
                                      <input type="text" className="form-control form-control-lg" placeholder="Email Address" aria-label="Username" aria-describedby="basic-addon1"/>
                                  </div>
                                  <div className="row m-t-20 p-t-20 border-top border-secondary">
                                      <div className="col-12">
                                          <a className="btn btn-success" href="#" id="to-login" name="action">Back To Login</a>
                                          <button className="btn btn-info float-right" type="button" name="action">Recover</button>
                                      </div>
                                  </div>
                              </form>
                          </div>
                      </div>
                  </div>
              </div>
                  {/* <div className="text-center">
                  <hr/>
                  <form onSubmit={this.onSubmit}>
                  <h1 class="h3 mb-3 font-weight-normal">Login</h1>
                      <label for="inputEmail" class="sr-only">Email address</label>
                      <input name="email" type="email" id="inputEmail" value={this.state.email}class="form-control" placeholder="Email address"/>
                      <label for="inputPassword" class="sr-only" >Password</label>
                      <input name="password" type="password" id="inputPassword" value={this.state.password} class="form-control" placeholder="Password"  required/>
                      
                      
      
                      <button class="btn btn-lg btn-primary btn-block" type="submit" >Login</button>
                      <p class="mt-5 mb-3 text-muted">&copy; 2018</p>
                  </form>
                  
                  </div> */}
                </>
              );
        }
        
    }
}