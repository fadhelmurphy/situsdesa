import React, { Component } from 'react';
import axios from 'axios';
import SuccessAlert from './SuccessAlert';
import ErrorAlert from './ErrorAlert';
import { Redirect } from 'react-router-dom'

export default class Edit extends Component {

    constructor(props){
        super(props);
        this.onSubmit =
        this.onSubmit.bind(this);
        this.state = {
            imagePreviewUrl:null,
            formValues: {
                judul:null,
                isi:null
            },
            alert_message:'',
            redirect:false
        }
    }
    componentWillMount(){
        var acc=JSON.parse(window.localStorage.getItem('authUser'))
        if(acc ==null){
            this.setState({redirect:true})
        }else{
            const header ={
                'Accept':'application/json',
                'Authorization':'Bearer '+ acc.access_token
            }
            axios.get('/api/user', {headers:header})
            .then(res=>{this.setState({redirect:false})    })
            .catch(err=>{
                if(err.response.status===401){
                    this.setState({redirect:true})
                }
            }) 
        }
    }
	componentDidMount()
	{
        let formValues = this.state.formValues;
        axios.get('/api/berita/edit/'+this.props.match.params.id)
		.then(response=>{
            // console.log('data',response.data.foto=="null");
            if(response.data.message == "success"){
                if(response.data.foto == "null"){
                    formValues['judul'] = response.data.judul;
                    formValues['isi'] = response.data.isi;
                    this.setState({formValues:formValues});
                }else{
                    this.setState({formValues:response.data});
                }
                document.querySelectorAll('.ql-editor')[0].innerHTML =
                this.state.formValues["isi"]
            }else if(response.data.message == "notfound"){
                this.props.history.push('/berita');
            }
		}).catch(
            error=>{
                console.log("GA ADA");
        });
    }

    handleChange(event) {
        event.preventDefault();
        let formValues = this.state.formValues;
        let name = event.target.name;
        let value;
        if(name=="foto" && event.target.files[0] != null){
            let reader = new FileReader();
            value = event.target.files[0];
            reader.onloadend = () => {
                this.setState({
                  imagePreviewUrl: reader.result
                });
              }
            reader.readAsDataURL(value);
            formValues[name] = value;
        }else if(name=="foto" && event.target.files[0] == null){
            value = this.state.formValues.foto;
            formValues[name] = value;
        }else{
            value = event.target.value;
            formValues[name] = value;
        }

        this.setState({formValues})
        // console.log(typeof(formValues.foto));
    }

    getinner(name,kelas){
        let value = document.querySelectorAll(kelas)[0].innerHTML;
        let formValues = this.state.formValues;
        formValues[name] = value;
        this.setState({
            formValues:formValues
        });
    }
    onSubmit(e){
        e.preventDefault();
        this.getinner('isi','.ql-editor');
        var rr = new FormData();
        // console.log(this.state.formValues);
        for(let [key, value] of Object.entries(this.state.formValues)){
            if(key=="gambar"){
                rr.append(key,value,value.name);
            }else{
            rr.append(key,value);
            }
        }
        // rr.append('kunci','isi');
        // rr.append('_method', 'PATCH');
        const token = JSON.parse(window.localStorage.getItem('authUser'))
        const header ={
            'Accept':'application/json',
            'Authorization':'Bearer '+ token.access_token
        }
        axios.post('/api/berita/update/'+this.props.match.params.id,rr,{headers:header})
        .then(
            res=>{
                this.setState({
                    alert_message:"success"
                });
            }
        ).catch(
            error=>{
                console.log(error.response.data.errors)
                this.setState({
                    alert_message:"error"
                });
            }
        );
    }

    render() {
        if(this.state.redirect){
            return <Redirect to='/dashboard/berita'/>;
        }
        return (
            <>
            <div class="card-body">
            {this.state.alert_message=="success"?<SuccessAlert message={"Category updated successfully."} />:null}
            {this.state.alert_message=="error"?<ErrorAlert message={"Error occured while updating the berita."} />:null}
            </div>
            <div class="card">
            <form class="form-horizontal" onSubmit={this.onSubmit}>
            <div class="card-body">
			  <div className="form-group row">
                <label for="judul" class="col-sm-3 control-label col-form-label">Judul</label>
                <div class="col-sm-9">
                    <input className="form-control" type="text" name="judul"
                    placeholder="Judul berita"
                    value={this.state.formValues["judul"]}
                    onChange={this.handleChange.bind(this)} />
                </div>
              </div>
              <div className="form-group">

              <label for="exampleFormControlTextarea1">Artikel</label>
                    <div id="editor" style={{height: 200+"px"}}>

                    </div>
            </div>
            <div className="form-group row">
            <label for="exampleFormControlFile1" class="col-sm-3 control-label col-form-label">Thumbnail berita</label>
            <div class="col-md-9">
            <div class="custom-file">
            <input type="file"
            name="foto"
            class="form-control-file"
            onChange={this.handleChange.bind(this)}
            id="validatedCustomFile"/>
                <label class="custom-file-label" for="validatedCustomFile">Choose file...</label>
                <div class="invalid-feedback">Example invalid custom file feedback</div>
            </div>
            <img src={this.state.imagePreviewUrl==null?("/uploads/file/"+this.state.formValues["foto"]):(this.state.imagePreviewUrl)} style={{width: 150+'px', height: 150+'px'}}/>
            </div>
            </div>
              <button type="submit" className="btn btn-primary">Submit</button>
              </div>
			</form>
            </div>

            </>
        );
    }
}

