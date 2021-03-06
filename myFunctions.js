
$('#cookieName').text('Greg Swanson');

//data





var myUsers = [1,2,3,4,5,6,7,8,9,10];

var myUsers2 = [
{
id: 1,
name: "Greg",
Instrument: "Guitar",
level: "beginner",
youtube: "https://youtu.be/nNYcRzHKb-g",
city: "Bound Brook",
zipcode: "08805"
},
{
id: 2,
name: "Mike",
Instrument: "Guitar",
level: "beginner",
youtube: "https://youtu.be/-ZTvqUvgYCI",
city: "Bound Brook",
zipcode: "08807"
},
{
id: 3,
name: "Dave",
Instrument: "Guitar",
level: "intermediate",
youtube: "https://youtu.be/gXbPlFgSfao",
city: "Bound Brook",
zipcode: "08836"
},
{
id: 4,
name: "Tom",
Instrument: "Guitar",
level: "intermediate",
youtube: "https://youtu.be/4WoxLk2g4-w",
city: "Bound Brook",
about: "This is a bunch of text that I am going to say about myself.",
zipcode: "07059"
},
{
id: 5,
name: "Jim",
Instrument: "Guitar",
level: "expert",
youtube: "https://youtu.be/CinJuVtdp3Y",
city: "Bound Brook",
zipcode: "10312"
},
];




//home page counter
$('.timer').countTo({	
	from: 0, 
	to: 1205, //myUsers.length,
	speed: 3000,
	refreshInterval: 50,
});



//filter isotope grid
var $isogrid = $('.isogrid')

$isogrid.isotope({
  itemSelector: '.grid-item',
  resizable: false,
  masonry: { columnWidth: $isogrid.width() / 3 }
});



// filter items on button click
$('.filter-button-group').on( 'click', 'button', function() {
  var filterValue = $(this).attr('data-filter');
  //alert($(this).attr('data-filter'));
  $isogrid.isotope({ filter: filterValue });
});

//submit button
$('#searchnow').on('click', function(){
//send selection
console.log($('#search-inst').val());
console.log($('#search-inst2').val());
console.log($('#search-city').val());
console.log($('#search-genre').val());


var originURL = document.location.origin; 
var queryURL = '/api';

$.ajax({url: originURL + queryURL, method: 'GET'}).done(function(data){
console.log(data)
		for (var i = 0; i < data.length; i++) {
		myUsers2.push(data[i]);
		}
});







//populate iso box
	$(".grid-container").html("");
	for (var i = 0; i < myUsers2.length; i++){
	var youtubeString = myUsers2[i].youtube;
	var videoId = youtubeString.split('be/')[1];

	var $newitems = 
			$('<div class="portfolio-item grid-item' + " " + myUsers2[i].level + '" id="' + [i] + '" data-youtube="https://www.youtube.com/embed/' + videoId  + '">' +
						'<div class="porttopbar' + ' ' + myUsers2[i].level + '"></div>' +
						'<div class="innerport">' +
						'<div class="isoimg col-xs-4"><img src="images/placeholder_75x75.png"></div>' +
						'<div class="isodiv col-xs-8">' +
						'<div class="name"><strong>' + myUsers2[i].name + '</strong></div>' +
						'<div class="inst">' + myUsers2[i].Instrument + '</div>' +
						'<div class="city">' + myUsers2[i].city + '</div>' +
						'</div></div></div>');
		$isogrid.isotope( 'insert', $newitems );


	}

});

/////Open Modal
$('.grid-container').on( 'click', '.grid-item', function() {
	var modalID = this.id;
	var url = $(this).data('youtube');
	var level = myUsers2[modalID].level;
  $('#myModal').modal('show');
  $('#modalTitle').text(myUsers2[modalID].name);
  $('#modalInst').text(myUsers2[modalID].Instrument);
  $('#modalCity').text(myUsers2[modalID].city);
  $('#modalLevel').text(myUsers2[modalID].level);
  $('#modalAbout').text(myUsers2[modalID].about);
  $('#modalFrame').attr('src', url);

 //Close Modal - Pass 
$('#myModal').on( 'click', '#modalPass', function() {
	$isogrid.isotope( 'remove', $('#' + modalID))
    // layout remaining item elements
    .isotope('layout');
$('#myModal').modal('hide');
$('#modalFrame').attr('src', "");
})
//////NEW modal close
$('#modalPass').on('click', function(){
	//alert("hello");
	$('#myModal').modal('hide');
})
////new modal close end
//Popup Modal - Email 
$('#myModal').on( 'click', '#modalEmail', function() {
	$('#myModal').modal('hide');
	$('#modalFrame').attr('src', "");
	$('#myModal2').modal('show');
})

//Close Modal - Email 
$('#myModal2').on( 'click', '#emailButton', function() {
	$('#myModal2').modal('hide');
	
	var emailmsg = {
		subject: $('#emailSubject').val().trim(),
		message: $('#emailMessage').val().trim(),
		email: (myUsers2[modalID].email)
	};
	console.log(emailmsg);
	//post to mail
	$.post( currentURL + "/mail", emailmsg)
				.done(function(data){
					//console.log(data);
					//alert("sending message...")
				})
	$isogrid.isotope( 'remove', $('#' + modalID))
    // layout remaining item elements
    .isotope('layout');
    return false;
})


  
});


