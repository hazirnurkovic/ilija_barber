<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('barber_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->integer('month');
            $table->integer('year');
            $table->float('total');
            $table->timestamp('target_achieved_at')->nullable()->default(null);
            $table->float('difference_amount')->nullable()->default(0);
            $table->foreignId('appointment_id')->nullable();
            $table->dateTime('start_date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('barber_details');
    }
};
