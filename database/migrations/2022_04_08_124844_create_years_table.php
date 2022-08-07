<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateYearsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('years', function (Blueprint $table) {
            $table->id();
            $table->integer('name')->unique();
            $table->string('grade');
            $table->date('from')->nullable();
            $table->date('to')->nullable();
            $table->text('fest_description')->nullable();
            $table->integer('fest_price_friday')->nullable();
            $table->integer('fest_price_saturday')->nullable();
            $table->integer('fest_price_all')->nullable();
            $table->integer('fest_price_friday_student')->nullable();
            $table->integer('fest_price_saturday_student')->nullable();
            $table->integer('fest_price_all_student')->nullable();
            $table->boolean('lineup_public')->nullable();
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
        Schema::dropIfExists('years');
    }
}
