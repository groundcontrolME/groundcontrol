var map;
var myMarker = 0;
var markers = [];
var actualPosition;	// nuestra posición: objeto con lat, lng
var actualCoordsGoogleObj; // nuestra posición: objeto GM de coordenadas
var markerActualDestino; // marker/usuario al que nos conectamos al pulsar en él.
var infowindow;

function getLocation(){
	infowindow = new google.maps.InfoWindow({content: ''});
	setBtnsCabecera();

	// mapa bueno
	var map_options = {
		zoom: 17,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	// creamos mapa
	map = new google.maps.Map(document.getElementById("map_canvas"), map_options);
	// fin mapa bueno

	var styles = [
    {
      stylers: [
        { hue: "#ff0000" },
        { saturation:-100 }
      ]
    },{
      featureType: "road",
      elementType: "geometry",
      stylers: [
        { lightness: 100 },
        { visibility: "simplified" }
      ]
    },{
      featureType: "road",
      elementType: "labels",
      stylers: [
        { visibility: "on" }
      ]
    }
  ];

  var styledMap = new google.maps.StyledMapType(styles,
    {name: "Styled Map"});

  var mapOptions = {
    zoom: 15,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    }
  };
   map = new google.maps.Map(document.getElementById('map_canvas'),
    mapOptions);

  map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style');



	myMarker = 0;

  	// detectamos movimiento en iPhone o Android
  	var useragent = navigator.userAgent;
	if ( useragent.indexOf('iPhone') !== -1 || useragent.indexOf('Android') !== -1 ) {
		navigator.geolocation.watchPosition( 
			displayLocation, 
			handleError, 
			{ 
				enableHighAccuracy: true, 
				maximumAge: 30000, 
				timeout: 27000 
			}
		);	
	} else if ( navigator.geolocation ) {
		navigator.geolocation.getCurrentPosition( displayLocation, handleError );
	}
 }
 
function displayLocation(position) {
	// Actualizamos posición (actualPosition con 2 valores lat y long, y actualCoordsGoogleObj q es el objeto LatLng de Google)
	actualPosition=position;
	actualCoordsGoogleObj = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
	if ( !myMarker ) {
		// Creamos nuestro marcador (solo la primera vez)
		var image = new google.maps.MarkerImage(
			'img/dot_blue.png',
			null, // tamaño
			null, // origin
			new google.maps.Point( 8, 8 ), // anchor (move to center of marker)
			new google.maps.Size( 17, 17 ) // scaled size (required for Retina display icon)
		);
		myMarker = new google.maps.Marker({
			flat: true,
			icon: image,
			map: map,
			optimized: false,
			position: actualCoordsGoogleObj,
			title: 'tuPosición',
			visible: true
		});
		map.setCenter( actualCoordsGoogleObj );
		// Iniciamos conexión a Servidor Sockets
		iniciaSockets(position);
	} else {
		// Actualizamos nuestra posición (marker local y emitimos nueva posición al servidor)
		myMarker.setPosition( actualCoordsGoogleObj );
		sendPosition(idLocal,position.coords.latitude,position.coords.longitude);
	}
	
}

function handleError (error) {
	var errorMessage = [ 
		'We are not quite sure what happened.',
		'Sorry. Permission to find your location has been denied.',
		'Sorry. Your position could not be determined.',
		'Sorry. Timed out.'
	];
	alert( errorMessage[ error.code ] );
}

/////////////////////    MÉTODOS GESTIÓN MARKERS GOOGLE    ///////////////////////

function addMarker(lat,lng,id,visible) {
	var marker='';
	if (visible==true) {
		var miLatlng = new google.maps.LatLng(lat,lng);
		var index=usuarios.indexOf(id);
		var nivel=(visible)?Math.round(usuariosData[index].temperatura/10):'10';
		var icono=(id==idLocal)?'img/icons/dotverde.png':'img/icons/dot000'+nivel+'.png';
		var image = new google.maps.MarkerImage(
			icono,
			null, // tamaño
			null, // origin
			new google.maps.Point( 8, 8 ), // anchor (move to center of marker)
			new google.maps.Size( 17, 17 ) // scaled size (required for Retina display icon)
		);
		marker = new google.maps.Marker({
			flat: true,
			icon: image,
			map: map,
			optimized: false,
			position: miLatlng,
			title: id,
			animation: google.maps.Animation.DROP,
			visible: true
		});
		
		/// eventos para cada marker de otros usuarios:
		google.maps.event.addListener(marker, "dblclick", function (e) { 
		
			ga('send', 'MAPA', 'ABRE_CHAT', 'DESDE_MARKER');
			infowindow.close();
			var index2=usuarios.indexOf(id);
			abreChat(id,index2);
	    });
	    google.maps.event.addListener(marker, 'click', function() {
	    	ga('send', 'MAPA', 'ABRE_INFO', 'DESDE_MARKER');
			markerActualDestino=marker;
		    abreUsuarioDialog(marker,id);
		});
		if (!visible) marker.setMap(null);
	};
	markers.push(marker);
}

