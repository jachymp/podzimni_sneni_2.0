<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLineUpsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('line_ups', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->date('date')->nullable();
            $table->time('time_from')->nullable();
            $table->time('time_to')->nullable();
            $table->text('description')->nullable();
            $table->string('link')->nullable();
            $table->foreignId('place_id')->nullable();
            $table->foreignId('year_id');
            $table->integer('rank')->nullable();;
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('line_ups');
    }
}
