$(function(){
	var markers = [];
	var positions = [];
	var options = {
		zoom: 1,
		center: new google.maps.LatLng(-34.397, 150.644),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById('map'), options);

	$.getJSON("xml/all.json", displayResult);
	
	$("#search-form").ajaxForm({
		dataType: 'json',
		success: displayResult
	});
	
	// Populates map with json result
	function displayResult(data){
		clearMarkers();
		
		var bounds = new google.maps.LatLngBounds();
		$.each(data.retailers, function(i, item){
			// Adds location to bounds for later fitting
			var position = new google.maps.LatLng(item.lat, item.lng);
			bounds.extend(position);
			// Adds a marker
			var marker = new google.maps.Marker({
				position: position,
				map: map,
				title: item.title
			});
			markers.push(marker);
			// Adds info window when marker is clicked
			var contentString = "<b>"+ item.title +"</b><br />"+ item.address +"<br />"+ item.phone;
			var infoWindow = new google.maps.InfoWindow({
				content: contentString
			});
			google.maps.event.addListener(marker, 'click', function(){
				infoWindow.open(map, marker);
			});
		});
		map.fitBounds(bounds);
	};
	
	// Removes all markers from map
	function clearMarkers(){
		if (markers) {
		  for (var i = 0; i < markers.length; i++ ) {
		    markers[i].setMap(null);
		  }
		  markers = [];
		}
	}
});
