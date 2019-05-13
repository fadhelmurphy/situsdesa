<?php

use Illuminate\Database\Seeder;
use App\User;
use Carbon\Carbon;

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
            ['keterangan'=>'sa-admin', 'created_at'=>Carbon::now()],
            ['keterangan'=>'admin', 'created_at'=>Carbon::now()],
            ['keterangan'=>'staff', 'created_at'=>Carbon::now()],
        ]);
        DB::table('users')->insert([
            ['name'=>'sa-admin','email'=>'s-admin@test.com','password'=>bcrypt('12345'),'role_id'=>1,'created_at'=>Carbon::now()],
            ['name'=>'admin','email'=>'admin@test.com','password'=>bcrypt('12345'),'role_id'=>2,'created_at'=>Carbon::now()]

        ]);
        DB::table('antrian')->insert([
            ['no_antrian'=>1,'status'=>0,'created_at'=>'2019-05-12 11:00:00'],
            ['no_antrian'=>2,'status'=>0,'created_at'=>'2019-05-12 11:01:00'],
            ['no_antrian'=>3,'status'=>0,'created_at'=>'2019-05-12 11:02:00'],
            ['no_antrian'=>1,'status'=>0,'created_at'=>Carbon::now()],
            ['no_antrian'=>2,'status'=>0,'created_at'=>Carbon::now()],
            ['no_antrian'=>3,'status'=>0,'created_at'=>Carbon::now()],
        ]);
        // DB::table('berita')->insert([
        //     ['user_id'=>1,'judul'=>'HHHHHHH','isi'=>'<p>LOLOLOLOLOLLO</p>'],
        //     ['user_id'=>1,'judul'=>'HHHHHHH','isi'=>'<p>LOLOLOLOLOLLO</p>'],
        //     ['user_id'=>1,'judul'=>'HHHHHHH','isi'=>'<p>LOLOLOLOLOLLO</p>'],
        //     ['user_id'=>1,'judul'=>'HHHHHHH','isi'=>'<p>LOLOLOLOLOLLO</p>'],
        //     ['user_id'=>1,'judul'=>'HHHHHHH','isi'=>'<p>LOLOLOLOLOLLO</p>'],
        //     ['user_id'=>1,'judul'=>'HHHHHHH','isi'=>'<p>LOLOLOLOLOLLO</p>'],
        //     ['user_id'=>1,'judul'=>'HHHHHHH','isi'=>'<p>LOLOLOLOLOLLO</p>'],
        //     ['user_id'=>1,'judul'=>'HHHHHHH','isi'=>'<p>LOLOLOLOLOLLO</p>'],
        //     ['user_id'=>1,'judul'=>'HHHHHHH','isi'=>'<p>LOLOLOLOLOLLO</p>'],
        //     ['user_id'=>1,'judul'=>'HHHHHHH','isi'=>'<p>LOLOLOLOLOLLO</p>'],
        //     ['user_id'=>1,'judul'=>'HHHHHHH','isi'=>'<p>LOLOLOLOLOLLO</p>'],
        //     ['user_id'=>1,'judul'=>'HHHHHHH','isi'=>'<p>LOLOLOLOLOLLO</p>'],
        //     ['user_id'=>1,'judul'=>'HHHHHHH','isi'=>'<p>LOLOLOLOLOLLO</p>'],
        // ]);
        
        $arr=[];
        for($i=0;$i<12;$i++){
            $data=[
                'nama'=>'r'.$i,
                'nik'=>$i,
                'kk'=>$i,
                'tempatlahir'=>'jkt'.$i,
                'ttl'=>'2000-10-02',
                'jk'=>'pria',
                'agama'=>'hindu',
                'perkawinan'=>'Menikah',
                'alamat'=>'alamat'.$i,
                'warga'=>'ind'.$i,
                'ayah'=>'ayah'.$i,
                'ibu'=>'ibu'.$i,
                'pekerjaan'=>'kerja'.$i,
                'user_id'=>1
            ];
            array_push($arr,$data);
        }
        DB::table('penduduk')->insert(
            $arr
        );
    }
}