///////////////login////////////////
$('#login-submit').on('click', function(){
	var username = $('#login-username').val().trim();
	var password = $('#login-password').val().trim();
	$('#login-username').val("");
	$('#login-password').val("");
	//console.log(username + " " + password);
	return false;

})


/////registration////////////

$('#register-submit').on('click', function(){
	var name = $('#register-name').val().trim(); 
	var username = $('#register-username').val().trim();
	var password = $('#register-password').val().trim();
	var city = $('#register-city').val();
	var state = $('#register-state').val();
	var instrument = $('#register-inst').val();
	var skill = $('#register-skill').val();
	var photo = $('#register-photo').val().trim();
	var about = $('#register-about').val().trim();
	var info = $('#register-info').val().trim();
	var youtube = $('#register-youtube').val().trim();

console.log(name  + '\n' + username  + '\n' + password  + '\n' + city  + '\n' + state  + '\n' + instrument  + '\n' + skill  + '\n' + photo  + '\n' +
		about  + '\n' + info  + '\n' + youtube);

	$('#register-name').val(""); 
	$('#register-username').val("");
	$('#register-password').val("");
	$('#register-city').val("");
	$('#register-state').val("");
	$('#register-inst').val("");
	$('#register-skill').val("");
	$('#register-photo').val("");
	$('#register-about').val("");
	$('#register-info').val("");
	$('#register-youtube').val("");

		return false;
})









////google maps //////////////////////////////////////////////////////////
//key: AIzaSyBOo3mntkfMMomnO0V0P6Mt4bQ3vMUUWIw

// global variable
var initalMap = {lat: 40.488, lng: -74.439};
var allMarkers = [];
var beginnerMarkers = [];
var intermediateMarkers = [];
var expertMarkers = [];
var counter = 0;

// if ($('#search-city').val == "new brunswick") {
// 	initalMap = {lat: 40.488, lng: -74.439};
// }
// if ($('#search-city').val == "nyc") {
// 	initalMap = {lat: 40.7128, lng: -74.0059};
// }
// if ($('#search-city').val == "philadelphia") {
// 	initalMap = {lat: 39.9526, lng: -75.1652};
// }



var marker = [];
var map;

function initMap() {
	var myLatLng = {lat: 40.488, lng: -74.439};
	var mapOptions = {
		center: myLatLng,
		zoom: 10,
		disableDefaultUI: true,
		styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]
	};

  var map = new google.maps.Map(document.getElementById('google-map5'), mapOptions);
  var geocoder = new google.maps.Geocoder();

  
var infowindow = new google.maps.InfoWindow({
		content: "holding..."
	});

 geocodeAddress(geocoder, map);
}

function initMap2() {
	var myLatLng = {lat: 40.488, lng: -74.439};
	var mapOptions = {
		center: myLatLng,
		zoom: 10,
		disableDefaultUI: true,
		styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]
	};

  var map = new google.maps.Map(document.getElementById('google-map5'), mapOptions);
  var geocoder = new google.maps.Geocoder();
  
var infowindow = new google.maps.InfoWindow({
		content: "holding..."
	});
geocodeBeginner(geocoder, map);
}

function initMap3() {
	var myLatLng = {lat: 40.488, lng: -74.439};
	var mapOptions = {
		center: myLatLng,
		zoom: 10,
		disableDefaultUI: true,
		styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]
	};

  var map = new google.maps.Map(document.getElementById('google-map5'), mapOptions);
  var geocoder = new google.maps.Geocoder();
  
var infowindow = new google.maps.InfoWindow({
		content: "holding..."
	});
