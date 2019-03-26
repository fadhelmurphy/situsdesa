<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BeritaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'judul'=>'required|string|max:40',
            'isi'=>'required|string|max:2000',
            'foto'=>'image|mimes:jpeg,png|dimensions:min_width=200,min_height=100|max:2000'
        ];
    }
    public function messages(){
        return[
            'judul.required'=>'jr',
            'isi.required'=>'ir',
            'judul.string'=>'js',
            'isi.string'=>'is',
            'foto.image'=>'fi',
            'foto.mimes'=>'fm',
            'foto.dimension'=>'minimum 200 x100'

        ];
    }
}
