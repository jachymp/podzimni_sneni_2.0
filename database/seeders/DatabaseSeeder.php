<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(YearSeeder::class);
        $this->call(PlaceSeeder::class);
        $this->call(LineUpSeeder::class);
//        $this->call(HomeSeeder::class);
//        $this->call(RoomSeeder::class);
//        $this->call(BedSeeder::class);

    }
}