geocodeIntermediate(geocoder, map);
}

function initMap4() {
	var myLatLng = {lat: 40.488, lng: -74.439};
	var mapOptions = {
		center: myLatLng,
		zoom: 10,
		disableDefaultUI: true,
		styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]
	};

  var map = new google.maps.Map(document.getElementById('google-map5'), mapOptions);
  var geocoder = new google.maps.Geocoder();
  
var infowindow = new google.maps.InfoWindow({
		content: "holding..."
	});
geocodeExpert(geocoder, map);
}

function geocodeAddress(geocoder, resultsMap) {
  for (var j = 0; j < myUsers2.length; j++){
  	 address = myUsers2[j].zipcode;
  	 inst = myUsers2[j].Instrument;
  	 name = myUsers2[j].name;
  	  //console.log(myUsers2[j].zipcode);
  	  geocoder.geocode({'address': address}, function(results, status) {
  	  	// alert(name);

  	    if (status === google.maps.GeocoderStatus.OK) {  	      
  	      resultsMap.setCenter(results[0].geometry.location);
		var markers = new google.maps.Marker({
							position: results[0].geometry.location,
							map: resultsMap,
							title: myUsers2[counter].name,
							id: myUsers2[counter].level,
///test							
							name: myUsers2[counter].name,
							inst: myUsers2[counter].instrument,
							city: myUsers2[counter].city,
							level: myUsers2[counter].silllevel,
							about: myUsers2[counter].about,
							youtube: myUsers2[counter].sample,
							photo: myUsers2[counter].photo,
							html: 
									'<div class="markerPop">' +
									'<h1>' + myUsers2[counter].name + '</h1>' + 
									'<p>' + myUsers2[counter].Instrument + '</p>' +
									'</div>'
						});

		var contentString = '<div id="content">'+
  	      						'<h4 class="firstHeading">'+ myUsers2[counter].name +'</h4>'+
								'<div id="bodyContent">'+
								'<p><b>'+myUsers2[counter].instrument+'</b></p>'+
								'</div>'+
								'</div>';

			infowindow = new google.maps.InfoWindow({
					content: contentString,
					maxWidth: 300, 
					buttons: { close: { visible: false } }
				});

						//put all in array
						allMarkers.push(markers);
						
						counter++;
						//console.log(counter);
/////////test
/////Open Modal
				google.maps.event.addListener(markers, 'click', function () {
							var modalID = this.id;
							var videoId = this.youtube
							var url = videoId.split('be/')[1];
							var fullURL = "https://www.youtube.com/embed/" + url;
							//alert(this.name);
				//var url = myUsers2[modalID].youtube;
				//var level = myUsers2[modalID].level;
			  $('#myModal').modal('show');
			  $('#modalTitle').text(this.name);
			  $('#modalInst').text(this.inst);
			  $('#modalCity').text(this.city);
			  $('#modalLevel').text(this.level);
			  $('#modalAbout').text(this.about);
			  $('#modalPhoto').attr('src', this.photo);
			 $('#modalFrame').attr('src', fullURL);
						});



//////end test




						google.maps.event.addListener(markers, 'mouseover', function () {
							infowindow.setContent(this.html);
							infowindow.open(resultsMap, this);
						});
						google.maps.event.addListener(markers, 'mouseout', function () {
							//infowindow.setContent(this.html);
							infowindow.close(resultsMap, this);
						});
					};
		  })
	}
}

