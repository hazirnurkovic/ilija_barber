<?php declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * @method static static EMPTY()
 * @method static static CREATED()
 * @method static static CONCLUDED()
 */
final class AppointmentStatusEnum extends Enum
{
    const EMPTY = 1;
    const CREATED = 2;
    const CONCLUDED = 3;
}
