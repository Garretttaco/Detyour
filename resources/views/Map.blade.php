@extends('layout')

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
		<div class="dest-search">
			<input id="dest-input" class="controls" type="text" placeholder="Enter the address to search">
		</div>
	</header>
	@endsection

@section('main_content')
 	<div class="main-container">
      <input id="way-input" class="controls" type="text" placeholder="Search detour">
 		<div id="map-canvas" class="content"></div>
 		<i class="fa fa-minus fa-rotate-90"></i>
 	</div>

 	<div id="directions-panel"></div>


@endsection

@section('footer')
	<div class="show-bottom-menu">
		<p class="bottom-menu">Detyour</p>
		</div>
		<div class="detour-menu">
		<div class="gas detour" data-detour="gas_station">
		
			<p>Gas Stations</p>
		</div>
		<div class="food detour" data-detour="restaurant food">
	
			<p>Restaurants</p>
		</div>
		<div class="attractions detour" data-detour="amusement_park art_gallery aquarium bowling_alley campground casino museum zoo">
		
			<p>Attractions</p>
		</div>
	</div>
	<script>
 		var preferences = {!! $preferences!!};
	</script>
@endsection