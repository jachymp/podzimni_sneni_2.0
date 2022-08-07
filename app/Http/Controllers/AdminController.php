<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LineUp;
use App\Models\Place;
use App\Models\Year;

class AdminController extends Controller
{
    // ENTRY POINT FOR REACT
    public function index()
    {
        return view('admin/index');
    }

    // PREPARE DATA FOR PLACE DROPDOWN IN BAND FORM
    public function sendPlaceData()
    {
        $formDataPlace = Place::select('id', 'name')->get();

        return $formDataPlace;
    }

    // PREPARE DATA FOR CURRENT LINEUP
    public function sendLineUpData()
    {
        // get last inserted year from DB
        $year_last = Year::orderBy('id', 'desc')->first();

        $bands = LineUp::with('place')
            ->orderBy('place_id', 'asc')
            ->orderBy('date', 'asc')
            ->orderBy('time_from', 'asc')
            ->where('year_id', $year_last->id)
            ->get();

        return $bands;
    }

    // PREPARE DATA FOR FRONTEND CONTENT
    public function sendYearData()
    {
        $year_last = Year::orderBy('id', 'desc')->first();

        return $year_last;

    }

    // SAVE YEAR'S DATA TO THE DB -> FROM REACT
    public function storeYear(Request $request)
    {
        $data = $request->all();

        $this->yearUniqueValidation($request);
        $this->yearValidation($request);

        Year::create($data);
    }

    // SAVE BAND'S DATA TO THE DB -> FROM REACT
    public function storeBands(Request $request)
    {

        $data = $request->all();


        // DATA IN ARRAY
        foreach($data as $item){

            // $this->lineupValidation($item->name);

            LineUp::create($item);
        }
    }

    // UPDATE YEAR DATA
    public function updateYear(Request $request, $id)
    {
        $year = Year::findOrFail($id);

        $data = $request->all();

        $this->yearValidation($request);

        $year->update($data);

        session()->flash('success_message', 'Hmmm ty draku, uloženo!');
    }

    // DELETE BAND
    public function deleteBand($id)
    {
        $band = LineUp::findOrFail($id);

        $band->delete();
    }

    // UPDATE BAND
    public function updateBand(Request $request, $id)
    {
        $data = $request->all();

        $band = LineUp::findOrFail($id);

        $this->lineupValidation($request);

        $band->update($data);

    }

    public function yearValidation(Request $request)
    {
        $this->validate($request, [
            'name'=> 'required|numeric|digits:4',
            'grade' => 'required'

        ], [
            'name.required' => "Vyplň rok, prosím.",
            'name.numeric' => "Rok se skládá pouze z čísel.",
            'name.digits' => "Rok má celkem 4 číslice.",
            'name.unique' => "Tenhle rok už existuje.",
            'grade.required' => "Vyplň ročník, prosím.",
        ]);
    }

    public function yearUniqueValidation(Request $request)
    {
        $this->validate($request, [
            'name'=> 'unique:years,name'

        ], [
            'name.unique' => "Tenhle rok už existuje."
        ]);
    }

    public function lineupValidation(Request $request)
    {
        $this->validate($request, [
            'name'=> 'required'

        ], [
            'name.required' => "Vyplň jméno interpreta, prosím.",
        ]);
    }
}
