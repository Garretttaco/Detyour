var infowindow,markers=[],pos,dest,map,directionsDisplay,directionsService,service;$(function(){function e(){var e={zoom:10};map=new google.maps.Map(document.getElementById("map-canvas"),e),directionsDisplay.setMap(map),navigator.geolocation.getCurrentPosition(function(e){pos=new google.maps.LatLng(e.coords.latitude,e.coords.longitude);new google.maps.InfoWindow({map:map,position:pos,content:"Garrett"});map.setCenter(pos)},function(){})}function o(){var e=document.getElementById("dest-input"),o=new google.maps.places.SearchBox(e);google.maps.event.addListener(o,"places_changed",function(){var e=o.getPlaces();if(0!=e.length){for(var n,a=0;n=markers[a];a++)n.setMap(null);markers=[];for(var t,s=new google.maps.LatLngBounds,a=0;t=e[a];a++){var n=new google.maps.Marker({map:map,title:t.name,position:t.geometry.location});service=new google.maps.places.PlacesService(map),google.maps.event.addListener(n,"click",function(){dest=this.position,console.log(this),infoWindow.setContent(this.title),infoWindow.open(map,this),calcRoute(pos,dest),clearMarkers(markers)}),markers.push(n),s.extend(t.geometry.location)}map.fitBounds(s)}}),google.maps.event.addListener(map,"bounds_changed",function(){var e=map.getBounds();o.setBounds(e)})}function n(e){var o=new google.maps.Marker({map:map,position:e.geometry.location});markers.push(o),console.log(markers),google.maps.event.addListener(o,"click",function(){console.log(this),infoWindow.setContent(this.title),infoWindow.open(map,this),calcRoute(pos,dest,this.position),clearMarkers(markers)})}function a(e,o,a){if(o==google.maps.places.PlacesServiceStatus.OK){for(var t=0;t<e.length;t++)place=e[t],place.name==a&&(n(place),preferedFound=!0);if(!preferedFound)for(var t=0;t<e.length;t++)place=e[t],n(place)}stepDisplay=new google.maps.InfoWindow}if($(".show-menu").on("click",function(){$(".primary-menu").toggleClass("show"),$(".fa-bars").addClass("hide"),$("dest-search").addClass("hide")}),$(".show-bottom-menu").on("click",function(){$(".detour-menu").toggleClass("show"),$(".footer").addClass("hide")}),$(".gas").on("click",function(){var e={location:pos,radius:5e3,types:["gas_station"]};service.nearbySearch(e,function(e,o){a(e,o,"Shell")})}),$(document).on("change",".category-all",function(){var e=$("select[name=category]").val();$(this).parents(".content").addClass("expand"),$.ajax({type:"GET",url:"/preference/"+e,dataType:"json",success:function(e){var o=$(".pref-append");o.html(""),e.forEach(function(e){o.append('<input type="text" name="'+e.user_preference_id+'" value="'+e.preference_name+'">')})}})}),"/map"==window.location.pathname){directionsService=new google.maps.DirectionsService;var t={map:map};directionsDisplay=new google.maps.DirectionsRenderer(t),infoWindow=new google.maps.InfoWindow,e(),o()}});var infowindow,markers=[],pos,dest,map,directionsDisplay,directionsService,service,renderOptions;$(function(){function e(){var e={zoom:10,disableDefaultUI:!0};map=new google.maps.Map(document.getElementById("map-canvas"),e);rendererOptions={map:map},directionsDisplay=new google.maps.DirectionsRenderer(rendererOptions),directionsDisplay.setMap(map),directionsDisplay.setPanel(document.getElementById("directions-panel")),navigator.geolocation.getCurrentPosition(function(e){pos=new google.maps.LatLng(e.coords.latitude,e.coords.longitude);new google.maps.InfoWindow({map:map,position:pos,content:"Garrett"});map.setCenter(pos)},function(){})}function o(){var e=document.getElementById("dest-input"),o=new google.maps.places.SearchBox(e);google.maps.event.addListener(o,"places_changed",function(){var e=o.getPlaces();if(0!=e.length){for(var n,a=0;n=markers[a];a++)n.setMap(null);markers=[];for(var i,r=new google.maps.LatLngBounds,a=0;i=e[a];a++){var n=new google.maps.Marker({map:map,title:i.name,position:i.geometry.location});service=new google.maps.places.PlacesService(map),google.maps.event.addListener(n,"click",function(){dest=this.position,infoWindow.setContent(this.title),infoWindow.open(map,this),t(pos,dest),s(markers)}),markers.push(n),r.extend(i.geometry.location)}map.fitBounds(r)}}),google.maps.event.addListener(map,"bounds_changed",function(){var e=map.getBounds();o.setBounds(e)})}function n(e,o){var n=new google.maps.Marker({map:map,icon:o,title:e.name,position:e.geometry.location});markers.push(n),google.maps.event.addListener(n,"click",function(){infoWindow.setContent(this.title),infoWindow.open(map,this),t(pos,dest,this.position),s(markers)})}function a(e,o,a){if(o==google.maps.places.PlacesServiceStatus.OK)for(var t=0;t<e.length;t++)place=e[t],a.indexOf(place.name)>=0?(image="/images/blue-pin-two.png",n(place,image)):n(place)}function t(e,o,n){var a={origin:e,destination:o,travelMode:google.maps.TravelMode.DRIVING};n&&(a.waypoints=[{location:n,stopover:!0}],a.optimizeWaypoints=!0),directionsService.route(a,function(e){directionsDisplay.setDirections(e)})}function s(e){for(var o,n=0;o=e[n];n++)o.setMap(null)}$(".show-menu").on("click",function(){$(".primary-menu").toggleClass("show"),$(".fa-bars").addClass("hide"),$("dest-search").addClass("hide")}),$(".show-bottom-menu").on("click",function(){$(".detour-menu").toggleClass("show")}),$(".detour-menu").on("click",".detour",function(){var e=$(this).children("span").text(),o=e.split(" "),n={location:pos,radius:5e3,types:o};service.nearbySearch(n,function(e,o){var n=["Shell","Circle K"];a(e,o,n)}),$(".detour-menu").removeClass("show")}),$(document).on("click",".fa-minus",function(){$("#directions-panel").toggleClass("show"),$(".fa-minus").toggleClass("panel")}),$(document).find("div.login").addClass("hide"),$(document).on("change",".category-all",function(){var e=$("select[name=category]").val();$(this).parents(".content").addClass("expand"),$.ajax({type:"GET",url:"/preference/"+e,dataType:"json",success:function(e){var o=$(".pref-append");o.html(""),e.forEach(function(e){o.append('<input type="text" name="'+e.user_preference_id+'" value="'+e.preference_name+'">')})}})}),"/map"==window.location.pathname&&(directionsService=new google.maps.DirectionsService,infoWindow=new google.maps.InfoWindow,e(),o(),stepDisplay=new google.maps.InfoWindow)});var infowindow,markers=[],pos,dest,map,directionsDisplay,directionsService,service;$(function(){function e(){var e={zoom:10};map=new google.maps.Map(document.getElementById("map-canvas"),e),directionsDisplay.setMap(map),navigator.geolocation.getCurrentPosition(function(e){pos=new google.maps.LatLng(e.coords.latitude,e.coords.longitude),new google.maps.InfoWindow({map:map,position:pos,content:"Garrett"}),map.setCenter(pos)},function(){})}function o(){var e=document.getElementById("dest-input"),o=new google.maps.places.SearchBox(e);google.maps.event.addListener(o,"places_changed",function(){var e=o.getPlaces();if(0!=e.length){for(var n,a=0;n=markers[a];a++)n.setMap(null);markers=[];for(var t,s=new google.maps.LatLngBounds,a=0;t=e[a];a++){var n=new google.maps.Marker({map:map,title:t.name,position:t.geometry.location});service=new google.maps.places.PlacesService(map),google.maps.event.addListener(n,"click",function(){dest=this.position,console.log(this),infoWindow.setContent(this.title),infoWindow.open(map,this),calcRoute(pos,dest),clearMarkers(markers)}),markers.push(n),s.extend(t.geometry.location)}map.fitBounds(s)}}),google.maps.event.addListener(map,"bounds_changed",function(){var e=map.getBounds();o.setBounds(e)})}function n(e){var o=new google.maps.Marker({map:map,position:e.geometry.location});markers.push(o),console.log(markers),google.maps.event.addListener(o,"click",function(){console.log(this),infoWindow.setContent(this.title),infoWindow.open(map,this),calcRoute(pos,dest,this.position),clearMarkers(markers)})}function a(e,o,a){if(o==google.maps.places.PlacesServiceStatus.OK){for(var t=0;t<e.length;t++)place=e[t],place.name==a&&(n(place),preferedFound=!0);if(!preferedFound)for(var t=0;t<e.length;t++)place=e[t],n(place)}stepDisplay=new google.maps.InfoWindow}if($(".show-menu").on("click",function(){$(".primary-menu").toggleClass("show"),$(".fa-bars").addClass("hide"),$("dest-search").addClass("hide")}),$(".show-bottom-menu").on("click",function(){$(".detour-menu").toggleClass("show"),$(".footer").addClass("hide")}),$(".gas").on("click",function(){var e={location:pos,radius:5e3,types:["gas_station"]};service.nearbySearch(e,function(e,o){a(e,o,"Shell")})}),$(document).on("change",".category-all",function(){var e=$("select[name=category]").val();$(this).parents(".content").addClass("expand"),$.ajax({type:"GET",url:"/preference/"+e,dataType:"json",success:function(e){var o=$(".pref-append");o.html(""),e.forEach(function(e){o.append('<input type="text" name="'+e.user_preference_id+'" value="'+e.preference_name+'">')})}})}),"/map"==window.location.pathname){directionsService=new google.maps.DirectionsService;var t={map:map};directionsDisplay=new google.maps.DirectionsRenderer(t),infoWindow=new google.maps.InfoWindow,e(),o()}});var infowindow,markers=[],pos,dest,map,directionsDisplay,directionsService,service,renderOptions;$(function(){function e(){var e={zoom:10,disableDefaultUI:!0};map=new google.maps.Map(document.getElementById("map-canvas"),e),rendererOptions={map:map},directionsDisplay=new google.maps.DirectionsRenderer(rendererOptions),directionsDisplay.setMap(map),directionsDisplay.setPanel(document.getElementById("directions-panel")),navigator.geolocation.getCurrentPosition(function(e){pos=new google.maps.LatLng(e.coords.latitude,e.coords.longitude),new google.maps.InfoWindow({map:map,position:pos,content:"Garrett"}),map.setCenter(pos)},function(){})}function o(){var e=document.getElementById("dest-input"),o=new google.maps.places.SearchBox(e);google.maps.event.addListener(o,"places_changed",function(){var e=o.getPlaces();if(0!=e.length){for(var n,a=0;n=markers[a];a++)n.setMap(null);markers=[];for(var i,r=new google.maps.LatLngBounds,a=0;i=e[a];a++){var n=new google.maps.Marker({map:map,title:i.name,position:i.geometry.location});service=new google.maps.places.PlacesService(map),google.maps.event.addListener(n,"click",function(){dest=this.position,infoWindow.setContent(this.title),infoWindow.open(map,this),t(pos,dest),s(markers)}),markers.push(n),r.extend(i.geometry.location)}map.fitBounds(r)}}),google.maps.event.addListener(map,"bounds_changed",function(){var e=map.getBounds();o.setBounds(e)})}function n(e,o){var n=new google.maps.Marker({map:map,icon:o,title:e.name,position:e.geometry.location});markers.push(n),google.maps.event.addListener(n,"click",function(){infoWindow.setContent(this.title),infoWindow.open(map,this),t(pos,dest,this.position),s(markers)})}function a(e,o,a){if(o==google.maps.places.PlacesServiceStatus.OK)for(var t=0;t<e.length;t++)place=e[t],a.indexOf(place.name)>=0?(image="/images/blue-pin-two.png",n(place,image)):n(place)}function t(e,o,n){var a={origin:e,destination:o,travelMode:google.maps.TravelMode.DRIVING};n&&(a.waypoints=[{location:n,stopover:!0}],a.optimizeWaypoints=!0),directionsService.route(a,function(e){directionsDisplay.setDirections(e)})}function s(e){for(var o,n=0;o=e[n];n++)o.setMap(null)}$(".show-menu").on("click",function(){$(".primary-menu").toggleClass("show"),$(".fa-bars").addClass("hide"),$("dest-search").addClass("hide")}),$(".show-bottom-menu").on("click",function(){$(".detour-menu").toggleClass("show")}),$(".detour-menu").on("click",".detour",function(){var e=$(this).children("span").text(),o=e.split(" "),n={location:pos,radius:5e3,types:o};service.nearbySearch(n,function(e,o){var n=["Shell","Circle K"];a(e,o,n)}),$(".detour-menu").removeClass("show")}),$(document).on("click",".fa-minus",function(){$("#directions-panel").toggleClass("show"),$(".fa-minus").toggleClass("panel")}),$(document).find("div.login").addClass("hide"),$(document).on("change",".category-all",function(){var e=$("select[name=category]").val();$(this).parents(".content").addClass("expand"),$.ajax({type:"GET",url:"/preference/"+e,dataType:"json",success:function(e){var o=$(".pref-append");o.html(""),e.forEach(function(e){o.append('<input type="text" name="'+e.user_preference_id+'" value="'+e.preference_name+'">')})}})}),"/map"==window.location.pathname&&(directionsService=new google.maps.DirectionsService,infoWindow=new google.maps.InfoWindow,e(),o(),stepDisplay=new google.maps.InfoWindow)});