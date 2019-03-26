import React, { Component } from 'react';
import axios from 'axios';
import SuccessAlert from './SuccessAlert';
import ErrorAlert from './ErrorAlert';

export default class Add extends Component {

    constructor(){
        super();
        this.onSubmit =
        this.onSubmit.bind(this);
        this.state = {
            formValues: {},
            alert_message:'',
            imagePreviewUrl:''
        };
    }

    handleChange(event) {
        event.preventDefault();
        let formValues = this.state.formValues;
        let formData  = this.formData;
        let name = event.target.name;
        let value;
        if(name=="gambar"){
            let reader = new FileReader();
            value = event.target.files[0];
            reader.onloadend = () => {
                this.setState({
                  imagePreviewUrl: reader.result
                });
              }
            reader.readAsDataURL(value);
            formValues[name] = value;
        }else{
            value = event.target.value;
            formValues[name] = value;
        }

        // console.log(formValues);

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
            if(key=="gambar")
            rr.append(key,value,value.name);
            else
            rr.append(key,value);
        }
        
        const token = JSON.parse(window.localStorage.getItem('authUser'))
        const header ={
            'Accept':'application/json',
            'Authorization':'Bearer '+ token.access_token
        }
        axios.post('/api/berita/store',rr,{headers:header})

        // axios.post('/api/berita/store',rr)
        .then(
            res=>{
                console.log(res)
                this.setState({
                    alert_message:"success"
                });
            }
        ).catch(
            error=>{
                console.log(error.response.data.errors)//message validation
                this.setState({
                    alert_message:"error"
                });
            }
        );
    }

    getinner(name,kelas){
        let value = document.querySelectorAll(kelas)[0].innerHTML;
        let formValues = this.state.formValues;
        formValues[name] = value;
        this.setState({
            formValues:formValues
        });
    }

    render() {
        return (
            <>
            <div class="card-body">
            {this.state.alert_message=="success"?<SuccessAlert message={"Category added successfully."} />:null}
            {this.state.alert_message=="error"?<ErrorAlert message={"Error occured while adding the berita."} />:null}
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
                <input type="file" name="gambar"
                class="custom-file-input"
                onChange={this.handleChange.bind(this)} id="validatedCustomFile" required=""/>
                <label class="custom-file-label" for="validatedCustomFile">Choose file...</label>
                <div class="invalid-feedback">Example invalid custom file feedback</div>
            </div>
            <img src={this.state.imagePreviewUrl} style={{width: 150+'px', height: 150+'px'}} />
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

