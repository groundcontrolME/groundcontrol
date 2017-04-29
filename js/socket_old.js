var idLocal;
var idLocalLS='vacio';
var websocket;
var usuarios=new Array();
var usuariosData=new Array();
var idChatAbierto;
var mensajesPendientes=0;
var chatsAbiertos=new Array();
var ticHourDetection=true;
var temperaturaNueva=false;
var intervaloConexionSockets;
// variables de usuario que llegan desde el formulario:

var nombreLocal;
var sexo;
var preferencia;
var temperatura;
var edad;

// solo de prueba:
// var nombres=['Pepito','Juanito','Pablito','Nachito','Jesusito','Hectorcito'];
// nombreLocal=nombres[Math.floor(Math.random()*nombres.length)];
// sexo='h';
// preferencia='h';
// temperatura=Math.round(Math.random()*10)*10;
// temperaturaNueva=false;
// edad=Math.floor(Math.random()*10)+30;

//////////////////

//console.log(io) // pendiente
var intervals=0;
function creaIntervaloSockets(position){
	alert("intervalo");
	intervals++;
	intervaloConexionSockets=setInterval(reconecta,3000,position);
}
function reconecta(position) {
	if (io) {
		clearInterval(intervaloConexionSockets);
		iniciaSockets(position);
	}
}
function iniciaSockets(position){
	if (io == 'undefined') {
		creaIntervaloSockets(position);
		return;
	}
	//alert('iniciaSockets: ' + temperatura);
	initSidebars();
	initForm();
	$('.snap-drawers').css('display','block'); // mostramos sidebars

	// Conectamos:
	ga('send', 'APPS', 'CONECTA', 'APLICACION');
	websocket = io.connect('http://'+ip+':5500',{query:'id='+idLocalLS+'&nombre='+nombreLocal+'&edad='+edad+'&sexo='+sexo+'&preferencia='+preferencia+'&temperatura='+temperatura+'&lat='+position.coords.latitude+'&lng='+position.coords.longitude});
	// Definimos eventos del servidor:
	websocket.on('usuarioConectado', onUsuarioNuevo);
	websocket.on('usuarioDesconectado', onUsuarioDesconectado);
	websocket.on('privatemsg', onPrivateMsg);
	websocket.on('broadcastPosition', getPosition);
	websocket.on('broadcastEstado', getEstado);
	iniciaChat();
	$('#conectarComo').remove();
	console.log(io) // pendiente
}
function iniciaChat() {
	$('.chat_envia').click(function(){	// botón envía de texto de chat
		// var msg=$.trim($('.chat_text').val())+'<br>';
		var msg=$.trim($('.chat_text').html());
		if (msg.length>4) {
			addMsg(idChatAbierto,msg,'tú');
			sendPrivateMsg(idChatAbierto,msg);
		}
	});

}
// gestión de mensajes pendientes:
function addMsgAlert() {
	mensajesPendientes++;
	$('.msgsNumber').html(mensajesPendientes);
	if (mensajesPendientes<=0) {
		mensajesPendientes=0;
		$('.msgsPendientes').hide();
	}else{
		$('.msgsPendientes').show();
	}
}
function removeMsgsAlert(number) {
	mensajesPendientes-=number;
	$('.msgsNumber').html(mensajesPendientes);
	if (mensajesPendientes<=0) {
		mensajesPendientes=0;
		$('.msgsPendientes').hide();
	}else{
		$('.msgsPendientes').show();
	}
}
var findGeoTarget=false;
var bloqueaTarget=false;
// agregamos mensajes de chat (a arrays y a chat si está abierto):
function addMsg(id,msg,from) {
	// alert(window[id])
	if (window[id]==undefined) {
		window[id]=new Array();
		var msgs=(from=='tú')?0:1;

		// creamos objeto con props de activo y msgs pendientes de ese usuario
		var objInitChat=new Object();
		objInitChat.usuarioActivo=true;
		objInitChat.msgs=msgs;

		// nuevo html de chat:
		var index=usuarios.indexOf(id);
		var nombre=usuariosData[index].nombre;

		var nuevoChat='<li class="btnChatUser" id="'+id+'"><div class="btn closeBtn"><div class="ico closeico"></div></div><span class="nombreLista">'+nombre+'</span><span class="estadoLista cursiva"></span><span class="items"><span class="msgsNumber2">'+msgs+'</span></span><div class="btn geoBtn"><div class="ico geoico"></div></div></li>';
		
		// agregamos botón al sidebar de la derecha y definimos acción:
		$('.listRight').append(nuevoChat)
		$('#'+id).click(function(){
			if (findGeoTarget || bloqueaTarget) {
				findGeoTarget=false;
				bloqueaTarget=false;
				return;
			};
			if (window[id][0].usuarioActivo==false)return;
			abreChat(id,index,nombre);
		});
		over($('#'+id).find('.geoBtn'),setOver);
    	out($('#'+id).find('.geoBtn'),setOut);
    	release($('#'+id).find('.geoBtn'),function(){
    		findGeoTarget=true;
    		snapper.close();
    		findPosTarget(id)
    	});
    	over($('#'+id).find('.closeBtn'),setOver2);
    	out($('#'+id).find('.closeBtn'),setOut2);
    	release($('#'+id).find('.closeBtn'),function(){
    		bloqueaTarget=true;
    		// snapper.close();
    		$('#'+id).remove();
    		var index=usuarios.indexOf(id);
    		markers[index].setMap(null);
    		markers[index]='';
    		alert(id);
    	});
		$('#'+id).find('.items').css('display','none');
		// objeto conversaciones
		var objMsgsChat=new Array();
		window[id][0]=objInitChat;
		window[id][1]=objMsgsChat;
	}else{
		
		if (idChatAbierto!=id) {
			window[id][0].msgs++;
			$('#'+id).find('.items').css('display','block');
			$('#'+id).find('.items').find('.msgsNumber2').html(window[id][0].msgs)
		};
		
	}
	if(from!='tú' && idChatAbierto!=id)addMsgAlert();
	var obj=new Object();
	obj.nombre=from;
	obj.msg=msg;
	obj.leido=(idChatAbierto==id)?true:false;
	window[id][1].push(obj)
	// alert(window[id][1].length);
	if(idChatAbierto==id)addTextToChat(window[id],obj);
	$('.chat_text').val('');

}
// agregamos bocadillo al chat:
function addTextToChat (array,obj) {
	var claseBocadillo=(obj.nombre=='tú')?'chatMsg1':'chatMsg2';
	var d = new Date();
	var h = d.getHours();
	var m = d.getMinutes();
	if (m<10)m='0'+m;
	var mensaje='<div class="'+claseBocadillo+' chatMsg"><div class="chatMsgTxt">'+obj.msg+'</div><div class="chatMsgTics">'+h+':'+m+'</div></div>'
	$('.contentText').append(mensaje);
	$('.content_active').animate({scrollTop: ( $(document).height())+'px'},200);
}

