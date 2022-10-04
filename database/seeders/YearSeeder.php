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

        // WRITE TO THE DB
        $year = new Year;
        $year->name = 2021;
        $year->grade = "vol. 10";
        $year->from = "2021-11-05";
        $year->to = "2021-11-07";
        $year->fest_description = "Po desáté, po druhé v Bělči, vlna nekompromisní muziky napříč žánry, podzimní pohoda, setkání. KAPELY/PROJEKCE/OPEN MIC/DJs/SAUNA/POEZIE/FILM";
        $year->fest_price_friday = 250;
        $year->fest_price_saturday = 350;
        $year->fest_price_all = 450;
        $year->fest_price_friday_student = 200;
        $year->fest_price_saturday_student = 300;
        $year->fest_price_all_student = 350;
        $year->save();
    }
}
