<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Antrian extends Model
{
    //
    protected $table="antrian";
    protected $fillable = ['no_antrian','status','user_id','panggil'];
    
}
