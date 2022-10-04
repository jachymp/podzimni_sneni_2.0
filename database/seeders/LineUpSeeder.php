<?php

namespace Database\Seeders;

use App\Models\LineUp;
use Illuminate\Database\Seeder;
use DB;

class LineUpSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('line_ups')->truncate();

        $bands2021 = json_decode(file_get_contents(storage_path('bands_2021.json')));

        foreach ($bands2021 as $band) {
            $lineup = new LineUp();
            $lineup->id = $band->id;
            $lineup->name = $band->name;
            $lineup->date = $band->date;
            $lineup->time_from = $band->time_from;
            $lineup->time_to = $band->time_to;
            $lineup->description = $band->description;
            $lineup->link = $band->link;
            $lineup->place_id = $band->place_id;
            $lineup->year_id = $band->year_id;
            $lineup->rank = $band->rank;
            $lineup->save();
        }
    }
}
