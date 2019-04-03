<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;
class Berita extends Model
{
    //
    protected $table="berita";
    protected $fillable = ['user_id','user_update','judul','isi'];
    protected $appends=['create'];
    public function getCreateAttribute(){
        return User::where('id',$this->user_id)->first();
    }
}
