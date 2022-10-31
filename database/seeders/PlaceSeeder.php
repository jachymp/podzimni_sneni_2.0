<?php

namespace Database\Seeders;

use App\Models\Place;
use Illuminate\Database\Seeder;
use DB;

class PlaceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('places')->truncate();

        $stages = ['Jídelna', 'Pelarka', 'Modul', 'Tábor', 'Sklad', 'Sedmík'];

        foreach($stages as $stage) {
            $place = new Place();
            $place->name = $stage;
            $place->save();
        }
    }
}
