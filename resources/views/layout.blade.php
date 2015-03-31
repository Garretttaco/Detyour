<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="initial-scale=1.0, user-scalable=no">
	<title>Detyour</title>
	<link rel="stylesheet" href="<?php echo asset('css/normalize.css')?>" type="text/css">
	<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
	<link rel="stylesheet" href="<?php echo asset('css/styles.css')?>" type="text/css">
	<script src="<?php echo asset('./bower_components/jquery/dist/jquery.js')?>"></script>
	<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places"></script>
	<script src="../js/Script.js"></script>
</head>
<body>

	@section('header')
	<div class="primary-menu">
		<a href="/map" class="maps menu">
			<p>Maps</p>
		</a>
		<a href="/preference" class="preference menu">
			<p>Preferences</p>
		</a>
		<a href="/" class="settings menu">
			<p>Settings</p>
		</a>
		<a href="/about" class="about menu">
			<p>About</p>
		</a>
	</div>
	
	<header>
		
		<div >
			<div class="show-menu">
				<h1><span>MENU</span> <i class="fa fa-bars"></i></h1>
			</div>	
		</div>
	</header>
	@show
	<main>
		@yield('main_content')
	</main>
	
	<footer>
		@section('footer')
		<div class="footer-template">
			&copy 2015: 
			Created By Garrett Tacoronte
		</div>
		@show
	</footer>
</body>
</html>