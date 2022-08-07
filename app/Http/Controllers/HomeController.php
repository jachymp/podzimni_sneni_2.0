<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Year;
use App\Models\LineUp;

class HomeController extends Controller
{
    // entry from React - Homepage
    public function index() {
        return view('home/index');
    }

    public function sendSortedBands()
    {
        $last_year = Year::orderBy("id", "desc")->first();

        $bands = LineUp::with('place')
            ->where('year_id', $last_year->id)
            ->orderBy('rank', 'desc')
            ->get();

        return $bands;
    }
}
