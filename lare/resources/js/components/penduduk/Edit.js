import React, { Component } from 'react';
import axios from 'axios';
import SuccessAlert from './SuccessAlert';
import ErrorAlert from './ErrorAlert';
import {Redirect} from 'react-router-dom';

export default class Edit extends Component {

    constructor(props){
        super(props);
        this.onSubmit =
        this.onSubmit.bind(this);
        this.state = {
            imagePreviewUrl:null,
            formValues: {},
            alert_message:'',
            isLoad:true,
            redirect:false,
            foto:''
        }
    }

	componentDidMount()
	{
        axios.get('/api/penduduk/edit/'+this.props.match.params.id)
		.then(response=>{
            console.log(response.data);
            if(response.data.message=='notfound'){
                this.setState({redirect:true})
            }
            this.setState({formValues:response.data});
            if(response.data.foto===null){
                let foto=this.state.formValues
                delete foto['foto']
            }
		}).catch(
            error=>{
                console.log("GA ADA");
        });
    }
    handleChange(event) {
        event.preventDefault();
        let formValues = this.state.formValues;
        let formData = this.formData;
        let name = event.target.name;
        let value;
        console.log(name)
        if (name == "gambar") {
            let reader = new FileReader();
            value = event.target.files[0];
            reader.onloadend = () =>
                this.setState({
                    imagePreviewUrl: reader.result
                });
            reader.readAsDataURL(value);
            formValues[name] = value;
        } else {
            value = event.target.value;
            formValues[name] = value;
        }
        // console.log(formValues);
        if(name!=undefined){
            this.setState({
                formValues: formValues
            });
        }
    }

    getnamevalue(name){
        let formValues = this.state.formValues;
        formValues[name] = document.getElementsByName(name)[0].value;
        this.setState({
            formValues: formValues
        });
    }

    onSubmit(e) {
        this.getnamevalue('ttl');
        this.getnamevalue('jk');
        this.getnamevalue('agama')
        this.getnamevalue('goldar')
        e.preventDefault();
        console.log(this.state.formValues);
        var rr = new FormData();
        for (let [key, value] of Object.entries(this.state.formValues)) {
            if (key == "gambar") rr.append(key, value, value.name);
            else rr.append(key, value);
        }
        // console.log(JSON.stringify(rr));
        const token = JSON.parse(window.localStorage.getItem('authUser'))
        const header ={
            'Accept':'application/json',
            'Authorization':'Bearer '+ token.access_token
        }
        axios.post('/api/penduduk/update/'+this.props.match.params.id,rr,{headers:header})
            .then(res =>{
                // console.log(res)
                this.setState({
                    alert_message: "success"
                })
            })
            .catch(error =>{
                this.setState({
                    alert_message: "error"
                })
                console.log(error.response.data.errors)
            });
    }

