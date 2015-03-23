@extends('layout')

@section('header')
	<div class="primary-menu">
		<div class="maps menu">
			<p>Maps</p>
		</div>
		<div class="preference menu">
			<p>Preferences</p>
		</div>
		<div class="settings menu">
			<p>Settings</p>
		</div>
		<div class="about menu">
			<p>About</p>
		</div>
	</div>
	
	<header>
		
		<div >
			<div class="show-menu">
				<h1>MENU <i class="fa fa-bars"></i></h1>
			</div>	
		</div>
 	<input id="search" type="text" placeholder="Search Box">
	</header>
	@endsection

@section('main_content')
 	<div class="main-container">
 		<div id="map-canvas" class="content">
	 		
 		</div>
 	</div>


@endsection

@section('footer')
	<div class="show-bottom-menu">
		<p class="bottom-menu">Detyour</p>
		</div>
		<div class="detour-menu">
		<div class="gas menu">
			<p>Gas Stations</p>
		</div>
		<div class="restaurants menu">
			<p>Restaurants</p>
		</div>
		<div class="attractions menu">
			<p>Attractions</p>
		</div>
	</div>
@endsection