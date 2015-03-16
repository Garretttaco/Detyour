<?php



// Route::get('/', 'WelcomeController@index');
Route::get('/', function(){
	return view('Map');
});

Route::get('home', 'HomeController@index');

Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',
]);
