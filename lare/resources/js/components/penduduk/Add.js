import React, { Component } from "react";
import axios from "axios";
import SuccessAlert from "./SuccessAlert";
import ErrorAlert from "./ErrorAlert";

export default class Add extends Component {
    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            formValues: {},
            alert_message: "",
            imagePreviewUrl: ""
        };
    }

    handleChange(event) {
        event.preventDefault();
        let formValues = this.state.formValues;
        let formData = this.formData;
        let name = event.target.name;
        let value;
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

        console.log(formValues);
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
        e.preventDefault();
        console.log(this.state.formValues);
        var rr = new FormData();
        for (let [key, value] of Object.entries(this.state.formValues)) {
            if (key == "gambar") rr.append(key, value, value.name);
            else rr.append(key, value);
        }
        // console.log(JSON.stringify(rr));
        axios.post("/api/penduduk/store", rr)
            .then(res =>
                this.setState({
                    alert_message: "success"
                })
            )
            .catch(error =>
                this.setState({
                    alert_message: "error"
                })
            );
    }

    render() {
        return (
            <>
                <div class="card-body">
                    {this.state.alert_message == "success" ? (
                        <SuccessAlert
                            message={"Category added successfully."}
                        />
                    ) : null}
                    {this.state.alert_message == "error" ? (
                        <ErrorAlert
                            message={"Error occured while adding the berita."}
                        />
                    ) : null}
                </div>
                <div class="card">
                    <form class="form-horizontal" onSubmit={this.onSubmit}>
                        <div class="card-body">
                            <div className="form-group row">
                                <label
                                    for="nama"
                                    class="col-sm-3 control-label col-form-label"
                                >
                                    Nama
                                </label>
                                <div class="col-sm-9">
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
                                    class="col-sm-3 control-label col-form-label"
                                >
                                    NIK
                                </label>
                                <div class="col-sm-9">
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
                                    class="col-sm-3 control-label col-form-label"
                                >
                                    No. KK
                                </label>
                                <div class="col-sm-9">
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
                                    class="col-sm-3 control-label col-form-label"
                                >
                                    Tempat Lahir (TTL)
                                </label>
                                <div class="col-sm-9">
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
                            class="col-sm-3">Bulan Tanggal Tahun Lahir <small class="text-muted">dd/mm/yyyy</small></label>
                            <div class="col-sm-9">
                            <div class="input-group">
                            <input type="text" name="ttl" class="form-control" id="datepicker-autoclose" placeholder="mm/dd/yyyy"/>
                            <div class="input-group-append">
                                <span class="input-group-text"><i class="fa fa-calendar"></i></span>
                            </div>
                        </div>
                            </div>
                        </div>
                            <div className="form-group row">
                                <label
                                    for="jk"
                                    class="col-sm-3 control-label col-form-label"
                                >
                                    Jenis Kelamin
                                </label>
                                <div class="col-sm-9">
                                    <select name="jk" class="select2 form-control custom-select" style={{
                                        width: 100 + "%",
                                        height: 36 + "px"
                                    }}>
                                            <option>Pilih</option>
                                            <option value="Pria">Pria</option>
                                            <option value="Wanita">Wanita</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label
                                    for="goldar"
                                    class="col-sm-3 control-label col-form-label"
                                >
                                    Golongan Darah
                                </label>
                                <div class="col-sm-9">
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="goldar"
                                        placeholder="Golongan Darah"
                                        value={this.state.formValues["goldar"]}
                                        onChange={this.handleChange.bind(this)}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label
                                    for="agama"
                                    class="col-sm-3 control-label col-form-label"
                                >
                                    Agama
                                </label>
                                <div class="col-sm-9">
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="agama"
                                        placeholder="Agama"
                                        value={this.state.formValues["agama"]}
                                        onChange={this.handleChange.bind(this)}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label
                                    for="alamat"
                                    class="col-sm-3 control-label col-form-label"
                                >
                                    Alamat
                                </label>
                                <div class="col-sm-9">
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
                                    class="col-sm-3 control-label col-form-label"
                                >
                                    Status perkawinan
                                </label>
                                <div class="col-sm-9">
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
                                    class="col-sm-3 control-label col-form-label"
                                >
                                    Warga Negara
                                </label>
                                <div class="col-sm-9">
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
                                    class="col-sm-3 control-label col-form-label"
                                >
                                    Pekerjaan
                                </label>
                                <div class="col-sm-9">
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
                                    class="col-sm-3 control-label col-form-label"
                                >
                                    Nama Ayah
                                </label>
                                <div class="col-sm-9">
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
                                    class="col-sm-3 control-label col-form-label"
                                >
                                    Nama Ibu
                                </label>
                                <div class="col-sm-9">
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
                                    class="col-sm-3 control-label col-form-label"
                                >
                                    Foto
                                </label>
                                <div class="col-md-9">
                                    <div class="custom-file">
                                        <input
                                            type="file"
                                            name="gambar"
                                            class="custom-file-input"
                                            onChange={this.handleChange.bind(
                                                this
                                            )}
                                            id="validatedCustomFile"
                                            required=""
                                        />
                                        <label
                                            class="custom-file-label"
                                            for="validatedCustomFile"
                                        >
                                            Choose file...
                                        </label>
                                        <div class="invalid-feedback">
                                            Example invalid custom file feedback
                                        </div>
                                    </div>
                                    <img
                                        src={this.state.imagePreviewUrl}
                                        style={{
                                            width: 150 + "px",
                                            height: 150 + "px"
                                        }}
                                    />
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
