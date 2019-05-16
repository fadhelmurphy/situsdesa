<?php

namespace App\Http\Controllers\api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Penduduk;
use Carbon\Carbon;

class PendudukController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $result = Penduduk::paginate(4);
        return $result;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        
        $this->validate($request,[
            'nama'=>'required|string',
            'nik'=>'required|string',
            'kk'=>'required|string',
            'tempatlahir'=>'required|string',
            'ttl'=>'required|date',
            'jk'=>'required|string',
            'goldar'=>'required|string',
            'agama'=>'required|string',
            'alamat'=>'required|string',
            'perkawinan'=>'required|string',
            'warga'=>'required|string',
            'pekerjaan'=>'required|string',
            'ayah'=>'required|string',
            'ibu'=>'required|string',
            'foto'=>'nullable|image|mimes:jpeg,png|dimensions:min_width=200,min_height=100|max:2000'
        ]);
        $penduduk = new Penduduk();
        if (isset($request->gambar))
        {
            $ext = $request->gambar->getClientOriginalExtension();
            $newName = rand(100000,1001238912).".".$ext;
            $request->gambar->move('uploads/file',$newName);
            $penduduk->foto = $newName;
        }
        
        $penduduk->fill([
            'user_id' => $request->user()->id,
            'nama'=>$request->nama,
            'nik'=>$request->nik,
            'kk'=>$request->kk,
            'tempatlahir'=>$request->tempatlahir,
            'ttl'=>Carbon::parse($request->ttl)->format('Y-m-d'),
            'jk'=>$request->jk,
            'goldar'=>$request->goldar,
            'agama'=>$request->agama,
            'alamat'=>$request->alamat,
            'perkawinan'=>$request->perkawinan,
            'warga'=>$request->warga,
            'pekerjaan'=>$request->pekerjaan,
            'ayah'=>$request->ayah,
            'ibu'=>$request->ibu,
        ]);
        $penduduk->user_id=$request->user()->id;
        $penduduk->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        
        $berita = Penduduk::find($id);
        $data = array();
        if($berita==null){
            return response()->json(['message'=>'notfound']);
        }else{
            $data = $berita;
            $data['message'] = 'success';
            return json_encode($data);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request,[
            'nama'=>'required|string',
            'nik'=>'required|string',
            'kk'=>'required|string',
            'tempatlahir'=>'required|string',
            'ttl'=>'required|date',
            'jk'=>'required|string',
            'goldar'=>'required|string',
            'agama'=>'required|string',
            'alamat'=>'required|string',
            'perkawinan'=>'required|string',
            'warga'=>'required|string',
            'pekerjaan'=>'required|string',
            'ayah'=>'required|string',
            'ibu'=>'required|string',
            'gambar'=>'nullable|image|mimes:jpeg,png|dimensions:min_width=200,min_height=100|max:2000'
        ]);
        info($request);
        $penduduk = Penduduk::find($id);
        if(isset($request->gambar)){
            $ext = $request->gambar->getClientOriginalExtension();
            $newName = rand(100000,1001238912).".".$ext;
            $path = 'uploads/file/'.$penduduk->foto;
            @chown($path, 0777);
            @unlink($path);
            $request->gambar->move('uploads/file',$newName);
            $penduduk->foto = $newName;
        }
        
        $penduduk->fill([
            'nama'=>$request->nama,
            'nik'=>$request->nik,
            'kk'=>$request->kk,
            'tempatlahir'=>$request->tempatlahir,
            'ttl'=>Carbon::parse($request->ttl)->format('Y-m-d'),
            'jk'=>$request->jk,
            'goldar'=>$request->goldar,
            'agama'=>$request->agama,
            'alamat'=>$request->alamat,
            'perkawinan'=>$request->perkawinan,
            'warga'=>$request->warga,
            'pekerjaan'=>$request->pekerjaan,
            'ayah'=>$request->ayah,
            'ibu'=>$request->ibu
        ]);
        // return response()->json($request,200);
        $penduduk->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $penduduk = Penduduk::find($id);
        if($penduduk->foto!=null){
        $myFile = "uploads/file/".$penduduk->foto;
        unlink($myFile);
        }
        $penduduk->delete();
    }
    
}