function removeMarker(index) {
	hideMarker(index);
	markers.splice(index,1);
}
function hideMarker(index) {
	markers[index].setMap(null);
}
function updatePos(index,lat,lng) {
	// actualizamos posición en local del marcador con índice en array =index;
	// var indice=((index-1)>0)?index-1:0;
	var myPos = new google.maps.LatLng(lat,lng);
	usuariosData[index].lat=lat;
	usuariosData[index].lng=lng;
	markers[index].setPosition(myPos);
}


/////////////////////////////    MÉTODOS VARIOS    ///////////////////////////////

// Centramos mapa con respecto a nuestra ubicación:
function findPos(params,el) {
	setOut(params,el)
	map.setCenter(myMarker.position);
	map.setZoom(12);
}

// centramos mapa con respecto a otro usuario:
function findUsersPos(marker) {
	map.setCenter(marker);
	map.setZoom(16);
}

// abrimos ventanita de info al pulsar en un marker:
function abreUsuarioDialog(marker,idTarget) {
	// Activamos conexión con otro usuario
	var index=usuarios.indexOf(idTarget);
	var nombre=usuariosData[index].nombre;
	var edadUser=usuariosData[index].edad;
	var infoContent='<div class="id">'+nombre+' ('+edadUser+')</div><div class="btnToChat">chatea ></div>';
	infowindow.content=infoContent;
	infowindow.open(map,marker);
	 $('.btnToChat').click(function(){
		abreChat(idTarget,index);
	});
}

// actualizamos nivel de apetencia de otros usuarios:
function updateEstado (index,level) {
	var nivel=Math.round(level/10);
	var marker=markers[index];
	usuariosData[index].temperatura=level;
	$('.userChat').find('img').attr('src','img/icons/dot000'+nivel+'.png');
	var image = new google.maps.MarkerImage(
		'img/icons/dot000'+nivel+'.png',
		null, // tamaño
		null, // origin
		new google.maps.Point( 8, 8 ), // anchor (move to center of marker)
		new google.maps.Size( 17, 17 ) // scaled size (required for Retina display icon)
	);
	markers[index].setIcon(image)
}

// abrimos chat con otro usuario:
function abreChat(id,index,nombre1) {
	idChatAbierto=id;
	infowindow.close();
	var nombre=(nombre1==undefined)?usuariosData[index].nombre:nombre;
	$('.userChat').html(nombre+'/'+usuariosData[index].edad+'años/'+'<img src="img/icons/dot000'+Math.round(usuariosData[index].temperatura/10)+'.png">');
	// modificamos propiedades de los contenedores:
	$('.contentText').html('');
	if (!$('.contentText').hasClass('content_active')) {
		$('.contentText').addClass('content_active');
		$('.chat_text').focus();
	};

	$('.main').css('display','block');
	$('#footer-box').css('bottom','0px');
	$('.containerControls').css('top','-50px');
	snapper.close(); // cerramos sidebars;
	if (window[idChatAbierto]!=undefined) {
		removeMsgsAlert(window[idChatAbierto][0].msgs);
		$('#'+idChatAbierto).find('.items').css('display','none'); // ocultamos circulo de msgs de este usuario de la lista de la derecha
		window[idChatAbierto][0].msgs=0; // quitamos mensajes pendientes solo de ese usu
		/// cargamos msgs ya existentes:
		for (var i = 0; i < window[idChatAbierto][1].length; i++) {
			var obj=window[idChatAbierto][1][i];
			addTextToChat(window[idChatAbierto],obj);
		};
	}
}
function cierraChat() {
	idChatAbierto=0;
	$('.contentText').html('');
	if ($('.contentText').hasClass('content_active')) {
		$('.contentText').removeClass('content_active');	
	};
	$('.main').css('display','none');
	$('#footer-box').css('bottom','-60px');
	$('.containerControls').css('top','0px');
}


//////////////////////////////////////////////////////////////////////////////////

