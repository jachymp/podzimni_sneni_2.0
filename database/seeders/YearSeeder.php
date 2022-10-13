<?php

namespace Database\Seeders;

use App\Models\Year;
use Illuminate\Database\Seeder;
use DB;

class YearSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('years')->truncate();

        $allYears = json_decode(file_get_contents(storage_path('years.json')));

        // WRITE TO THE DB
        foreach ($allYears as $yearData) {
            $year = new Year;
            $year->name = $yearData->name;
            $year->grade = $yearData->grade;
            $year->from = $yearData->from;
            $year->to = $yearData->to;
            $year->fest_description = $yearData->fest_description;
            $year->fest_price_friday = $yearData->fest_price_friday;
            $year->fest_price_saturday = $yearData->fest_price_saturday;
            $year->fest_price_all = $yearData->fest_price_all;
            $year->fest_price_friday_student = $yearData->fest_price_friday_student;
            $year->fest_price_saturday_student = $yearData->fest_price_saturday_student;
            $year->fest_price_all_student = $yearData->fest_price_all_student;
            $year->lineup_public = $yearData->lineup_public;
            $year->accomodation_link = $yearData->accomodation_link;
            $year->ticket_link = $yearData->ticket_link;
            $year->save();
        }
    }
}
