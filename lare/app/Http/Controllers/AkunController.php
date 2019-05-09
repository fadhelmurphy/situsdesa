<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AkunController extends Controller
{
    public function daftar(Request $req){
        $this->validate($req,[
            'name'=>'required|string|max:24',
            'email'=>'required|string|email|unique:users,email',
            'password'=>'required|string|min:5|max:20',
            'role'=>'required|integer'
        ]);
        return response()->json(['message'=>'ok'],200);

        // DB::table('users')->insert([
        //     'name'=>$req->name,
        //     'email'=>$req->email,
        //     'password'=>bcrypt($req->password),
        //     // 'desa_id'=>null,
        //     'role_id'=>$req->role
        // ]);
    }
    public function key(){
        $data=DB::table('oauth_clients')->select('secret')->where('id','2')->first();
        return response()->json($data,200);
    }
    public function list(Request $request){
        $role=$request->user()->role_id;
        $data=DB::table('roles')->select('id','keterangan')->where('id','>',$role)->get();
        return response()->json($data,200);
    }
   
    
}
