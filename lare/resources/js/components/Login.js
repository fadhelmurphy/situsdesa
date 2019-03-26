import React, { Component } from 'react';
import Axios from 'axios'
export default class Login extends Component{
    constructor(props){
        super(props)
        this.onSubmit =this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            email:'sa-admin@test.com',
            password:'12345'
        }
    }
    handleChange(e){
        console.log(JSON.parse(window.localStorage.getItem('authUser'))['access_token'])
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
            client_secret:'mkFvhWvf0opRhdKurumskDUwlb65nDbfyOG7wn76',
            username:this.state.email,
            password:this.state.password,
            scope:''
               
          }
        const authUser={}
        axios.post('http://localhost:8000/oauth/token', postData).then(
            res=>{
              if(res.status===200){
                authUser.access_token=res.data.access_token
                authUser.refresh_token=res.data.refresh_token
                window.localStorage.setItem('authUser',JSON.stringify(authUser))
                const header ={
                    'Content-Type':'application/json',
                    'Authorization':'Bearer '+ res.data.access_token
                }
                axios.get('http://localhost:8000/api/user', {headers:header})
                .then(res=>{
                  authUser.email=res.data.email
                  authUser.name=res.data.name
                  window.localStorage.setItem('authUser', JSON.stringify(authUser))
                })
                .catch(err=>console.log('error'))
              }
            //   if(res.status===401){
            //     console.log('gk diizinkan')
            //   }
            }
          ).catch(err=>{
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
        return(
          <>
            {/* <div>
                <form>
                    <input type="text"placeholder="input" onChange={this.handleChange} name="email"value={this.state.email}/>    
                </form>
            </div> */}
        <div class="auth-wrapper d-flex no-block justify-content-center align-items-center bg-dark">
            <div class="auth-box bg-dark border-top border-secondary">
                <div id="loginform">
                    <div class="text-center p-t-20 p-b-20">
                        <span class="db"><img src="matrix/assets/images/logo.png" alt="logo" /></span>
                    </div>
                    <form class="form-horizontal m-t-20" id="loginform" onSubmit={this.onSubmit}>
                        <div class="row p-b-30 mt-3">
                            <div class="col-12">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text bg-success text-white" id="basic-addon1"><i class="ti-user"></i></span>
                                    </div>
                                    <input type="text" class="form-control form-control-lg" name="email" value={this.state.email}  onChange={this.handleChange}placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" required/>
                                </div>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text bg-warning text-white" id="basic-addon2"><i class="ti-pencil"></i></span>
                                    </div>
                                    <input type="password" name="password" value={this.state.password}  onChange={this.handleChange} class="form-control form-control-lg" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" required/>
                                </div>
                            </div>
                        </div>
                        <div class="row border-top border-secondary">
                            <div class="col-12">
                                <div class="form-group mt-3">
                                    <div class="p-t-20">
                                        <button class="btn btn-info" id="to-recover" type="button"><i class="fa fa-lock m-r-5"></i> Lost password?</button>
                                        <button class="btn btn-success float-right" type="submit">Login</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div id="recoverform">
                    <div class="text-center">
                        <span class="text-white">Enter your e-mail address below and we will send you instructions how to recover a password.</span>
                    </div>
                    <div class="row m-t-20">
                        <form class="col-12" action="index.html">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text bg-danger text-white" id="basic-addon1"><i class="ti-email"></i></span>
                                </div>
                                <input type="text" class="form-control form-control-lg" placeholder="Email Address" aria-label="Username" aria-describedby="basic-addon1"/>
                            </div>
                            <div class="row m-t-20 p-t-20 border-top border-secondary">
                                <div class="col-12">
                                    <a class="btn btn-success" href="#" id="to-login" name="action">Back To Login</a>
                                    <button class="btn btn-info float-right" type="button" name="action">Recover</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
            {/* <div class="text-center">
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