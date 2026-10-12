<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTicketRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
{
    return $this->user() !== null
        && $this->user()->can('update', $this->route('ticket'));
}

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'min:5', 'max:255'],
            'description' => ['required', 'string', 'min:10'],
            'priority' => [
                'required',
                Rule::in(['Low', 'Medium', 'High', 'Urgent']),
            ],
            'status' => [
                'required',
                Rule::in(['Open', 'In Progress', 'Resolved', 'Closed']),
            ],
            'category' => [
                'required',
                Rule::in(['Hardware', 'Software', 'Network', 'Account', 'Other']),
            ],
        ];
    }
}
