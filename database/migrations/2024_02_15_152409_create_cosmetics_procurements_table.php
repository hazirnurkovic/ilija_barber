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
        Schema::create('cosmetics_procurements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cosmetics_id');
            $table->integer('quantity');
            $table->float('purchase_price');
            $table->date('date');
            $table->float('total');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cosmetics_procurements');
    }
};
