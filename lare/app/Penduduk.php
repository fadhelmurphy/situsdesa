<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Penduduk extends Model
{
    //
    protected $table="penduduk";
    protected $fillable = ['nama','nik','kk','tempatlahir','ttl','jk','goldar','agama','alamat','perkawinan','warga','pekerjaan','ayah','ibu','foto'];
}
