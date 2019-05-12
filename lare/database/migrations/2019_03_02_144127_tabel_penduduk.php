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
            $table->date('ttl');
            $table->enum('jk',['pria','wanita']);
            $table->enum('goldar',['O','A','B','AB'])->nullable();
            $table->enum('agama',['islam','kristen katolik','kristen protestan','hindu','buddha','konghucu']);
            $table->enum('perkawinan',['Menikah','Belum Menikah']);
            // $table->integer('goldar')->unsigned()->nullable();
            // $table->integer('agama')->unsigned();
            // $table->integer('perkawinan')->unsigned();
            $table->string('alamat');
            $table->string('warga',20);
            $table->string('pekerjaan');
            $table->string('ayah',50);
            $table->string('ibu',50);
            $table->string('foto',30)->nullable();
            $table->integer('user_id')->unsigned();
            $table->integer('user_update')->unsigned()->nullable();
            $table->timestamps();
        });
        Schema::table('penduduk', function (Blueprint $table){
            $table->foreign('user_id') //id kelas
                  ->references('id')    //dapat ref id
                  ->on('users')         
                  ->onDelete('cascade')
                  ->onUpdate('cascade');

            $table->foreign('user_update') //id kelas
                  ->references('id')    //dapat ref id
                  ->on('users')         
                  ->onDelete('cascade')
                  ->onUpdate('cascade');
            // $table->foreign('goldar')
            //       ->references('id')    //dapat ref id
            //       ->on('data_ktp')         
            //       ->onDelete('cascade')
            //       ->onUpdate('cascade');
            // $table->foreign('agama')
            //       ->references('id')    //dapat ref id
            //       ->on('data_ktp')         
            //       ->onDelete('cascade')
            //       ->onUpdate('cascade');
            //       $table->foreign('goldar')
            //       ->references('id')    //dapat ref id
            //       ->on('data_ktp')         
            //       ->onDelete('cascade')
            //       ->onUpdate('cascade');

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
