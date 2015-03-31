
    var infowindow;
    var markers = [];
    var pos;
    var dest;
    var map;
    var directionsDisplay;
    var directionsService;
    var service;
    var renderOptions;

$(function(){

	// This is the click event for the Primary menu to slide down
	$('.show-menu').on('click', function(){
		$('.primary-menu').toggleClass('show');
		$('.fa-bars').addClass('hide');
    $('dest-search').addClass('hide');
  });

  //This is the click event for the bottom detour menu to slide up
  $('.show-bottom-menu').on('click', function(){
    $('.detour-menu').toggleClass('show');
  });

  $('.detour-menu').on('click', '.detour', function(){
    // var val = $(this).children('span').text();
    var typeString = $(this).attr('data-detour'); 
    var types = typeString.split(" ");
    var request = {
      location: pos,
      radius: 5000,
      types: types
    };
    service.nearbySearch(request, function(results, status){
      var shell = ["Shell", "Circle K"];
      searchWaypoint(results, status, shell)
    });
    $('.detour-menu').removeClass('show');

  });

  $(document).on('click', '.fa-minus', function(){
    $('#directions-panel').toggleClass('show');
    $('.fa-minus').toggleClass('panel');
  });

  $(document).find('div.login').addClass('hide');

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

    directionsService = new google.maps.DirectionsService();
       
    infoWindow = new google.maps.InfoWindow();
    //calling goelocation
    myLocation();
    searchDest();

    function myLocation() {

      var mapOptions = {
        zoom: 10,
        disableDefaultUI: true
      };
      map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
      var markerArray = [];
      rendererOptions = {
        map: map
      };
      directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);

      directionsDisplay.setMap(map);
      directionsDisplay.setPanel(document.getElementById('directions-panel'));

      navigator.geolocation.getCurrentPosition(function(position) {
        pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        var infoWindow = new google.maps.InfoWindow({
           map: map,
           position: pos,
           content: 'Garrett'
        });

        map.setCenter(pos);
      }, function() {/* for error reporting */});
    }
    
    function searchDest() {
    // Create the search box and link it to the UI element.
      var destInput = (document.getElementById('dest-input'));

      var searchBox = new google.maps.places.SearchBox((destInput));

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

        
        service = new google.maps.places.PlacesService(map);
        google.maps.event.addListener(marker, 'click', function() {
          dest = this.position;
          // console.log(this);
          infoWindow.setContent(this.title);
          infoWindow.open(map, this);
          calcRoute(pos, dest);
          clearMarkers(markers);
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


    function createWaypoint(place, image) {
      var marker = new google.maps.Marker({
        map: map,
        icon: image,
        title: place.name,
        position: place.geometry.location
      });
      markers.push(marker);
      // console.log(markers);

      google.maps.event.addListener(marker, 'click', function() {
          // console.log(this);
          infoWindow.setContent(this.title);
          infoWindow.open(map, this);
          calcRoute(pos, dest, this.position);
          clearMarkers(markers);
        });
    }

    function searchWaypoint(results, status, keywords) {

      if (status == google.maps.places.PlacesServiceStatus.OK) {
        var preferedFound  = false;
        for (var i = 0; i < results.length; i++) {
          place = results[i];
          if(keywords.indexOf(place.name) >= 0) {
            image ='/images/blue-pin-two.png'; 
            createWaypoint(place, image);
          } else {
            createWaypoint(place);
          }
        }
      }
    }
    

    // Instantiate an info window to hold step text.
    stepDisplay = new google.maps.InfoWindow();
      
    //pass option waypoint in here
    function calcRoute(pos, dest, waypoint) {

      var request = {
        origin: pos,
        destination: dest,
        travelMode: google.maps.TravelMode.DRIVING
      };
      
      if(waypoint) {
        request.waypoints = [{location: waypoint, stopover: true}];
        request.optimizeWaypoints = true;
      }

     // Route the directions and pass the response to a
      // function to create markers for each step.
      directionsService.route(request, function(response, status) {
        directionsDisplay.setDirections(response);
      });
    }


    function clearMarkers(markers) {
      for (var i = 0, marker; marker = markers[i]; i++) {
        marker.setMap(null);
      }
    }

  }

});

