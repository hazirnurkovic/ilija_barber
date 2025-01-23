<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCosmeticsRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'status' => 'required|integer'
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Polje naziv je obavezno',
            'name.max' => 'Polje naziv ne smije biti veće od 255 karaktera',
            'status.required' => 'Polje status je obavezno',
            'status.integer' => 'Nepravilan format za polje status'
        ];
    }
}
