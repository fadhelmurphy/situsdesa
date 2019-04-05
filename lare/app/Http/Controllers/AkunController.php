<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AkunController extends Controller
{
    public function daftar(Request $req){
        DB::table('users')->insert([
            'name'=>$req->name,
            'email'=>$req->email,
            'password'=>bcrypt($req->password),
            'desa_id'=>null,
            'role_id'=>$req->role
        ]);
    }
    public function key(){
        $data=DB::table('oauth_clients')->select('secret')->where('id','2')->first();
        return response()->json($data,200);
    }
    
}
