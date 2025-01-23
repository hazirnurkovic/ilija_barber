<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Appointment;

class AppointmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Generate appointments for 3 users with 24 appointments each
        foreach (range(1, 3) as $userId) {
            Appointment::factory()
                ->count(24) // 24 appointments per user
                ->create(); // Factory logic already handles user assignment
        }
    }
}
