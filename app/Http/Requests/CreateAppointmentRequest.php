<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateAppointmentRequest extends FormRequest
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
            'start_date'    => 'required',
            'end_date'      => 'required',
            'user_id'       => 'required|integer',
            'customer_name' => 'required|string',
            'price'         => 'nullable|numeric',
            'status'        => 'required|integer'
        ];
    }

    public function messages(): array
    {
        return [
            'start_date.required'    => 'Početni datum je obavezan',
            'end_date.required'      => 'Završni datum je obavezan',
            'user_id.required'       => 'Korisnik je obavezan',
            'customer_name.required' => 'Ime klijenta je obavezno',
            'price.numeric'          => 'Cijena mora imati brojnu vrijednost',
            'status.required'        => 'Status je obavezan',
        ];
    }
}
