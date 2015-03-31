<?php namespace App\Http\Controllers;

use DB;
use App\Models\Category;
use App\Models\Preference;
use Request;

class PreferenceController extends Controller {

	public function getCategories() {
		$all_cat = Category::all();
		return view('preference', ['categories'=>$all_cat]);

	}

	public function getPreferences() {
		$all_prefs = Preference::all();
		$pref_map = [
			'1' => 'food',
			'2' => 'gas',
			'3' => 'attractions'
		];
		$prefs = [
			'gas' => [],
			'food' => [],
			'attractions' => []
		];
		foreach($all_prefs->getArray() as $pref) {
			$key = $pref_map[$pref->category_id];
			$prefs[$key][] = $pref->preference_name;
		}
		// print_r($prefs);
		
		return view('Map', ['preferences'=>json_encode($prefs)]);


	}
}
