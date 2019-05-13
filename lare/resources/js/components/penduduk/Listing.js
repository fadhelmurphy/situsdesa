import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import SuccessAlert from './SuccessAlert';
import ErrorAlert from './ErrorAlert';
import Pagination from "react-js-pagination";

export default class Listing extends Component {

	constructor(){
		super();
		this.state = {
            news:[],
            alert_message:'',
            search: '',
            activePage:1,
            itemsCountPerPage:0,
            totalItemsCount:0,
            pageRangeDisplayed:1
        }
        this.handlePageChange=this.handlePageChange.bind(this)
	}

	componentWillMount()
	{
		axios.get('/api/penduduk')
		.then(res=>{
            if(res.data.data.length>0){
                this.setState({
                    news:res.data.data,
                    itemsCountPerPage:res.data.per_page,
                    totalItemsCount:res.data.total,
                    activePage:res.data.current_page
                })
                if(res.data.last_page<4){
                    this.setState({pageRangeDisplayed:res.data.last_page})
                }else{
                    this.setState({pageRangeDisplayed:4})
                }
            }   
		});
    }
    handlePageChange(pageNumber) {
        axios.get('/api/penduduk?page='+pageNumber)
        .then(res=>{
            this.setState({news:res.data.data,
                itemsCountPerPage:res.data.per_page,
                totalItemsCount:res.data.total,
                activePage:res.data.current_page
            })
        })
    }

    filterList(event){
        event.preventDefault();
    var updatedList = this.state.news;
    updatedList = updatedList.filter(function(item){
        let itemName = item.nama.toLowerCase() || item.nik.toLowerCase();
      return itemName.toString().toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.setState({news: updatedList});
    }

    onDelete(penduduk_id)
    {
        axios.delete('/api/penduduk/delete/'+penduduk_id)
        .then(
            response=>{
            var news = this.state.news;
            for(var i =0; i < news.length; i++){
                if(news[i].id==penduduk_id){
                    news.splice(i,1);
                    this.setState({news:news});
                }
            }
            this.setState({
                alert_message:"success"
            });
        })
        .catch(
        error=>{
            this.setState({
                alert_message:"error"
            });
        });
    }
    updateSearch(event){
        // console.log(event.target.value.substr(0, 20))
        // this.setState({search: event.target.value.substr(0, 20)});
      }

    render() {
        let filteredJson = this.state.news.filter(data => {
            return data.nama.toLocaleLowerCase().indexOf(this.state.search.toLocaleLowerCase()) > -1 || data.nik.indexOf(this.state.search.toLocaleLowerCase()) > -1;
          }
        );
        return (
            <div className="card">
                <input type="text" className="form-control form-control-lg" placeholder="Search"
                value={this.state.search}
                onChange={this.updateSearch.bind(this)}/>
            <div className="card-body">
            {this.state.alert_message=="success"?<SuccessAlert message={"penduduk deleted successfully."} />:null}
            {this.state.alert_message=="error"?<ErrorAlert message={"Error occured while deleting the penduduk."} />:null}
            <h5 className="card-title">penduduk</h5>
            <Link to={'/dashboard/penduduk/add'}><button type="button" className="btn btn-cyan btn-sm">Tambah +</button></Link>
            <div className="table-responsive">
            <table id="zero_config" className="table table-striped table-bordered">
			  <thead>
			    <tr>
                  <th>Nama</th>
                  <th>Nik</th>
                  <th>Foto</th>
                  <th>Tempat Lahir</th>
                  <th>Tanggal Lahir</th>
                  <th>Jenis Kelamin</th>
                  <th>Golongan Darah</th>
                  <th>Agama</th>
                  <th>Alamat</th>
                  <th>Warga</th>
                  <th>Pekerjaan</th>
                  <th>Ayah</th>
                  <th>Ibu</th>
                  <th>Action</th>
			    </tr>
			  </thead>
			  <tbody>
			  	{

                    filteredJson.map((penduduk)=>{
			  			return(
				  			<tr>
                              <td>{penduduk.nama}</td>
                              <td>{penduduk.nik}</td>
						      <td>{penduduk.foto==''?("Tidak ada thumbnail"):(<img src={"/uploads/file/"+penduduk.foto} style={{width: 150+'px', height: 150+'px'}}/>)}</td>
						      <td>{penduduk.tempatlahir}</td>
                              <td>{penduduk.ttl}</td>
                              <td>{penduduk.jk}</td>
                              <td>{penduduk.goldar}</td>
                              <td>{penduduk.agama}</td>
                              <td>{penduduk.alamat}</td>
                              <td>{penduduk.warga}</td>
                              <td>{penduduk.pekerjaan}</td>
                              <td>{penduduk.ayah}</td>
                              <td>{penduduk.ibu}</td>
                              <td>
                                    <Link to={'/dashboard/penduduk/edit/'+penduduk.id}>Edit | </Link>
                                    <a href="#" onClick={this.onDelete.bind(this,penduduk.id)}>Delete</a></td>
						    </tr>
					    )
			  		})
			  	}
			  </tbody>
            </table>
            

            </div>
            </div>
            <div className="d-flex justify-content-center">
            <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={this.state.itemsCountPerPage}
            totalItemsCount={this.state.totalItemsCount}
            pageRangeDisplayed={this.state.pageRangeDisplayed}
            onChange={this.handlePageChange}
            itemClass='page-item'
            linkClass='page-link'
            prevPageText='prev'
            nextPageText='next'
            firstPageText='first'
            lastPageText='last'
            />
            </div>
            </div>
        );
    }
}

