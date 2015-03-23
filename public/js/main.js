$(function(){

	// This is the click event for the Primary menu to slide down
	$('.show-menu').on('click', function(){
		$('.primary-menu').toggleClass('show');
		$('.fa-bars').addClass('hide');
	});

	//This is the click event for the bottom detour menu to slide up
	$('.show-bottom-menu').on('click', function(){
		$('.detour-menu').toggleClass('show');
		$('.footer').addClass('hide');
	});

	//This is the event triggered when a user chooses/changes a category on the select tag
	$(document).on('change', '.category-all', function(){

		//Grabbing the category id from the selected option in the select tag 
		var cat_id = $('select[name=category]').val()

		//Triggers a CSS selector to dispaly block, overriding the display: none
		$(this).parents('.content').addClass('expand');

		//Making the Ajax call to retrieve the preferences per the category chosen without making a page refresh
		$.ajax({ 
			type: "GET",
		 	//laravel's router picks up the request per the sepcific url and sends it to the AjaxController
		 	url: "/preference/" + cat_id,
		        //Explicitly tells php to return the string in Json not html
		        dataType: 'json',
		        //response is what is returned from the controller                           
		        success: function(response){
		        	var preference = {'tag':'input','html':'${title}'};
		          	//asign where you are appending to a variable
		          	var pref = $('.pref-append');
		          	//clear the html in that space
		          	pref.html('');
		          	//loop through the JavaScript object and appropriately place the data
		          	response.forEach(function(preference){
		          		pref.append('<input type="text" name="' + preference.user_preference_id + '" value="' + preference.preference_name + '">');
		          	});


		          }

		      });
	});












if (window.location.pathname == '/map') {



myLocation();
searchDest();




}

});


var infowindow;
var markers = [];
var pos
var map;

function myLocation() {
  var mapOptions = {
    zoom: 10
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

    navigator.geolocation.getCurrentPosition(function(position) {
      pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

      var infowindow = new google.maps.InfoWindow({
        map: map,
        position: pos,
        content: 'Location found using HTML5.'
      });

      map.setCenter(pos);
    }, function() {
     //geo location must take two perameters. this is a place holder for error reporting.
    });
  
}



function searchDest() {

var defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(-33.8902, 151.1759),
      new google.maps.LatLng(-33.8474, 151.2631));
  map.fitBounds(defaultBounds);

  // Create the search box and link it to the UI element.
  var input = /** @type {HTMLInputElement} */(
      document.getElementById('search'));
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var searchBox = new google.maps.places.SearchBox(
    /** @type {HTMLInputElement} */(input));

  // Listen for the event fired when the user selects an item from the
  // pick list. Retrieve the matching places for that item.
  google.maps.event.addListener(searchBox, 'places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }
    for (var i = 0, marker; marker = markers[i]; i++) {
      marker.setMap(null);
    }

    // For each place, get the icon, place name, and location.
    markers = [];
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, place; place = places[i]; i++) {
     

      // Create a marker for each place.
      var marker = new google.maps.Marker({
        map: map,
        title: place.name,
        position: place.geometry.location
      });

      markers.push(marker);

      bounds.extend(place.geometry.location);
    }

    map.fitBounds(bounds);
  });

  // Bias the SearchBox results towards places that are within the bounds of the
  // current map's viewport.
  google.maps.event.addListener(map, 'bounds_changed', function() {
    var bounds = map.getBounds();
    searchBox.setBounds(bounds);
  });
}


