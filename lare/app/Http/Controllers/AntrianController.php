<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AntrianController extends Controller
{
    public function tambah(Request $request){
        DB::table('antrian')->insert([
            'id'=>$request,
            'panggil'=>null,
            'status'=>0
        ]);
    }
    public function cekAdmin(){
        DB::table('antrian')->get();
    }
    public function cek(){
        DB::table('antrian')->orderBy('created_at','desc')->first();
    }
    public function checklist(Request $request){
        DB::table('antrian')->where('id',$request->id)->update(['status'=>1]);
    }

}
