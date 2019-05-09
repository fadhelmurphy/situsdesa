import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
const cont = {
    marginTop: '20px',
    // textAlign: 'center'
};
const label={
    fontSize:'18px'
}
const element={

}

export default class Daftar extends Component {
    constructor(props){
        super(props)
        this.updateInputValue= this.updateInputValue.bind(this);
        this.onSubmit =this.onSubmit.bind(this);
        this.state={
            redirect:false,
            rl:null,
            data:null,
            isLoad:true,
            el:[],
            email:'',
            name:'',
            password:'',
            role:'',
            error:{
                email:{
                    show:false,
                    message:[]
                },
                name:{
                    show:false,
                    message:[]
                },
                role:{
                    show:false,
                    message:[]
                },
                password:{
                    show:false,
                    message:[]
                }
            }
            
            // element:()
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
                console.log(res)
                this.setState({rl:res.data.role_id})
                axios.post('/api/list',{},{headers:header})
                .then(res=>{
                    this.setState({el:res.data, isLoad:false})
                })
                .catch(err=>{
                    if(err.response.status===401){
                        console.log(err.response)
                        // window.localStorage.removeItem('authUser')
                        // this.setState({redirect:true})
                        
                    }
                    console.log(err)
                        // this.setState({redirect:false})
                    // }
                })
                  
            })
            .catch(err=>{
                if(err.response.status===401){
                    console.log(err.response)
                    // window.localStorage.removeItem('authUser')
                    this.setState({redirect:true})
                    
                }
                console.log(err)
                    // this.setState({redirect:false})
                // }
            })
            
        }else{
            console.log(acc)
            this.setState({redirect:true})
        }
    }
    updateInputValue(evt){
        
        if(evt.target.name=='email'){
            this.setState({email:evt.target.value})
        }
        else if(evt.target.name=='role'){
            this.setState({role:evt.target.value})
        }
        else if(evt.target.name=='name'){
            this.setState({name:evt.target.value})
        }
        else if(evt.target.name=='password'){
            this.setState({password:evt.target.value})
        }
       
        // console.log(evt.target.value)
    }
    onSubmit(e){
         
        e.preventDefault()
        console.log(document.getElementsByClassName('message')[0])
        // document.getElementsByClassName('message').forEach(element => {
        //     console.log(element)
        // })
        if(document.getElementsByClassName('message').length!=0){
            for(let i=0;i<4;i++){
                console.log(document.getElementsByClassName('message')[1])
                document.getElementsByClassName('message')[i].innerHTML=''
                
            }
        }
          
        // if(this.state.email=='' || this.state.password==''||this.state.name==''||this.state.role==''){
        //     return console.log('kosong') 
        // }else{
            let postData={
                email:this.state.email,
                name:this.state.name,
                password:this.state.password,
                role:parseInt(this.state.role)
            }
            const token = JSON.parse(window.localStorage.getItem('authUser'))
            const header ={
                'Accept':'application/json',
                'Authorization':'Bearer '+ token.access_token
            }   
            axios.post('/api/daftar',postData,{headers:header})
            .then(res=>{
                console.log(res)
            })
            .catch(error=>{
                if(error.response.data.errors.email!=null){
                    const emai=this.state.error.email
                    error.response.data.errors.email.map((e,index)=>{
                        emai['message'].push(e)
                    })
                    emai['show']=true
                    this.setState({emai})
                    console.log(this.state.error.email)
                }
                if(error.response.data.errors.role!=null){
                    let rol=this.state.error.role
                    error.response.data.errors.role.map((e)=>{
                        rol['message'].push(e)
                    })
                    rol['show']=true
                    this.setState({rol})
                    console.log(this.state.error.role)
                    
                }
                if(error.response.data.errors.name!=null){
                    let nam=this.state.error.name
                    error.response.data.errors.name.map((e)=>{
                        nam['message'].push(e)
                    })
                    nam['show']=true
                    this.setState({nam})
                    console.log(this.state.error.name)
                    
                }
                if(error.response.data.errors.password!=null){
                    let pass=this.state.error.password
                    error.response.data.errors.password.map((e)=>{
                        pass['message'].push(e)
                    })
                    pass['show']=true
                    this.setState({pass})
                    console.log(this.state.error.password)
                }
                console.log(error.response.data.errors)
               
            });
        // }
    }
    render() {
        if(this.state.redirect){
            return <Redirect to='/dashboard/berita'/>;
        }
        let email=[]
        if(this.state.isLoad) return null
       
        return (
            <div>
                <div className="container" style={cont}>
                    <h1 className="text-center">Daftar Akun</h1>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label style={label}>Email</label>
                            <input className="form-control"value={this.state.email} onChange={this.updateInputValue} name="email"/>
                            <div className="message">
                                {this.state.error.email.show ?this.state.error.email.message.map((e,index)=>{
                                return (<span key={index} className="text-danger">{e}</span>)
                                }):''}
                            </div>
                           
                        </div>
                        <div className="form-group">
                            <label style={label}>Nama</label>
                            <input className="form-control" value={this.state.name} onChange={this.updateInputValue} name="name"/>
                            <div className="message">
                                {this.state.error.name.show ?this.state.error.name.message.map((e,index)=>{
                                return (<span key={index} className="text-danger">{e}</span>)
                            }):''}
                            </div>
                            
                        </div>
                        <div className="form-group">
                            <label style={label}>Password</label>
                            <input type="password" className="form-control" value={this.state.password} onChange={this.updateInputValue}name="password"/>
                            <div className="message">
                                {this.state.error.password.show ?this.state.error.password.message.map((e,index)=>{
                                return (<span key={index} className="text-danger">{e}</span>)
                            }):''}
                            </div>
                            
                        </div>
                        
                        <div className="form-group">
                            <label>Tingkat hak akses</label>
                            
                            <select className="form-control" name="role" onChange={this.updateInputValue}>
                            <option>Pilih</option>
                            {this.state.el.map((e,index) => {
                                return (<option value={e.id} key={index} >{e.keterangan}</option>)
                            })}
                            </select>
                            <div className="message">
                            {this.state.error.role.show ?this.state.error.role.message.map((e,index)=>{
                                return (<span key={index} className="text-danger">{e}</span>)
                            }):''}
                            </div>
                            
                        </div>
                        
                        
                        <button className="btn btn-success">Tambahkan</button>
                    </form>
                    
                    

                </div>
                
            </div>
        );
    }
}