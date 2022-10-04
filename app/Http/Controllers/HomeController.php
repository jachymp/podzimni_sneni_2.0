<?php

namespace App\Http\Controllers;

use App\Models\LineUp;
use App\Models\Year;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(){

        $description = Year::orderBy('id', "desc")->first();
        $bands = LineUp::with('place')
            ->where('year_id', $description->id)
            ->orderBy('rank', 'desc')
            ->get();
        $lineupF = LineUp::with('place')
            ->where('year_id', $description->id)
            ->where('day', 'Pátek')
            ->orderBy('night_order', 'asc')
            ->orderBy('time_from', 'asc')
            ->get();
        $lineupS = LineUp::with('place')
            ->where('year_id', $description->id)
            ->where('day', 'Sobota')
            ->orderBy('night_order', 'asc')
            ->orderBy('time_from', 'asc')
            ->get();

        return view('home/index',
            compact("description", "bands", "lineupF", "lineupS"));
    }
}