function onUsuarioNuevo(id, index, usuariosL, usuariosDataL) {
	// actualizamos arrays de usuarios:
	actualizaUsuarios(usuariosL, usuariosDataL);
	if (idLocal) {
		// Usuario nuevo:
		// alert("PREFERENCIA user/yo: " + usuariosDataL[index].sexo + "/"+preferencia);
		var visible1=false;
		if (usuariosDataL[index].sexo==preferencia && usuariosDataL[index].preferencia==sexo) {
			visible1=true;
		};
		// if (visible1)alert("nuevo usuario");
		addMarker(usuariosDataL[index].lat,usuariosDataL[index].lng,id,visible1);
		if (window[id]!=undefined) {
			window[id][0].usuarioActivo=true;
			$('#'+id).find('.estadoLista').html('');
			$('#'+id).css('opacity','1');
			if (idChatAbierto==id) {
				var nivel=Math.round(usuariosData[index].temperatura/10);
				var icono='img/icons/dot000'+nivel+'.png';
				$('.userChat').find('img').attr('src',icono)
			};
		}

	}else{
		///// Primera conexión (solo se ejecuta la primera vez)
		//definimos nuestro id local:
		if (idLocalLS!='vacio') {
			idLocal=idLocalLS;	
		}else{
			idLocal=id;	
		}
		localStorage.setItem("id", idLocal);
		// $('.idTxt').html(nombreLocal+' ('+edad+')');
		$('.idTxt').html(nombreLocal+' ('+edad+') ' + idLocal);
						// console.log("this ID: " + idLocal, index);
		// Pintamos usuarios anteriores a nosotros
		for (var i = 0; i < usuariosDataL.length; i++) {
			var visible2=false;
			if (usuariosDataL[i].sexo==preferencia && usuariosDataL[i].preferencia==sexo) {
				visible2=true;
				// alert(usuariosDataL[i].nombre+ '\n' +usuariosDataL[i].id+ '\n' + usuariosDataL[i].sexo+"/"+usuariosDataL[i].preferencia + '\n' + sexo+"/"+preferencia)
			};
			if (usuariosData[i].id==idLocal)visible2=false;
			// if (visible2==true)alert("usuario anterior");
			addMarker(usuariosDataL[i].lat,usuariosDataL[i].lng,usuariosDataL[i].id,visible2);
		};
	}
	 $('#userInfoTab #idUser').val(idLocal); // asigna idlocal al formulario del tab izquierdo en un hidden.
	
}
function onUsuarioDesconectado(id,index,usuariosL,usuariosDataL) {
	console.log("desconectado: " + id);
	// eliminamos marker GoogleMaps de array:
	removeMarker(index)
	// actualizamos arrays usuarios:
	if (window[id]!=undefined) {
		window[id][0].usuarioActivo=false;
		$('#'+id).find('.estadoLista').html(' (desconectado)');
		$('#'+id).find('.items').css('display','none');
		$('#'+id).css('opacity','0.5');
		if (idChatAbierto==id) {
			$('.userChat').find('img').attr('src','img/icons/dot_inactivo.png')
		};
	}
	actualizaUsuarios(usuariosL, usuariosDataL);
}