    render() {
        if(this.state.redirect) return <Redirect to='/dashboard/penduduk'/>;
        return (
            <>
                <div className="card-body">
                    {this.state.alert_message == "success" ? (
                        <SuccessAlert
                            message={"Category updated successfully."}
                        />
                    ) : null}
                    {this.state.alert_message == "error" ? (
                        <ErrorAlert
                            message={"Error occured while updating the penduduk."}
                        />
                    ) : null}
                </div>
                <div className="card">
                    <form className="form-horizontal" onSubmit={this.onSubmit}>
                        <div className="card-body">
                            <div className="form-group row">
                                <label
                                    for="nama"
                                    className="col-sm-3 control-label col-form-label"
                                >
                                    Nama
                                </label>
                                <div className="col-sm-9">
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="nama"
                                        placeholder="Nama"
                                        value={this.state.formValues["nama"]}
                                        onChange={this.handleChange.bind(this)}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label
                                    for="nik"
                                    className="col-sm-3 control-label col-form-label"
                                >
                                    NIK
                                </label>
                                <div className="col-sm-9">
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="nik"
                                        placeholder="NIK"
                                        value={this.state.formValues["nik"]}
                                        onChange={this.handleChange.bind(this)}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label
                                    for="kk"
                                    className="col-sm-3 control-label col-form-label"
                                >
                                    No. KK
                                </label>
                                <div className="col-sm-9">
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="kk"
                                        placeholder="No. KK"
                                        value={this.state.formValues["kk"]}
                                        onChange={this.handleChange.bind(this)}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label
                                    for="ttl"
                                    className="col-sm-3 control-label col-form-label"
                                >
                                    Tempat Lahir (TTL)
                                </label>
                                <div className="col-sm-9">
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="tempatlahir"
                                        placeholder="Tempat Tanggal Lahir (TTL)"
                                        value={this.state.formValues["tempatlahir"]}
                                        onChange={this.handleChange.bind(this)}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                            <label
                            className="col-sm-3">Bulan Tanggal Tahun Lahir <small className="text-muted">dd/mm/yyyy</small></label>
                            <div className="col-sm-9">
                            <div className="input-group">
                            <input type="text" name="ttl" value={this.state.formValues["ttl"]} className="form-control" id="datepicker-autoclose" placeholder="mm/dd/yyyy"/>
                            <div className="input-group-append">
                                <span className="input-group-text"><i className="fa fa-calendar"></i></span>
                            </div>
                        </div>
                            </div>
                        </div>
                            <div className="form-group row">
                                <label
                                    for="jk"
                                    className="col-sm-3 control-label col-form-label"
                                >
                                    Jenis Kelamin
                                </label>
                                <div className="col-sm-9">
                                    <select name="jk" className="select2 form-control" onChange={this.handleChange.bind(this)} 
                                    value={this.state.formValues['jk']} style={{width: 100 + "%",height: 36 + "px"}}>
                                        <option>Pilih</option>
                                        <option value="pria">Pria</option>
                                        <option value="wanita">Wanita</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label
                                    for="goldar"
                                    className="col-sm-3 control-label col-form-label"
                                >
                                    Golongan Darah
                                </label>
                                <div className="col-sm-9">
                                <select name="goldar" className="select2 form-control custom-select" onChange={this.handleChange.bind(this)}
                                value={this.state.formValues['goldar']} style={{width: 100 + "%",height: 36 + "px"}}>
                                    <option>Pilih</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="AB">AB</option>
                                    <option value="O">O</option>
                                </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label
                                    for="agama"
                                    className="col-sm-3 control-label col-form-label"
                                >
                                    Agama
                                </label>
                                <div className="col-sm-9">
                                <select name="agama" className="select2 form-control custom-select" onChange={this.handleChange.bind(this)} value={this.state.formValues['agama']} style={{
                                        width: 100 + "%",
                                        height: 36 + "px"
                                    }}>
                                            <option>Pilih</option>
                                            <option value="islam">Islam</option>
                                            <option value="kristen katolik">Kristen Katolik</option>
                                            <option value="kristen protestan">Kristen Protestan</option>
                                            <option value="hindu">Hindu</option>
                                            <option value="buddha">Buddha</option>
                                            <option value="konghucu">Konghucu</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label
                                    for="alamat"
                                    className="col-sm-3 control-label col-form-label"
                                >
                                    Alamat
                                </label>
                                <div className="col-sm-9">
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="alamat"
                                        placeholder="Alamat"
                                        value={this.state.formValues["alamat"]}
                                        onChange={this.handleChange.bind(this)}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label
                                    for="perkawinan"
                                    className="col-sm-3 control-label col-form-label"
                                >
                                    Status perkawinan
                                </label>
                                <div className="col-sm-9">
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="perkawinan"
                                        placeholder="Belum Menikah / Menikah / Sudah menikah"
                                        value={this.state.formValues["perkawinan"]}
                                        onChange={this.handleChange.bind(this)}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label
                                    for="warga"
                                    className="col-sm-3 control-label col-form-label"
                                >
                                    Warga Negara
                                </label>
                                <div className="col-sm-9">
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="warga"
                                        placeholder="Warga Negara"
                                        value={this.state.formValues["warga"]}
                                        onChange={this.handleChange.bind(this)}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label
                                    for="pekerjaan"
                                    className="col-sm-3 control-label col-form-label"
                                >
                                    Pekerjaan
                                </label>
                                <div className="col-sm-9">
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="pekerjaan"
                                        placeholder="Pekerjaan"
                                        value={this.state.formValues["pekerjaan"]}
                                        onChange={this.handleChange.bind(this)}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label
                                    for="ayah"
                                    className="col-sm-3 control-label col-form-label"
                                >
                                    Nama Ayah
                                </label>
                                <div className="col-sm-9">
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="ayah"
                                        placeholder="Nama Ayah"
                                        value={this.state.formValues["ayah"]}
                                        onChange={this.handleChange.bind(this)}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label
                                    for="ibu"
                                    className="col-sm-3 control-label col-form-label"
                                >
                                    Nama Ibu
                                </label>
                                <div className="col-sm-9">
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="ibu"
                                        placeholder="Nama Ibu"
                                        value={this.state.formValues["ibu"]}
                                        onChange={this.handleChange.bind(this)}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label
                                    for="exampleFormControlFile1"
                                    className="col-sm-3 control-label col-form-label"
                                >
                                    Foto
                                </label>
                                <div className="col-md-9">
                                    <div className="custom-file">
                                        <input
                                            type="file"
                                            name="gambar"
                                            className="custom-file-input"
                                            onChange={this.handleChange.bind(
                                                this
                                            )}
                                            id="validatedCustomFile"
                                            required=""
                                        />
                                        <label
                                            className="custom-file-label"
                                            for="validatedCustomFile"
                                        >
                                            Choose file...
                                        </label>
                                        <div className="invalid-feedback">
                                            Example invalid custom file feedback
                                        </div>
                                    </div>
                                    
                                     <img src={this.state.imagePreviewUrl==null?("/uploads/file/"+this.state.formValues['foto']):(this.state.imagePreviewUrl)} style={{width: 150+'px', height: 150+'px'}}/>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
                {/*} This Page JS */}


            </>
        );
    }
}

