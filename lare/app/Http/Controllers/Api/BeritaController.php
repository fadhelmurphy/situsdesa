<?php

namespace App\Http\Controllers\api;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use App\Berita;
use App\Http\Requests\BeritaRequest;
class BeritaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $result = Berita::all();
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
    public function store(BeritaRequest $request)
    {
        
        return response()->json(['data'=>'fakkk']);
        $berita = new Berita();
        if (isset($request->gambar))
        {
            $ext = $request->gambar->getClientOriginalExtension();
            $newName = rand(100000,1001238912).".".$ext;
            $request->gambar->move('uploads/file',$newName);
            $berita->foto = $newName;
        }

        // $berita->user_id = 1;
        // $berita->user_update = 1;
        // $berita->judul = $request->judul;
        // $berita->isi = $request->isi;
        $berita->fill([
            'user_id' => 1,
            // 'user_update' => 1,
            'judul' => $request->judul,
            'isi' => $request->isi
        ]);
        $berita->save();


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
    public function edit(Response $res,$id)
    {
        // return response()->json(['data'=>$res]);
        $berita = Berita::find($id);
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
    public function update(BeritaRequest $request, $id)
    {
        // dd($request->user());
        $berita = Berita::find($id);
        if(is_object($request->foto)){
            
            $ext = $request->foto->getClientOriginalExtension();
            $newName = rand(100000,1001238912).".".$ext;
            $request->foto->move('uploads/file',$newName);
            $path = 'uploads/file/'.$berita->foto;
            @chown($path, 0777);
            @unlink($path);
            
        }else{
            $newName = $request->foto;
        }
        $berita->foto = $newName;
        $berita->fill([
            'user_update' => $request->user()->id,
            'judul' => $request->judul,
            'isi' => $request->isi
        ]);
        $berita->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $berita = Berita::find($id);
        if($berita->foto!=null){
        $myFile = "uploads/file/".$berita->foto;
        unlink($myFile);
        }
        $berita->delete();
        // info($berita->foto);
    }
}