function actualizaUsuarios(usuariosL, usuariosDataL) {
	// actualizamos arrays locales de usuarios con los actualizados desde el servidor
	usuarios=usuariosL;
	usuariosData=usuariosDataL;
	console.log('USUARIOS:')
	console.log(usuariosData);
	console.log('MARKERS:')
	console.log(markers);
}
function onPrivateMsg(id,msg) {
	var index=usuarios.indexOf(id);
	var nombre=usuariosData[index].nombre;
	addMsg(id,msg,nombre);
}
function sendPrivateMsg(id,msg) {
	websocket.emit('pm', id, msg);
}
function sendMensajesLeidos(id) {
	websocket.emit('pmsgsleidos', id);
}
function sendPosition(id,lat,lng) {
	// emitimos a Servidos el id y coordenadas con nuevo objeto:
	var userPos=new Object();
	userPos.id=id;
	userPos.lat=lat;
	userPos.lng=lng;
	websocket.emit('position', userPos);
}
function getPosition (obj) {
	// obtemos objeto usuario con id y coordenadas
	if (idLocal==obj.id)return;
	// obtemos índeice de usuario en los arrays
	var index=usuarios.indexOf(obj.id);
	if (index<0)return;
	// actualizamos posición en local:
	updatePos(index,obj.lat,obj.lng);
}
function getEstado(id,index,nivel) {
	if (idLocal==id || index<0)return;
	updateEstado(index,nivel);

}
function sendEstado (nivel) {
	var userLevel=new Object();
	userLevel.id=idLocal;
	userLevel.nivel=nivel;
	if (window.localStorage)localStorage.setItem("temperatura", nivel);
	websocket.emit('estado', userLevel);
}

