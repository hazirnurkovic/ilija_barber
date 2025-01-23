<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FinanceStoreRequest extends FormRequest
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
            'date' => 'required|date',
            'amount' => 'required|numeric'
        ];
    }

    public function messages(): array
    {
        return [
            'date.required' => 'Datum je obavezan',
            'amount.required' => 'Iznos je obavezan',
            'amount.numeric' => 'Iznos mora biti broj',
            'date.date' => 'Datum mora biti u formatu YYYY-MM-DD'
        ];
    }
}
