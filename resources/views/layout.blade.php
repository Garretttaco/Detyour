<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Detyour</title>
	<link rel="stylesheet" href="<?php echo asset('css/app.css')?>" type="text/css">
	<link rel="stylesheet" href="<?php echo asset('css/styles.css')?>" type="text/css">
	<script src="../js/main.js"></script>
</head>
<body>
	
	@section('header')
	
	<header>
		
		<div >
			
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