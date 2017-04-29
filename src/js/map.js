var map;
var myMarker = 0;
var markers = [];
var actualPosition;	// nuestra posición: objeto con lat, lng
var actualCoordsGoogleObj; // nuestra posición: objeto GM de coordenadas
var markerActualDestino; // marker/usuario al que nos conectamos al pulsar en él.
var infowindow;
var lat;
var lng;
var mapaActivo=true;
function getLocation(mapa){
	if(mapa==undefined)mapa=true;
	mapaActivo=mapa;
	setBtnsCabecera();
	if (mapa) {

		infowindow = new google.maps.InfoWindow({content: ''});
		// mapa bueno
		var map_options = {
			zoom: 17
			//,mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		// creamos mapa
		map = new google.maps.Map(document.getElementById("map_canvas"), map_options);
		// fin mapa bueno

		var styles = [
	    {
	      featureType: "landscape",
	      elementType: "all",
	      stylers: [
	          { saturation: 0 },
			  { lightness: 0 },
			  { gamma: 0 },
			  {color: '#000000'}


	      ]
	    },{
	      featureType: "water",
	      elementType: "all",
	      stylers: [
	          { saturation: 0 },
			  { lightness: 0 },
			  { gamma: 0 },
			  {color: '#000000'}


	      ]
	    },{
	      featureType: "road.local",
	      elementType: "geometry",
	      stylers: [
	      	{ saturation: 0 },
	        { visibility: "off" }
	      ]
	    },{
	      featureType: "road.arterial",
	      elementType: "geometry.fill",
	      stylers: [
	      	{ saturation: 0 },
	        { visibility: "off" }
	      ]
	    },{
	      featureType: "road.highway",
	      elementType: "geometry.fill",
	      stylers: [
	      	{ saturation: 0 },
	        { visibility: "off" }
	      ]
	    },{
	      featureType: "road.highway",
	      elementType: "geometry.stroke",
	      stylers: [
	      	{color: '#282828'},
	      	{ saturation: 0 },
	        { visibility: "on" }
	      ]
	    },{
	      featureType: "road.arterial",
	      elementType: "geometry.stroke",
	      stylers: [
	      	{color: '#282828'},
	      	{ saturation: 0 },
	        { visibility: "on" }
	      ]
	    },{
	      featureType: "road.fill",
	      elementType: "labels",
	      stylers: [
	      	{color:'#000'},
	        { lightness: -60 },
	        { visibility: "off" }
	      ]
	    },{
	      featureType: "road.local",
	      elementType: "labels",
	      stylers: [
	      	{	color: '#000'},
	        { lightness: -60 },
	        { visibility: "off" }
	      ]
	    },{
	     featureType: "poi",
	     stylers: [
	      { visibility: "off" }
	     ]
	    }
	  	];


		var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"});

		var mapOptions = {
		    zoom: 15
		    ,mapTypeControlOptions: {
		      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
		    }
		};
		map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

		map.mapTypes.set('map_style', styledMap);
		map.setMapTypeId('map_style');

		myMarker = 0;

	};


  	// detectamos movimiento en iPhone o Android
  	var useragent = navigator.userAgent;
	if ( useragent.indexOf('iPhone') !== -1 || useragent.indexOf('Android') !== -1 ) {
//alert('dentro');
		navigator.geolocation.watchPosition(
			displayLocation,
			handleError,
			{
				enableHighAccuracy: false,
				maximumAge: 30000,
				timeout: 2000
			}
		);
	} else if ( navigator.geolocation ) {
		navigator.geolocation.getCurrentPosition( displayLocation, handleError );
	}
 }

function displayLocation(position) {
	// Actualizamos posición (actualPosition con 2 valores lat y long, y actualCoordsGoogleObj q es el objeto LatLng de Google)

	actualPosition=position;

	lat=latitudActual=position.coords.latitude;
	lng=longitudActual=position.coords.longitude;
	if (!mapaActivo) {
		iniciaSockets(position);
		return;
	};
	actualCoordsGoogleObj = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
	if ( !myMarker ) {
		// Creamos nuestro marcador (solo la primera vez)
		var image = new google.maps.MarkerImage(
			'img/dot_blue.png',
			null, // tamaño
			null, // origin
			new google.maps.Point( 16, 16 ), // anchor (move to center of marker)
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
		'Se ha producido un error.',
		'Tu posición no ha podido determinarse. Activa el gps.',
		'No hemos podido determinar tu posición. Asegúrate de tener gps activado.',
		'Se ha producido un error. Inténtalo de nuevo más tarde.'
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
			new google.maps.Point( 16, 16 ), // anchor (move to center of marker)
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
	}
	markers.push(marker);
}

function removeMarker(index) {
	hideMarker(index);
	markers.splice(index,1);
}
function hideMarker(index) {
	if (markers[index]!='')markers[index].setMap(null);

}
function updatePos(index,lat,lng) {
	// actualizamos posición en local del marcador con índice en array =index;
	// var indice=((index-1)>0)?index-1:0;
	var myPos = new google.maps.LatLng(lat,lng);
	usuariosData[index].lat=lat;
	usuariosData[index].lng=lng;
	// console.log(usuariosData[index].lat + "/" + usuariosData[index].lng)
	if(markers[index]!='')markers[index].setPosition(myPos);
}


/////////////////////////////    MÉTODOS VARIOS    ///////////////////////////////

// Centramos mapa con respecto a nuestra ubicación:
function findPos(params,el) {
	setOut(params,el)
	map.setCenter(myMarker.position);
	map.setZoom(12);
}
function findPosTarget(id) {
	if(idChatAbierto!=0)cierraChat();
	var index=usuarios.indexOf(id);
	if(index<0)return;
	var marker=markers[index]
	// setOut(params,el)
	map.setCenter(marker.position);
	map.setZoom(15);
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
	// var infoContent='<div class="id">'+nombre+' ('+edadUser+' '+idTarget+')</div><div class="btnToChat">chatea ></div>';
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
	if(markers[index]!='')markers[index].setIcon(image)
}

// abrimos chat con otro usuario:
var chatAbierto=false;
function checkEncadenarseSymbol(id) {
	var display=(usuarios.indexOf(id)<0)?'desenlazarse':'enlazarse';
	if (encadenados!=undefined || encadenados!=null) {
		if(encadenados.length>0){
			if (encadenados.indexOf(id)>=0){
				display='desenlazarse';
			}
		}
	}
	if (display=='enlazarse') {

		$('.linkico').removeClass('linkico2');
	}else{
		$('.linkico').addClass('linkico2');
	}
}

function abreChat(id,index,nombre1) {
	//alert("abreChat")
	chatAbierto=true;
	// alert('abreChat')
	checkEncadenarseSymbol(id);
	// $('.linkico').css('background',"url('img/"+display+".png') no-repeat");
	$('.linkBtn').css('display','block');

	idChatAbierto=id;
	if(mapaActivo)infowindow.close();
	var idOnline=(usuarios.indexOf(id)<0)?false:true
	var nombre=(idOnline)?(nombre1==undefined)?usuariosData[index].nombre:nombre1:conversaciones[id][0].nombre;
	var edad=(idOnline)?usuariosData[index].edad:conversaciones[id][0].edad;
	var temperatura=(idOnline)?usuariosData[index].temperatura:100;
	$('.userChat').html(nombre+'/'+edad+'años/'+'<img style="position:absolute;width:20px;top:5px;" src="img/icons/dot000'+Math.round(temperatura/10)+'.png">');
	//$('.userChat').html(nombre+'/'+edad+'años/'+'/'+idChatAbierto+'<img style="position:absolute;width:20px;top:5px;" src="img/icons/dot000'+Math.round(temperatura/10)+'.png">');
	// modificamos propiedades de los contenedores:
	$('.contentText').html('');
	if (!$('.contentText').hasClass('content_active')) {
		$('.contentText').addClass('content_active');
		// if(!isMobile.any())$('.chat_text').focus();
	};
	$('.chat_text').focus(function(){
		if (standaloneModeActive) {
			var posBottom=(document.documentElement.clientHeight/2)+'px'
			$('#footer-box').css('bottom',posBottom);
			$('#footer-box-bg').css('height',posBottom);
		}else{
			// alert('focus no standalone')
		}
	});
	$('.chat_text').blur(function(){
		if (standaloneModeActive) {
			$('#footer-box').css('bottom','0px')
			$('#footer-box-bg').css('height','0px');
		}else{
			// alert('blur no standalone')
		}
	});

	$('.main').css('display','block');
	$('#footer-box').css('bottom','0px');
	$('.containerControls').css('top','-50px');
	snapper.close(); // cerramos sidebars;

	if(window[id]!=undefined){

		if (window[idChatAbierto].length!=undefined ) {
			if(!idOnline){
				if(encadenados.indexOf(id)<0)$('.linkBtn').css('display','none');
				$('.userChat').find('img').attr('src','img/icons/dot_inactivo.png');
			}

			removeMsgsAlert(window[idChatAbierto][0].msgs);
			$('#'+idChatAbierto).find('.items').css('display','none'); // ocultamos circulo de msgs de este usuario de la lista de la derecha
			window[idChatAbierto][0].msgs=0; // quitamos mensajes pendientes solo de ese usu
			updateEncadenadosConversation(idChatAbierto)
			/// cargamos msgs ya existentes:
			for (var i = 0; i < window[idChatAbierto][1].length; i++) {
				var obj=window[idChatAbierto][1][i];
				addTextToChat(window[idChatAbierto],obj);
			};
			if(idOnline)sendPTic(id);
		}
	}
}
function cierraChat() {
	idChatAbierto=0;
	chatAbierto=false;
	var transparents='<div class="transparent"></div><div class="transparent_right"></div>';
	$('.contentText').html(transparents);
	if ($('.contentText').hasClass('content_active')) {
		$('.contentText').removeClass('content_active');
	};
	$('.main').css('display','none');
	$('#footer-box').css('bottom','-60px');
	$('.containerControls').css('top','0px');
}


//////////////////////////////////////////////////////////////////////////////////

