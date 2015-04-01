<?php 

namespace App\Models;
use Request;
use DB;

class Preference extends Model {
    public static $table = 'user_preference';
    public static $key = 'user_preference_id';

    /***************************************************
	RETURNS ALL THE PREFERENCES FOR A SPECIFIC CATEGORY
	****************************************************/
	public static function getAllPreferencesByCategory($cat_id) {
		$results = DB::select('
			select * 
			from user_preference
			where category_id = :category_id 
			', [':category_id'=>$cat_id] );
		$prefs = new Collection();
		foreach($results as $result) {
			$pref = new Preference();
			$pref->setData($result->{static::$key}, (array)$result);
			$prefs->add($pref);

		}
		return $prefs;
	}
}