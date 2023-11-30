<?php

namespace Database\Factories;

use App\Models\Appointment;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Appointment>
 */
class AppointmentFactory extends Factory
{
    protected $model = Appointment::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'customer_name' => $this->faker->name(),
            'user_id' => 1,
            'start_date' => $this->faker->dateTime(),
            'end_date' => $this->faker->dateTime(),
            'price' => $this->faker->randomFloat(),
            'status' => 1,
            'date' => $this->faker->date('d.m.Y')
        ];
    }
}
