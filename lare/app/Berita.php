<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Berita extends Model
{
    //
    protected $table="berita";
    protected $fillable = ['user_id','user_update','judul','isi'];
}
