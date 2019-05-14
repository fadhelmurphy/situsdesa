import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import SuccessAlert from './SuccessAlert';
import ErrorAlert from './ErrorAlert';
import Pagination from "react-js-pagination";

export default class Listing extends Component {

	constructor(props){
        super(props);
        this.onDelete=this.onDelete.bind(this)
		this.state = {
            news:[],
            alert_message:'',
            redirect:false,
            user:null,
            hak:0,
            activePage:1,
            itemsCountPerPage:0,
            totalItemsCount:0,
            pageRangeDisplayed:1,
        }
        this.handlePageChange=this.handlePageChange.bind(this)
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
		.then(res=>{
            // console.log(res.data);
            this.setState({news:res.data.data,
                itemsCountPerPage:res.data.per_page,
                totalItemsCount:res.data.total,
                activePage:res.data.current_page,})
                if(res.data.last_page<4){
                    this.setState({pageRangeDisplayed:res.data.last_page})
                }else{
                    this.setState({pageRangeDisplayed:4})
                }
		});
    }
    handlePageChange(pageNumber) {
        axios.get('/api/berita?page='+pageNumber)
        .then(res=>{
            this.setState({news:res.data.data,
                itemsCountPerPage:res.data.per_page,
                totalItemsCount:res.data.total,
                activePage:res.data.current_page
            })
            if(res.data.last_page<4){
                this.setState({pageRangeDisplayed:res.data.last_page})
            }else{
                this.setState({pageRangeDisplayed:4})
            }
        })
    }
    hakAkses(user,id){
        // console.log('user :',user,'id :',id,'auth :',this.state.hak<=user.role_id)//user berasal dari siapa pembuat berita
        if(this.state.user===user.id||user.role_id>=this.state.hak){
            return(
                <>
                <Link to={'/dashboard/berita/edit/'+id}><button type="button" className="btn btn-cyan btn-sm">Edit</button></Link>
                <button type="button" className="btn btn-danger btn-sm" href="#" 
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
            <div className="card">
                            <div className="card-body">
                            {this.state.alert_message=="success"?<SuccessAlert message={"Berita deleted successfully."} />:null}
            {this.state.alert_message=="error"?<ErrorAlert message={"Error occured while deleting the berita."} />:null}
                                <h4 className="card-title">Latest Posts</h4>
                                <Link to={'/dashboard/berita/add'}><button type="button" className="btn btn-cyan btn-sm">Tambah +</button></Link>
                            </div>
                            <div className="comment-widgets scrollable">
                            {

                    this.state.news.map((berita,index)=>{
                        return(
                                <div className="d-flex flex-row comment-row" key={index}>
                                    <div className="p-2">{berita.foto==null?(<img src="/matrix/assets/images/users/1.jpg" alt="user" width="50" className="rounded-circle"/>):(<img alt="user" width="50" className="rounded-circle" src={"/uploads/file/"+berita.foto} style={{width: 50, height: 50}}/>)}</div>
                                    <div className="comment-text w-100">
                                        <h6 className="font-medium">{berita.judul}</h6>
                                        <span className="m-b-15 d-block" dangerouslySetInnerHTML={{__html: berita.isi}}>
                                        {/* {berita.isi} */}
                                        </span>
                                        <div className="comment-footer">
                                            <span className="text-muted float-right">{berita.created_at}</span>
                                            {this.hakAkses(berita.create,berita.id)}
                                            {/* <button type="button" className="btn btn-cyan btn-sm"><Link to={'/dashboard/berita/edit/'+berita.id}>Edit</Link></button> */}
                                            {/* <button type="button" className="btn btn-danger btn-sm" ><a href="#" onClick={this.onDelete.bind(this,berita.id)}>Delete</a></button> */}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className="d-flex justify-content-center">
            <Pagination
            hideDisabled
            activePage={this.state.activePage}
            itemsCountPerPage={this.state.itemsCountPerPage}
            totalItemsCount={this.state.totalItemsCount}
            pageRangeDisplayed={this.state.pageRangeDisplayed}
            onChange={this.handlePageChange}
            itemClass='page-item'
            linkClass='page-link'
            prevPageText='<'
            nextPageText='>'
            firstPageText='first'
            lastPageText='last'
            />
            </div>
                            </div>
                        </div>

            {/* <div className="card">
            <div className="card-body">
            <h5 className="card-title">Berita</h5>
            <div className="table-responsive">
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

