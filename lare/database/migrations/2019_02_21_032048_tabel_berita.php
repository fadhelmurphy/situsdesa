<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class TabelBerita extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('berita', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->string('judul');
            $table->string('isi');
            $table->integer('user_update')->unsigned()->nullable();
            $table->string('foto');
            $table->timestamps();
            
        });
        Schema::table('berita', function (Blueprint $table){
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
        Schema::dropIfExists('berita');
    }
}