//// Geocode Beginner ///////////////////////////////
function geocodeBeginner(geocoder, resultsMap) {
  for (var j = 0; j < beginnerMarkers.length; j++){
     address = beginnerMarkers[j].zipcode;
     inst = beginnerMarkers[j].Instrument;
     name = beginnerMarkers[j].name;
      //console.log(beginnerMarkers[j].zipcode);
      geocoder.geocode({'address': address}, function(results, status) {
  
        if (status === google.maps.GeocoderStatus.OK) {
          
          resultsMap.setCenter(results[0].geometry.location);
    var markers = new google.maps.Marker({
              position: results[0].geometry.location,
              map: resultsMap,
              title: beginnerMarkers[counter].name,
              id: beginnerMarkers[counter].level,
///test							
				name: beginnerMarkers[counter].name,
				inst: beginnerMarkers[counter].instrument,
				city: beginnerMarkers[counter].city,
				level: beginnerMarkers[counter].silllevel,
				about: beginnerMarkers[counter].about,
				youtube: beginnerMarkers[counter].sample,
				photo: beginnerMarkers[counter].photo,

              html: 
                  '<div class="markerPop">' +
                  '<h1>' + beginnerMarkers[counter].name + '</h1>' + 
                  '<p>' + beginnerMarkers[counter].Instrument + '</p>' +
                  '</div>'
            });

    var contentString = '<div id="content">'+
                      '<h4 class="firstHeading">'+ beginnerMarkers[counter].name +'</h4>'+
                '<div id="bodyContent">'+
                '<p><b>'+beginnerMarkers[counter].Instrument+'</b></p>'+
                '</div>'+
                '</div>';

      infowindow = new google.maps.InfoWindow({
          content: contentString,
          maxWidth: 300, 
          buttons: { close: { visible: false } }
        });
            //dont push to array
           // allMarkers.push(markers); 
            counter++;
           // console.log(counter);
/////////test
/////Open Modal
				google.maps.event.addListener(markers, 'click', function () {
							var modalID = this.id;
							var videoId = this.youtube
							var url = videoId.split('be/')[1];
							var fullURL = "https://www.youtube.com/embed/" + url;
							//alert(this.name);
				//var url = myUsers2[modalID].youtube;
				//var level = myUsers2[modalID].level;
			  $('#myModal').modal('show');
			  $('#modalTitle').text(this.name);
			  $('#modalInst').text(this.inst);
			  $('#modalCity').text(this.city);
			  $('#modalLevel').text(this.level);
			  $('#modalAbout').text(this.about);
			  $('#modalPhoto').attr('src', this.photo);
			 $('#modalFrame').attr('src', fullURL);
						});



//////end test




            google.maps.event.addListener(markers, 'mouseover', function () {
			infowindow.setContent(this.html);
			infowindow.open(resultsMap, this);
			});
			google.maps.event.addListener(markers, 'mouseout', function () {
			//infowindow.setContent(this.html);
			infowindow.close(resultsMap, this);
			});

          };      
      })

  }
}
//// Geocode Beginner END///////////////////////////////

//// Geocode Intermediate ///////////////////////////////
function geocodeIntermediate(geocoder, resultsMap) {
  for (var j = 0; j < intermediateMarkers.length; j++){
     address = intermediateMarkers[j].zipcode;
     inst = intermediateMarkers[j].Instrument;
     name = intermediateMarkers[j].name;
      //console.log(intermediateMarkers[j].zipcode);
      geocoder.geocode({'address': address}, function(results, status) {
  
        if (status === google.maps.GeocoderStatus.OK) {
          
          resultsMap.setCenter(results[0].geometry.location);
    var markers = new google.maps.Marker({
              position: results[0].geometry.location,
              map: resultsMap,
              title: intermediateMarkers[counter].name,
              id: intermediateMarkers[counter].level,
///test							
				name: intermediateMarkers[counter].name,
				inst: intermediateMarkers[counter].instrument,
				city: intermediateMarkers[counter].city,
				level: intermediateMarkers[counter].silllevel,
				about: intermediateMarkers[counter].about,
				youtube: intermediateMarkers[counter].sample,
				photo: intermediateMarkers[counter].photo,
              html: 
                  '<div class="markerPop">' +
                  '<h1>' + intermediateMarkers[counter].name + '</h1>' + 
                  '<p>' + intermediateMarkers[counter].Instrument + '</p>' +
                  '</div>'
            });

    var contentString = '<div id="content">'+
                      '<h4 class="firstHeading">'+ intermediateMarkers[counter].name +'</h4>'+
                '<div id="bodyContent">'+
                '<p><b>'+intermediateMarkers[counter].Instrument+'</b></p>'+
                '</div>'+
                '</div>';

      infowindow = new google.maps.InfoWindow({
          content: contentString,
          maxWidth: 300, 
          buttons: { close: { visible: false } }
        });
            //dont push to array
           // allMarkers.push(markers); 
            counter++;
           // console.log(counter);
/////////test
/////Open Modal
				google.maps.event.addListener(markers, 'click', function () {
							var modalID = this.id;
							var videoId = this.youtube
							var url = videoId.split('be/')[1];
							var fullURL = "https://www.youtube.com/embed/" + url;
							//alert(this.name);
				//var url = myUsers2[modalID].youtube;
				//var level = myUsers2[modalID].level;
			  $('#myModal').modal('show');
			  $('#modalTitle').text(this.name);
			  $('#modalInst').text(this.inst);
			  $('#modalCity').text(this.city);
			  $('#modalLevel').text(this.level);
			  $('#modalAbout').text(this.about);
			  $('#modalPhoto').attr('src', this.photo);
			 $('#modalFrame').attr('src', fullURL);
						});



//////end test
            google.maps.event.addListener(markers, 'mouseover', function () {
			infowindow.setContent(this.html);
			infowindow.open(resultsMap, this);
			});
			google.maps.event.addListener(markers, 'mouseout', function () {
			//infowindow.setContent(this.html);
			infowindow.close(resultsMap, this);
			});
          };      
      })

  }
}
//// Geocode Intermediate END///////////////////////////////

