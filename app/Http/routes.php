<?php



// Route::get('/', 'WelcomeController@index');
Route::get('/', function(){
	return view('menu');
});
Route::get('/map', function(){
	return view('Map');
});
Route::get('/settings', function(){
	return view('settings');
});
Route::get('/about', function(){
	return view('about');
});
Route::get('/preference', 'PreferenceController@getCategories');
Route::get('/preference/{id}', 'AjaxController@getPreferences');

Route::get('home', 'HomeController@index');

Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',
]);
