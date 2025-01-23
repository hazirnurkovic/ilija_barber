<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CosmeticsSaleUpdateRequest extends FormRequest
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
            'cosmetics_warehouse_id' => 'required|integer',
            'quantity' => 'required|numeric',
            'sell_price' => 'required|numeric',
            'date' => 'required|date',
            'name' => 'string'
        ];
    }

    public function messages(): array
    {
        return [
            'cosmetics_warehouse_id.required' => 'Artikal je obavezan',
            'quantity.required' => 'Količina je obavezna',
            'sell_price.required' => 'Cijena je obavezna',
            'date.required' => 'Datum je obavezan',
            'cosmetics_warehouse_id.integer' => 'Nepravilan format za artikal',
            'sell_price.numeric' => 'Cijena mora biti broj',
            'quantity.numeric' => 'Količina mora biti broj',
            'date.date' => 'Datum mora biti u formatu YYYY-MM-DD',
        ];
    }
}
