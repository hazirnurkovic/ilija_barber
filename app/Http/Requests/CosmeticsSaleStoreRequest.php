<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CosmeticsSaleStoreRequest extends FormRequest
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
            'quantity' => 'required|integer',
            'sell_price' => 'required|numeric',
            'date' => 'required|date',
            'name' => 'string|nullable',
        ];
    }

    public function messages(): array
    {
        return [
            'cosmetics_warehouse_id.required' => 'Artikal iz magacina je obavezan',
            'quantity.required' => 'Količina je obavezna',
            'sell_price.required' => 'Cijena je obavezna',
            'date.required' => 'Datum je obavezan',
            'name.string' => 'Naziv mora biti tekstualnog karaktera',
            'cosmetics_warehouse_id.integer' => 'Nepravilan format za artikal iz magacina',
            'quantity.integer' => 'Nepravilan format za količinu',
            'sell_price.numeric' => 'Nepravilan format za cijenu',
        ];
    }
}
