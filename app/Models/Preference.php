<?php 

namespace App\Models;
use Request;
use DB;

class Preference extends Model {
    public static $table = 'user_preference';
    public static $key = 'user_preference_id';

	// public static function getAllCategories() {
	// 	$results = DB::select('
	// 		select * 
	// 		from category 
	// 		');
	// 	return $results;
	// }

	public static function getAllPreferencesByCategory($cat_id) {
		$results = DB::select('
			select * 
			from user_preference
			where category_id = :category_id 
			', [':category_id'=>$cat_id] );
		$prefs = new Collection();
		foreach($results as $result) {
			$pref = new Preference();
			$pref->id = $result->user_preference_id;
			$pref->user_id = $result->user_id;
			$pref->category_id = $result->category_id;
			$pref->preference_name = $result->preference_name;
			$prefs->add($pref);

		}
		return $prefs;
	}
}