<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Pusher\Laravel\Facades\Pusher;
use App\Antrian;
use Carbon\Carbon;
class AntrianController extends Controller
{
    public function tambah(Request $request){
        $data=Antrian::create([
            'no_antrian'=>$request->no_antrian,
            'status'=>0
        ]);
        Pusher::trigger('keca-channel','antrian',$data);
        return response()->json(['message'=>$data],200);
    }
    public function cek(){
        $data=DB::table('antrian')->whereBetween('created_at',[Carbon::now()->setTime(0,0)->format('Y-m-d H:i:s'), 
        Carbon::now()->setTime(23,59,59)->format('Y-m-d H:i:s')])->where('status',0)->get();
        return response()->json($data,200);
    }
    public function last(){
        $data=DB::table('antrian')->whereBetween('created_at',[Carbon::now()->setTime(0,0)->format('Y-m-d H:i:s'), 
        Carbon::now()->setTime(23,59,59)->format('Y-m-d H:i:s')])->orderBy('id','desc')->first();
        return response()->json($data,200);
    }
    public function checklist(Request $request){
        $data=Antrian::findOrFail($request->delete)->update(['status'=>1]);
        return response()->json(['data'=>$data],200);
    }
    public function terpanggil(){
        $data=Antrian::where('status',1)->whereBetween('created_at',[Carbon::now()->setTime(0,0)
        ->format('Y-m-d H:i:s'), Carbon::now()->setTime(23,59,59)->format('Y-m-d H:i:s')])->get();
        return response()->json($data,200);
    }

}
