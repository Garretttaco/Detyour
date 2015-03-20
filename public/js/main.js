$(function(){

	$('.show-menu').on('click', function(){
		$('.primary-menu').toggleClass('show');
		$('.fa-bars').addClass('hide');
	});
	$('.show-bottom-menu').on('click', function(){
		$('.detour-menu').toggleClass('show');
		$('.footer').addClass('hide');
	});


	$(document).on('change', '.category-all', function(){
		var cat_id = $('select[name=category]').val()
		$(this).parents('.content').addClass('expand');

		var url = '/preference/' + cat_id;
		 $.ajax({    //create an ajax request 
		 	type: "GET",
		        //i need to get the category_id sent to a controller from here in order
		        //to use Ajax to retrieve the choices pertaining to that specific category
		        url: "/preference/" + cat_id,
		        dataType: 'json',            
		          //expect json to be returned                
		          success: function(response){
		          	var preference = {'tag':'input','html':'${title}'};
		          	console.log(preference);
		          	var pref = $('.pref-append');
		          	pref.html('');
		          	response.forEach(function(preference){
		          		pref.append('<input type="text" name="' + preference.user_preference_id + '" value="' + preference.preference_name + '">');
		          	});


		          }

		      });
		});

	if (window.location.pathname == '/map') {
		

		
		var map;

		function initialize() {
			var mapOptions = {
				zoom: 12
			};
			map = new google.maps.Map(document.getElementById('map-canvas'),
				mapOptions);

	  // Try HTML5 geolocation
	  if(navigator.geolocation) {
	  	navigator.geolocation.getCurrentPosition(function(position) {
	  		var pos = new google.maps.LatLng(position.coords.latitude,
	  			position.coords.longitude);

	  		var infowindow = new google.maps.InfoWindow({
	  			map: map,
	  			position: pos,
	  			content: 'Location found using HTML5.'
	  		});

	  		map.setCenter(pos);
	  	}, function() {
	  		handleNoGeolocation(true);
	  	});
	  } else {
	    // Browser doesn't support Geolocation
	    handleNoGeolocation(false);
	}
	}

	function handleNoGeolocation(errorFlag) {
		if (errorFlag) {
			var content = 'Error: The Geolocation service failed.';
		} else {
			var content = 'Error: Your browser doesn\'t support geolocation.';
		}

		var options = {
			map: map,
			position: new google.maps.LatLng(33.4274381, -111.9344787),
			content: content
		};

		var infowindow = new google.maps.InfoWindow(options);
		map.setCenter(options.position);
	}

	google.maps.event.addDomListener(window, 'load', initialize);

	}

});