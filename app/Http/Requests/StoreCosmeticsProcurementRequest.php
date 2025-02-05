<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCosmeticsProcurementRequest extends FormRequest
{

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
            'date'              => 'required|date',
            'name'              => 'required|string',
        ];
    }

    public function messages(): array
    {
        return [
            'cosmetics_id.required'     => 'Artikal je obavezan',
            'quantity.required'         => 'Količina je obavezna',
            'purchase_price.required'   => 'Cijena je obavezna',
            'date.required'             => 'Datum je obavezan',
            'name.required'             => 'Naziv je obavezno',
        ];
    }
}
