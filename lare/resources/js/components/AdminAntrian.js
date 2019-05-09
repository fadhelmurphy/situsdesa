import React, { Component } from 'react';
import Axios from 'axios';
var desain={
    backgroundColor:'lightGreen',
    width:'400px',
    height:'300px',
    padding:'20px',
    border:'1px solid black',
    overflow:'auto'
}
var jarak={
    margin:'0 0 8px 0'
}
var tulisan={
    margin:'0'
}
export default class AdminAntrian extends Component {
    constructor(props){
        super(props)
        this.checklist =this.checklist.bind(this);
        this.state={
            socket:null,
            data:[],
            isLoad:true,
            elMas:null,
            elKel:null,
            selesai:[]
        }
    }
    componentWillMount(){
        const socket = new Pusher("66dc6f9cf0433602c19c", {
            cluster: "ap1",
            encrypted:true,
        })
        socket.subscribe('keca-channel').bind('antrian',res=>{
            let data=this.state.data
            data.push(res)
            this.setState({data})
            console.log(data)
            this.elMas()
        })
        Axios.get('/api/antrian-cek')
        .then(res=>{
            // console.log(res.data)
            this.setState({data:res.data,isLoad:false})
            this.elMas()
        })
        Axios.get('/api/antrian-terpanggil')
        .then(res=>{
            console.log(res.data)
            this.setState({selesai:res.data,isLoad:false})
            let data=this.state.selesai
            this.elKel(data)
        })
    }
    elMas(){
        // console.log('da')
        let el=this.state.data.map((e,index)=>{
            return (<div className="row" key={index} style={jarak}>
                    <div className="col-4">
                        <p  className="" >No Antrian :{e.no_antrian}</p>
                    </div>
                    <div className="col-4">
                        <button className="btn btn-danger" onClick={()=>this.checklist(index)}>Checklist</button>
                    </div>
                </div>)
        })
        this.setState({elMas:el})
    }
    componentDidMount(){
        
    }
    checklist(index){
        let data=this.state.data
        let hapus=data.splice(index,1)
        this.elMas()
        let kel=this.state.selesai
        console.log(kel)
        Axios.post('/api/antrian-checklist',{delete:hapus[0]['id']})
        .then(res=>{
            kel.push(hapus[0])
            this.elKel(kel)
            console.log(res)
        })
        
    }
    elKel(datas=[]){
        datas.sort(function(a,b){
            const noA=a.no_antrian
            const noB=b.no_antrian
            if(noA>noB){
                return 1
            }
            if(noA<noB){
                return -1
            }
        })
        let el=datas.map((e,index)=>{
            return (<div className="row" key={index} style={jarak}>
                    <div className="col-4">
                        <p  className=""style={tulisan} >No Antrian :{e.no_antrian}</p>
                    </div>
                </div>)
            })
        this.setState({elKel:el})
        // console.log(el)
    }
    render(){
        if(this.state.isLoad){
            return(<></>)
        }else{
            return(
                <>
                
                <div className="container">
                    <h1 className="text-center">Daftar Antrian</h1>
                    <div className="row">
                    <div style={desain} className="col-6">
                        <h2>Belum Dipanggil</h2>
                        {this.state.elMas}
                        
                    </div>
                    
                    <div style={desain} className="col-6"><h2>Telah Dipanggil</h2>{this.state.elKel}</div>
                    </div>
                    
                </div>
                
                
                </>
            )
        }
        
    }
}
