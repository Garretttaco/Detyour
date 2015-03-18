<?php



// Route::get('/', 'WelcomeController@index');
Route::get('/', function(){
	return view('menu');
});
Route::get('/map', function(){
	return view('Map');
});
Route::get('/preference', function(){
	return view('preference');
});

Route::get('home', 'HomeController@index');

Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',
]);
