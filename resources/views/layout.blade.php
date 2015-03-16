<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Final Project</title>
	<link rel="stylesheet" href="<?php echo asset('css/app.css')?>" type="text/css">
	<link rel="stylesheet" href="<?php echo asset('css/styles.css')?>" type="text/css">
	<script src="../JavaScript/main.js"></script>
</head>
<body>
	
	@section('header')
	
	<header>
		
		<div>
			header here
		</div>
	</header>
	@show
	<main>
		@yield('main_content')
	</main>
	
	<footer>
		@section('footer')
			<div>
				&copy 2015: 
				Created By Garrett Tacoronte
			</div>
		@show
	</footer>
</body>
</html>