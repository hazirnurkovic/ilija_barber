<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCosmeticsProcurementRequest extends FormRequest
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
            'cosmetics_id'      => 'required|integer',
            'quantity'          => 'required|integer',
            'purchase_price'    => 'required|numeric',
        ];
    }

    public function messages(): array
    {
        return [
            'cosmetics_id.required'     => 'Artikal je obavezan',
            'quantity.required'         => 'Količina je obavezna',
            'purchase_price.required'   => 'Cijena je obavezna',
        ];
    }
}
