<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ConcludeAppointmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'appointment_id' => ['required', 'integer'],
            'price' => ['required', 'numeric'],
            'customer_name' => ['required', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'appointment_id.required' => 'Pogrešan termin!',
            'price.required' => 'Cijena mora biti unijeta',
            'customer_name.required' => 'Ime klijenta mora biti popunjeno',
        ];    
    }
}