//// Geocode Expert ///////////////////////////////
function geocodeExpert(geocoder, resultsMap) {
  for (var j = 0; j < expertMarkers.length; j++){
     address = expertMarkers[j].zipcode;
     inst = expertMarkers[j].Instrument;
     name = expertMarkers[j].name;
      //console.log(expertMarkers[j].zipcode);
      geocoder.geocode({'address': address}, function(results, status) {
  
        if (status === google.maps.GeocoderStatus.OK) {
          
          resultsMap.setCenter(results[0].geometry.location);
    var markers = new google.maps.Marker({
              position: results[0].geometry.location,
              map: resultsMap,
              title: expertMarkers[counter].name,
              id: expertMarkers[counter].level,
///test							
				name: expertMarkers[counter].name,
				inst: expertMarkers[counter].instrument,
				city: expertMarkers[counter].city,
				level: expertMarkers[counter].silllevel,
				about: expertMarkers[counter].about,
				youtube: expertMarkers[counter].sample,
				photo: expertMarkers[counter].photo,
              html: 
                  '<div class="markerPop">' +
                  '<h1>' + expertMarkers[counter].name + '</h1>' + 
                  '<p>' + expertMarkers[counter].Instrument + '</p>' +
                  '</div>'
            });

    var contentString = '<div id="content">'+
                      '<h4 class="firstHeading">'+ expertMarkers[counter].name +'</h4>'+
                '<div id="bodyContent">'+
                '<p><b>'+expertMarkers[counter].Instrument+'</b></p>'+
                '</div>'+
                '</div>';

      infowindow = new google.maps.InfoWindow({
          content: contentString,
          maxWidth: 300, 
          buttons: { close: { visible: false } }
        });
            //dont push to array
           // allMarkers.push(markers); 
            counter++;
           // console.log(counter);
/////////test
/////Open Modal
				google.maps.event.addListener(markers, 'click', function () {
							var modalID = this.id;
							var videoId = this.youtube
							var url = videoId.split('be/')[1];
							var fullURL = "https://www.youtube.com/embed/" + url;
							//alert(this.name);
				//var url = myUsers2[modalID].youtube;
				//var level = myUsers2[modalID].level;
			  $('#myModal').modal('show');
			  $('#modalTitle').text(this.name);
			  $('#modalInst').text(this.inst);
			  $('#modalCity').text(this.city);
			  $('#modalLevel').text(this.level);
			  $('#modalAbout').text(this.about);
			  $('#modalPhoto').attr('src', this.photo);
			 $('#modalFrame').attr('src', fullURL);
						});
//////end test
            google.maps.event.addListener(markers, 'mouseover', function () {
			infowindow.setContent(this.html);
			infowindow.open(resultsMap, this);
			});
			google.maps.event.addListener(markers, 'mouseout', function () {
			//infowindow.setContent(this.html);
			infowindow.close(resultsMap, this);
			});
          };      
      })

  }
}
//// Geocode Expert END///////////////////////////////


function chooseArrays(){
	for (var i = 0; i < myUsers2.length; i++){
		if (myUsers2[i].level == "beginner") {
			beginnerMarkers.push(myUsers2[i]);
		} else if (myUsers2[i].level == "intermediate") {
			intermediateMarkers.push(myUsers2[i]);
		} else {
			expertMarkers.push(myUsers2[i]);
		}
	}
}

chooseArrays();

////google maps buttons////
$('#showallButton').on('click', function(){
	counter = 0;
	initMap();
	//alert("show all");
})


$('#beginnerButton').on('click', function(){
	counter = 0;
	initMap2();
	//alert("beginner");
})

$('#intermediateButton').on('click', function(){
	counter = 0;
	initMap3();
	//alert("intermediate");
})

$('#expertButton').on('click', function(){
	counter = 0;
	initMap4();
	//alert("expert");
})
////google maps buttons end /////