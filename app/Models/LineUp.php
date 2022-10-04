<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LineUp extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'date', 'time_from', 'time_to', 'description', 'place_id', 'link', 'year_id', 'rank'];

    public function year()
    {
        return $this->belongsTo(Year::class);
    }

    public function place()
    {
        return $this->belongsTo(Place::class);
    }
}
