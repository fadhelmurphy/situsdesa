<?php

use Illuminate\Database\Seeder;
use App\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        DB::table('roles')->insert([
            ['keterangan'=>'sa-admin'],
            ['keterangan'=>'admin']
        ]);
        DB::table('users')->insert([
            ['name'=>'sa-admin','email'=>'sadmin@test.com','password'=>bcrypt('12345'),'role_id'=>1],
            ['name'=>'admin','email'=>'admin@test.com','password'=>bcrypt('12345'),'role_id'=>2]

        ]);
    }
}
