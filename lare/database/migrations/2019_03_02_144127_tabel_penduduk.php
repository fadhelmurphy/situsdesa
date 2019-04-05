<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class TabelPenduduk extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('penduduk', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nama');
            $table->string('nik',20)->unique();
            $table->string('kk',20);
            $table->string('tempatlahir',50);
            $table->enum('jk',['pria','wanita']);
            $table->enum('goldar',['O','A','B','AB'])->nullable();
            $table->enum('agama',['islam','kristen katolik','kristen protestan','hindhu','buddha','konghucu']);
            $table->string('alamat');
            $table->enum('perkawinan',['nikah','lajang']);
            $table->string('warga',20);
            $table->string('pekerjaan');
            $table->string('ayah',50);
            $table->string('ibu',50);
            $table->string('foto',30);
            $table->integer('user_id')->unsigned();
            $table->integer('user_update')->unsigned()->nullable();
            $table->timestamps();
        });
        Schema::table('penduduk', function (Blueprint $table){
            $table->foreign('user_id') //id kelas
                  ->references('id')    //dapat ref id
                  ->on('users')         //dari tabel kelas
                  ->onDelete('cascade')
                  ->onUpdate('cascade');

            $table->foreign('user_update') //id kelas
                  ->references('id')    //dapat ref id
                  ->on('users')         //dari tabel kelas
                  ->onDelete('cascade')
                  ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('penduduk');
    }
}
