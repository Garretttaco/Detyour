<?php namespace App\Http\Controllers;

use DB;
use App\Models\Category;
use App\Models\Preference;
use Request;

class PreferenceController extends Controller {

	/**********************************
	COMMUNICATES WITH CATEGORY MODEL 
	***********************************/
	public function getCategories() {

		//Gets all categories from model
		$all_cat = Category::all();
		return view('preference', ['categories'=>$all_cat]);
	}

	/**********************************
	COMMUNICATES WITH PREFERENCE MODEL 
	***********************************/
	public function getPreferences() {

		$all_preferences = Preference::all();

		//Build structure for UI
		$group_preferences = [
			'gas' => [],
			'food' => [],
			'attractions' => []
		];

		//Places the preferences in the appropriate category array
		foreach($all_preferences->getArray() as $pref) {
			$this->addPreferencesToGroup($pref, $group_preferences);
		}
		
		//Returns a JSON string on page load to later be used as a JavaScript object
		return view('Map', ['preferences'=>json_encode($group_preferences)]);
	}

	private function addPreferencesToGroup($preference, &$group) {

		//determine preference group name
		$category_assignment = [
			'1' => 'food',
			'2' => 'gas',
			'3' => 'attractions'
		];
		$group_name = $category_assignment[$preference->category_id];

		//add preference to group item
		$group[$group_name][] = $preference->preference_name;
	}
}
