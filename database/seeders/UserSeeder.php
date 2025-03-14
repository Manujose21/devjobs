<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table( 'users' )->insert([
            "name" => "Manuel",
            "email" => "manuel@mail.com",
            "password" => Hash::make("password"),
            "rol" => 2
        ]); 
         
        DB::table( 'users' )->insert([
            "name" => "Mario",
            "email" => "Mario@mail.com",
            "password" => Hash::make("password"),
            "rol" => 2
        ]); 

        DB::table( 'users' )->insert([
            "name" => "pedro",
            "email" => "pedro@mail.com",
            "password" => Hash::make("password"),
            "rol" => 1
        ]);     

        DB::table( 'users' )->insert([
            "name" => "juan",
            "email" => "juan@mail.com",
            "password" => Hash::make("password"),
            "rol" => 1
        ]);  

        DB::table( 'users' )->insert([
            "name" => "carlos",
            "email" => "carlos@mail.com",
            "password" => Hash::make("password"),
            "rol" => 1
        ]);   
    }
}
