import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Blog extends Component {
  constructor(props){
    super(props);
  this.state = {
        news:[]
    }
    // console.log(props)
  }
  componentWillMount()
	{
        // console.log(this.state)
		axios.get('/api/berita')
		.then(response=>{
            // console.log(response.data);
            this.setState({news:response.data});
		});
    }
    render() {
        return (
            <>
            <div class="row mb-2">
            {

this.state.news.map((berita,index)=>{
    return(
    <div class="col-md-6">
      <div class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
        <div class="col p-4 d-flex flex-column position-static">
        <Link to={'/blog/'+berita.id}><h3 class="mb-0">{berita.judul}</h3></Link>
          <div class="mb-1 text-muted">{berita.created_at}</div>
          <p class="card-text mb-auto">{berita.isi}</p>
        </div>
        <div class="col-auto d-none d-lg-block">
        {berita.foto==null?(<svg class="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>):(<img class="bd-placeholder-img" alt="user" width="200" height="250" src={"/uploads/file/"+berita.foto}/>)}
        </div>
      </div>
    </div>
    )
  }
  )
  }

  </div>
            </>
        );
    }
}

