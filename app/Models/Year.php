<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Year extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'grade', 'from', 'to', 'fest_description',
        'fest_price_friday', 'fest_price_saturday', 'fest_price_all',
        'fest_price_friday_student', 'fest_price_saturday_student', 'fest_price_all_student',
        'lineup_public'];

    public function lineups()
    {
        return $this->hasMany(LineUp::class);
    }
}
