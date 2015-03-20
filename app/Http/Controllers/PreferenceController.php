<?php namespace App\Http\Controllers;

use DB;
use App\Models\Category;
use Request;

class PreferenceController extends Controller {

	public function getCategories() {
		$all_cat = Category::all();
		return view('preference', ['categories'=>$all_cat]);

	}
}
