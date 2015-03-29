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
				<h1><span>MENU</span> <i class="fa fa-bars"></i></h1>
			</div>	
		</div>
		<div class="dest-search">
			<input id="dest-input" class="controls" type="text" placeholder="Enter the address to search">
		</div>
	</header>
	@endsection

@section('main_content')
 	<div class="main-container">
      <input id="way-input" class="controls" type="text" placeholder="Search detour">
 		<div id="map-canvas" class="content"></div>
 	</div>


@endsection

@section('footer')
	<div class="show-bottom-menu">
		<p class="bottom-menu">Detyour</p>
		</div>
		<div class="detour-menu">
		<div class="gas menu " detour="gas_station">
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