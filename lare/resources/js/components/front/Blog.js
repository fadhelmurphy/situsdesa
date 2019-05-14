import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Pagination from "react-js-pagination";

export default class Blog extends Component {
    constructor(props){
        super(props);
        this.state = {
            news:[],
            activePage:1,
            itemsCountPerPage:0,
            totalItemsCount:0,
            pageRangeDisplayed:1,
        }
        this.handlePageChange=this.handlePageChange.bind(this)
      // console.log(props)
    }
    componentWillMount()
    {
        axios.get('/api/berita')
        .then(res=>{
                // console.log(res.data);
                this.setState({news:res.data.data,
                  itemsCountPerPage:res.data.per_page,
                  totalItemsCount:res.data.total,
                  activePage:res.data.current_page})
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
      })
    }
    render(){
        return (<>
            <div className="row mb-2">
              {this.state.news.map((berita,index)=>{
                return(<div className="col-md-6" key={index}>
                    <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                      <div className="col p-4 d-flex flex-column position-static">
                      <Link to={'/blog/'+berita.id}><h3 className="mb-0">{berita.judul}</h3></Link>
                        <div className="mb-1 text-muted">{berita.created_at}</div>
                        <div className="card-text mb-auto" dangerouslySetInnerHTML={{__html: berita.isi}}>
                        {/* {berita.isi} */}
                        </div>
                      </div>
                      <div className="col-auto d-none d-lg-block">
                      {berita.foto==null?(<svg className="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>):(<img className="bd-placeholder-img" alt="user" width="200" height="250" src={"/uploads/file/"+berita.foto}/>)}
                      </div>
                    </div>
                  </div>)
                })
              }
      
            </div>
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
              </>
          );
      }
}

