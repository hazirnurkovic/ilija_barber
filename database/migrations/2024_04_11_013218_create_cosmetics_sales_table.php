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
        Schema::create('cosmetics_sales', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cosmetics_warehouse_id');
            $table->integer('quantity');
            $table->float('sell_price');
            $table->date('date');
            $table->float('total');
            $table->foreignId('cosmetics_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cosmetics_sales');
    }
};
