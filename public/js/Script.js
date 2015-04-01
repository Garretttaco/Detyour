
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

  /************************
        CLICK EVENTS
  ************************/

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

  //Grabs the remaining class and returns that to be used as the key word
  function getType(el) {
    var type = Array(el.classList[0]);
  
    return type;
  }

  $(document).on('click', '.detour', function(){
    clearMarkers(markers);    

    //get the key name that will access the value array in the userPreference object 
    var typeKey = getType(this);

    //Get preference for this type
    var prefs = preferences[typeKey];

    //get Google search term
    var typeString = $(this).attr('data-detour'); 

    //Turn it into an array
    var types = typeString.split(" ");
    var request = {
      location: pos,
      radius: 5000,
      types: types
    };
    service.nearbySearch(request, function(results, status){
      
      searchWaypoint(results, status, prefs);
    });
    $('.detour-menu').removeClass('show');
  });

  $(document).on('click', '.fa-minus', function(){
    $('#directions-panel').toggleClass('show');
    $('.fa-minus').toggleClass('panel');
  });

  $(document).find('div.login').addClass('hide');

  $(document).on('click', '.edit-pref', function(e){
    e.preventDefault();

    var data = {};
    $(".user_pref").each(function() {
      data[$(this).attr("name")] = $(this).val();
    });

  });

  
	//This is the event triggered when a user chooses/changes a category on the select tag
	$(document).on('change', '.category-all', function(){
		
    var cat_id = $('select[name=category]').val()
		$(this).parents('.content').addClass('expand');

		/****************************************************
    Making the Ajax call to retrieve the preferences per 
    the category chosen without making a page refresh. 
    ****************************************************/
		$.ajax({ 
			type: "GET",
		 	//sent to the AjaxController
		 	url: "/preference/" + cat_id,
      dataType: 'json',                         
      success: function(response){
        var preference = {'tag':'input','html':'${title}'};
        var pref = $('.pref-append');
        pref.html('');
        //loop through the JavaScript object and appropriately place the data
        response.forEach(function(preference){
      		pref.append('<input class="user_pref" type="text" name="' + preference.user_preference_id + 
          '" value="' + preference.preference_name + '">' + '<i class="fa fa-minus-circle">');
      	});
		  }
		});
	});
  
  /************************
        MAPS PAGE
  ************************/

  if (window.location.pathname == '/map') {

  
    directionsService = new google.maps.DirectionsService();
       
    infoWindow = new google.maps.InfoWindow();
    
    //Called to initialize
    myLocation();
    
    //Calling function to search
    searchDest();

    function myLocation() {

      var mapOptions = {
        zoom: 10,
        disableDefaultUI: true
      };

      //Instantiates new map to use on page, with specified map options passed in
      map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
      var markerArray = [];
      rendererOptions = {
        map: map,
        preserveViewport: true
      };

      directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);

      directionsDisplay.setMap(map);
      
      directionsDisplay.setPanel(document.getElementById('directions-panel'));

      //Instantiates geo location
      navigator.geolocation.getCurrentPosition(function(position) {
        pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        var infoWindow = new google.maps.InfoWindow({
           map: map,
           position: pos,
           content: 'You are here'
        });

        map.setCenter(pos);
      }, function() {/* for error reporting */});
      
    }
    
    function searchDest() {

      // Create the search box and link it to the UI element.
      var destInput = (document.getElementById('dest-input'));
      var searchBox = new google.maps.places.SearchBox((destInput));

      //Add listener for if someone tries to use the search bar on the UI.
      google.maps.event.addListener(searchBox, 'places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
          return;
        }
        for (var i = 0, marker; marker = markers[i]; i++) {
          marker.setMap(null);
        }

        markers = [];
        // For each place, get the icon, place name, and location.
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0, place; place = places[i]; i++) {

          // Create a marker for each place.
          var marker = new google.maps.Marker({
            map: map,
            title: place.name,
            position: place.geometry.location
          });

          //Service is the ability to pass specified key words for a detour
          service = new google.maps.places.PlacesService(map);

          //If they select a marker, this will calculate the route, and clear the markers.
          google.maps.event.addListener(marker, 'click', function() {
            dest = this.position;
            // console.log(this);
            infoWindow.setContent(this.title);
            infoWindow.open(map, this);
            calcRoute(pos, dest);
            clearMarkers(markers);
            if (map.getCenter() != pos || map.getZoom() != 12) {
              map.setCenter(pos);
              map.setZoom(12); 
            }
          });

          markers.push(marker);
          bounds.extend(place.geometry.location);
        }

        //Set the bounds to the viewport of the map
        map.fitBounds(bounds);
      });

      // Bias the SearchBox results towards places that are within the bounds of the
      // current map's viewport.
      google.maps.event.addListener(map, 'bounds_changed', function() {
        var bounds = map.getBounds();
        searchBox.setBounds(bounds);
      });
    }

    //Passes in the optional parameter image, which is only used if
    //the preference is calling this function
    function createWaypoint(place, bounds, image) {
      var marker = new google.maps.Marker({
        map: map,
        icon: image,
        title: place.name,
        position: place.geometry.location
      });

      markers.push(marker);
      bounds.extend(place.geometry.location);
      map.fitBounds(bounds);

      google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(this.title);
        infoWindow.open(map, this);

        //Passes current pos, already set destination, and the chosen waypoint
        calcRoute(pos, dest, this.position);
        clearMarkers(markers);

        //Sets map to center around persons geo location and adjusts zoom
        if (map.getCenter() != pos || map.getZoom() != 12) {
          map.setCenter(pos);
          map.setZoom(12); 
        }
      });
    }

    //Called only if a destination is chosen and the user clicks on a detour-menu option
    function searchWaypoint(results, status, keywords) {

      if (status == google.maps.places.PlacesServiceStatus.OK) {
        
        //Set the bounds to the search results
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < results.length; i++) {
          place = results[i];

          //If the results match a preference in the keywords array
          //returns -1 if it doesn't match.
          if(keywords.indexOf(place.name) >= 0) {
            image ='/images/blue-pin-two.png'; 
            createWaypoint(place, bounds, image);
          } else {
            createWaypoint(place, bounds);
          }
        }
      }
    }
    
    // Instantiate an info window to hold step text.
    stepDisplay = new google.maps.InfoWindow();
      
    //pass optional waypoint in here
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

    //clears the search result markers on the map when called
    function clearMarkers(markers) {
      for (var i = 0, marker; marker = markers[i]; i++) {
        marker.setMap(null);
      }
    }
  }

});

