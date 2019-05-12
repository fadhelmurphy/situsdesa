import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import SuccessAlert from './SuccessAlert';
import ErrorAlert from './ErrorAlert';

export default class Listing extends Component {

	constructor(props){
        super(props);
        this.onDelete=this.onDelete.bind(this)
		this.state = {
            news:[],
            alert_message:'',
            redirect:false,
            user:null,
            hak:0
        }
        // console.log(props)
    }
    
    componentWillMount(){
        
        if(this.props.auth){
            this.setState({user:this.props.user.id,hak:this.props.user.role_id})
        }
        
        // else{
        //     console.log('no')
        // }
        // if(JSON.parse(window.localStorage.getItem('authUser'))===null){
        //     return 
        // }
        // var acc=JSON.parse(window.localStorage.getItem('authUser'))['access_token']
        // // console.log(acc)
        // const header ={
        //     'Content-Type':'application/json',
        //     'Authorization':'Bearer '+ acc
        // }
        // axios.get('http://localhost:8000/api/user', {headers:header})
        // .then(res=>{
        //     this.setState({user:res.data.id, hak:res.data.role_id})
        // })
        
    }
	componentDidMount()
	{
        // console.log(this.state)
		axios.get('/api/berita')
		.then(response=>{
            // console.log(response.data);
            this.setState({news:response.data});
		});
    }
    hakAkses(user,id){
        
        // console.log('user :',user,'id :',id)//user berasal dari siapa pembuat berita
        if(this.state.user===user.id||user.role_id>=this.state.hak){
            
            return(
                <>
                <Link to={'/dashboard/berita/edit/'+id}><button type="button" class="btn btn-cyan btn-sm">Edit</button></Link>
                <button type="button" class="btn btn-danger btn-sm" href="#" 
                onClick={()=>this.onDelete(id)}
                >Delete</button>
                </> 
            )
            
        }
    }
    onDelete(berita_id)
    {
        const token = JSON.parse(window.localStorage.getItem('authUser'))
        const header ={
            'Accept':'application/json',
            'Authorization':'Bearer '+ token.access_token
        }
        
        console.log(berita_id)
        axios.delete('/api/berita/delete/'+berita_id,{headers:header})
        .then(
            response=>{
            var news = this.state.news;
            for(var i =0; i < news.length; i++){
                if(news[i].id==berita_id){
                    news.splice(i,1);
                    this.setState({news:news});
                }
            }
            this.setState({
                alert_message:"success"
            });
            }
    ).catch(
        error=>{
            this.setState({
                alert_message:"error"
            });
        }
    );
    }

    render() {
        return (
            <>
            <div class="card">
                            <div class="card-body">
                            {this.state.alert_message=="success"?<SuccessAlert message={"Berita deleted successfully."} />:null}
            {this.state.alert_message=="error"?<ErrorAlert message={"Error occured while deleting the berita."} />:null}
                                <h4 class="card-title">Latest Posts</h4>
                                <Link to={'/dashboard/berita/add'}><button type="button" class="btn btn-cyan btn-sm">Tambah +</button></Link>
                            </div>
                            <div class="comment-widgets scrollable">
                            {

                    this.state.news.map((berita,index)=>{
                        return(
                                <div class="d-flex flex-row comment-row" key={index}>
                                    <div class="p-2">{berita.foto==null?(<img src="/matrix/assets/images/users/1.jpg" alt="user" width="50" class="rounded-circle"/>):(<img alt="user" width="50" class="rounded-circle" src={"/uploads/file/"+berita.foto} style={{width: 50, height: 50}}/>)}</div>
                                    <div class="comment-text w-100">
                                        <h6 class="font-medium">{berita.judul}</h6>
                                        <span class="m-b-15 d-block">{berita.isi}
                                        </span>
                                        <div class="comment-footer">
                                            <span class="text-muted float-right">{berita.created_at}</span>
                                            {this.hakAkses(berita.create,berita.id)}
                                            {/* <button type="button" class="btn btn-cyan btn-sm"><Link to={'/dashboard/berita/edit/'+berita.id}>Edit</Link></button> */}
                                            {/* <button type="button" class="btn btn-danger btn-sm" ><a href="#" onClick={this.onDelete.bind(this,berita.id)}>Delete</a></button> */}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                            </div>
                        </div>

            {/* <div class="card">
            <div class="card-body">
            <h5 class="card-title">Berita</h5>
            <div class="table-responsive">
            <table id="zero_config" className="table table-striped table-bordered">
			  <thead>
			    <tr>
			      <th>#</th>
                  <th>Judul</th>
                  <th>Isi</th>
                  <th>Foto</th>
			      <th>Created At</th>
                  <th>Updated At</th>
                  <th>Action</th>
			    </tr>
			  </thead>
			  <tbody>
			  	{

			  		this.state.news.map((berita)=>{
			  			return(
				  			<tr>
						      <td>1</td>
                              <td>{berita.judul}</td>
                              <td>{berita.isi}</td>
						      <td>{berita.foto==''?("Tidak ada thumbnail"):(<img src={"/uploads/file/"+berita.foto} style={{width: 150+'px', height: 150+'px'}}/>)}</td>
						      <td>{berita.created_at}</td>
                              <td>{berita.updated_at}</td>
                              <td>
                                    <Link to={'/dashboard/berita/edit/'+berita.id}>Edit | </Link>
                                    <a href="#" onClick={this.onDelete.bind(this,berita.id)}>Delete</a></td>
						    </tr>
					    )
			  		})
			  	}
			  </tbody>
            </table>
            </div>
            </div>
            </div> */}
            </>
        );
    }
}

