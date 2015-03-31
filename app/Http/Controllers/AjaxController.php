<?php namespace App\Http\Controllers;

use DB;
use App\Models\Preference;
use Request;

class AjaxController extends Controller {

	public function getPreferences($cat_id) {
		$all_pref = Preference::getAllPreferencesByCategory($cat_id);

		return $all_pref->getArrayDeep();

	}
}
