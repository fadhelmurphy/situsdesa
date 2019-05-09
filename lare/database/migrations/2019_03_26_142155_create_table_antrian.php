<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableAntrian extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('antrian', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('no_antrian');
            $table->date('panggil')->nullable();
            $table->boolean('status');
            $table->integer('desa_id')->unsigned()->nullable();
            $table->integer('user_id')->unsigned()->nullable();;
            $table->timestamps();
        });
        
        Schema::table('antrian', function (Blueprint $table){
            $table->foreign('desa_id') //id kelas
                  ->references('id')    //dapat ref id
                  ->on('desa')         //dari tabel kelas
                  ->onDelete('cascade')
                  ->onUpdate('cascade');
            $table->foreign('user_id') //id kelas
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
        Schema::dropIfExists('antrian');
    }
}
