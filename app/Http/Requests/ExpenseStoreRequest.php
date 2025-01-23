<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ExpenseStoreRequest extends FormRequest
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
            'name'  => 'required|string|max:255',
            'price' => 'required|numeric',
            'date'  => 'required|date'
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Polje naziv je obavezno',
            'name.max' => 'Polje naziv ne smije biti veće od 255 karaktera',
            'price.required' => 'Polje cijena je obavezno',
            'price.numeric' => 'Nepravilan format za polje cijena',
            'date.required' => 'Polje datum je obavezno',
            'date.date' => 'Nepravilan format za polje datum'
        ];
    }
}
