<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Detyour</title>
	<link rel="stylesheet" href="<?php echo asset('css/normalize.css')?>" type="text/css">
	<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
	<link rel="stylesheet" href="<?php echo asset('css/styles.css')?>" type="text/css">
	<script src="../js/main.js"></script>
</head>
<body>
	
	@section('header')
	
	<header>
		
		<div >
			<div>
				<h1>MENU <i class="fa fa-bars"></i></h1>
			</div>	
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