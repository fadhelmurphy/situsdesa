<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AntrianController extends Controller
{
    public function tambah(Request $request){
        DB::table('antrian')->insert([
            'id'=>$request->no,
            'panggil'=>null,
            'status'=>0
        ]);
    }
    public function cek(){
        $data=DB::table('antrian')->get();
        return response()->json($data,200);
    }
    public function last(){
        $data=DB::table('antrian')->orderBy('created_at','desc')->first();
        return response()->json($data,200);
    }
    public function checklist(Request $request){
        DB::table('antrian')->where('id',$request->id)->update(['status'=>1]);
    }

}
