<?php

namespace Database\Factories;

use App\Enums\AppointmentStatusEnum;
use App\Models\Appointment;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Appointment>
 */
class AppointmentFactory extends Factory
{
    protected $model = Appointment::class;

    private static $timeOffsets = [];

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $userId = $this->faker->numberBetween(1, 3);
        $date = Carbon::now()->format('Y-m-d');
        $baseDate = (string)$date.' 09:00:00';

        if (!isset(self::$timeOffsets[$userId])) {
            self::$timeOffsets[$userId] = 0;
        }

        $startDate = date('Y-m-d H:i:s', strtotime($baseDate . " + " . (self::$timeOffsets[$userId] * 30) . " minutes"));
        $endDate = date('Y-m-d H:i:s', strtotime($startDate . ' + 30 minutes'));

        self::$timeOffsets[$userId]++;

        return [
            'customer_name' => $this->faker->name(),
            'user_id' => $userId,
            'start_date' => $startDate,
            'end_date' => $endDate,
            'price' => $this->faker->randomFloat(2, 50, 200), // Example price range
            'status' => AppointmentStatusEnum::CREATED,
            'date' => $date,
        ];
    }
}
