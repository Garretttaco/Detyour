<?php

Route::get('/', function(){
	return view('login');
});

//Returns all preferences as a JavaScript object 'JSON' 
Route::get('/map', 'PreferenceController@getPreferences');

Route::get('/settings', function(){
	return view('settings');
});
Route::get('/about', function(){
	return view('about');
});

//Gets all categories for select box on preference page
Route::get('/preference', 'PreferenceController@getCategories');

//Gets all preferences for the preference clicked on
Route::get('/preference/{id}', 'AjaxController@getPreferences');


Route::get('home', 'HomeController@index');

Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',
]);
