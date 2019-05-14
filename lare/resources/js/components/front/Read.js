import React, { Component } from 'react';
import axios from 'axios';

export default class Read extends Component {

    constructor(props){
        super(props);
        this.state = {
            formValues: {
                judul:null,
                isi:null
            }
        }
    }
	componentDidMount()
	{
        let formValues = this.state.formValues;
        axios.get('/api/berita/edit/'+this.props.match.params.id)
		.then(response=>{
            // console.log('data',response.data.foto===null);
            if(response.data.message == "success"){
                this.setState({formValues:response.data});
                document.querySelectorAll('.blog-post')[0].innerHTML =
                this.state.formValues["isi"]
            }else if(response.data.message == "notfound"){
                this.props.history.push('/berita');
            }
		}).catch(
            error=>{
                console.log("GA ADA");
        });
    }

    render() {
        return (
            <>
            <div class="col-md-8 blog-main">
      <h3 class="blog-post-title pb-4 mb-4 border-bottom">{this.state.formValues["judul"]}</h3>
        <p class="blog-post-meta">{this.state.formValues["created_at"]}</p>
        <div className="container align-items-center">
        {this.state.formValues["foto"]==null?(<svg class="bd-placeholder-img" width="400" height="450" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>):(<img class="bd-placeholder-img" alt="user" width="400" height="450" src={"/uploads/file/"+this.state.formValues["foto"]}/>)}
        </div>
      <p class="blog-post pt-4 mt-4">

    </p>

    </div>

            </>
        );
    }
}

