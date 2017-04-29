
var idLocal=undefined;
var idLocalLS='vacio';
var modoLista;
var websocket;
var usuarios=new Array();
var usuariosData=new Array();
var idChatAbierto=0;
var mensajesPendientes=0;
var chatsAbiertos=new Array();
var findGeoTarget_temp=false;
var bloqueaTarget_temp=false;
var ticHourDetection=true;
var temperaturaNueva=false;
var intervaloConexionSockets;
// variables de usuario que llegan desde el formulario:
var lista=new Array();
var listaIds=new Array();
var nombreLocal;
var imgUser='';
var sexo;
var preferencia;
var temperatura;
var edad;
var socketsInicidados=false;
var idToBlockTemp=0;
var bloqueoBtnChatUser=false;



navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
///////////
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
	//ip = '192.168.20.125';
	var params = {};
	params.query =  'id='+idLocalLS+'&nombre='+nombreLocal+'&edad='+edad+'&sexo='+sexo+'&preferencia='+preferencia+'&temperatura='+temperatura+'&lat='+position.coords.latitude+'&lng='+position.coords.longitude;
	if (window.location.protocol == "https:"){
		params.secure = true;
	}


	websocket = io.connect('//'+ip+':5500',params);
console.log(websocket);
//	websocket.onopen = function(socket) { console.log(socket); };


	// Definimos eventos del servidor:
	socketsInicidados=true;

	websocket.on('tuid', tuid);
	websocket.on('usuarioConectado', onUsuarioNuevo);
	websocket.on('usuarioDesconectado', onUsuarioDesconectado);
	websocket.on('privatemsg', onPrivateMsg);
	websocket.on('privatefoto', getFoto);
	websocket.on('privatetic', onPrivateTic);
	websocket.on('broadcastPosition', getPosition);
	websocket.on('broadcastEstado', getEstado);
	websocket.on('actualizaArraysUsers', getArraysUsers);
	websocket.on('peticionEncadenarseFromSrv', onPeticionEncadenarse);
	websocket.on('peticionDesencadenarseFromSrv', onPeticionDesencadenarse);
	websocket.on('respuestaEncadenarseFromSrv', onRespuestaEncadenarse);

	iniciaChat();
	$('#conectarComo').remove();
	// console.log(io) // pendiente;
	$('.btnFilter_users').click(function(){
		listaModo('users');
	});
	$('.btnFilter_chats').click(function(){
		listaModo('chats');
	});
	over($('.updateDistBtn'),setOver2);
	out($('.updateDistBtn'),setOut2);
	release($('.updateDistBtn'),orderByDistance);
	listaModo('users');
}
function tuid(id){
	idLocal = id;
	idLocalLS = id;
}
function listaModo(modo) {
	modoLista=modo;
	if (modo=='chats') {
		$('.btnFilter_chats').addClass('btnFilter_active');
		$('.btnFilter_users').removeClass('btnFilter_active');
		$('.btnChatUser').css('display','none');
		$('.chat').css('display','block');
	}else{
		$('.btnFilter_users').addClass('btnFilter_active');
		$('.btnFilter_chats').removeClass('btnFilter_active');
		$('.btnChatUser').css('display','block');
	}
}
function iniciaChat() {
	$('.chat_envia').click(function(){	// botón envía de texto de chat
		// var msg=$.trim($('.chat_text').val())+'<br>';
		var msg=$.trim($('.chat_text').html());
		$('.chat_text').html('')
		if (msg.length>0) {
			$('#footer-box').css('height','40px');
			var d = new Date();
			var h = d.getHours();
			var m = d.getMinutes();
			if (m<10)m='0'+m;
			var hora=h+':'+m;
			addMsg(idChatAbierto,msg,'tú',hora);
			// if(usuarios.indexOf(idChatAbierto)<0){
			// 	sendMsgToStack(idChatAbierto,msg,hora);
			// }else{
			// 	sendPrivateMsg(idChatAbierto,msg,hora);
		 //    	ga('send', 'event', 'envia_mensaje', 'click',nombreLocal+'-'+idChatAbierto+'-'+msg);
			// }
			if (offlineMode) {
				// alert("has perdido la conexión. tu mensaje se reenviará cu")
				var indexStackId=stackIds.indexOf(idChatAbierto);
	            if (indexStackId<0) {
	            	// alert('init Id en Stack')
	                stackIds.push(idChatAbierto);
	                var mensajes=new Array();
	                stackMsgs.push(mensajes);
	                indexStackId=stackIds.indexOf(idChatAbierto);
	            };

	            var obj=new Object();
	            obj.id=idLocal;
	            obj.idTarget=idChatAbierto;
	            obj.message=msg;
	            obj.hora=hora;

	            stackMsgs[indexStackId].push(obj);
	            updateStackLS();

	            //zzz;
			}else{
				sendPrivateMsg(idChatAbierto,msg,hora);
		    	ga('send', 'event', 'envia_mensaje', 'click',nombreLocal+'-'+idChatAbierto+'-'+msg);
			}

		}
	});
	$('#fotoBtn').click(function(){
		$('.trama').fadeIn();
		$('.buttons').fadeIn();
		$('.buttons').find('.buttonsBloqueo').css('display','none');
		$('.buttons').find('.buttonsEncadenarse').css('display','none');
		$('.buttons').find('.buttonsFoto').css('display','block');
	});
	$('.send_img').mouseenter(function(){
		$(this).css('color','#eee');
	});
	$('.send_img').mouseleave(function(){
		$(this).css('color','#fff');
	})
	// $('.askEncadenarseBtn').click(function(){
	// 	$(this).css('color','#fff');
	// 	ga('send', 'event', 'peticion_encadenarse', 'click',nombreLocal+'-'+idChatAbierto);
	// 	askEncadenarseSrv(idChatAbierto);
	// })
	$('.send_img').click(function(){
		$(this).css('color','#fff');
		if(imgUser!=''){
			ga('send', 'event', 'envia_imagen', 'click',nombreLocal+'-'+idChatAbierto);
			sendFoto(imgUser);
		}
	})
	$('.ask_img').mouseenter(function(){
		$(this).css('color','#eee');
	});
	$('.ask_img').mouseleave(function(){
		$(this).css('color','#fff');
	})
	$('.ask_img').click(function(){
		$(this).css('color','#fff');
		ga('send', 'event', 'pide_imagen', 'click',nombreLocal+'-'+idChatAbierto);
		pedirFoto();
	})
	$('#emoticonoBtn').click(function(){
		$('#footer-box').css('height','250px');
		$('#contenido').click(function(){
			$('#footer-box').css('height','40px');
			$('#contenido').click(null);
			$('.mapa').click(null);
		});
		$('.mapa').click(function(){
			$('#footer-box').css('height','40px');
			$('#contenido').click(null);
			$('.mapa').click(null);
		});
		// $('#footer-box').click(function(){
		// 	alert($(this).attr(''))
		// });
	});
	for (var i = 0; i < 28; i++) {
		$('.emoticonosLista').append('<div class="emotFoto e'+i+'" id="'+i+'"></div>');
		$('.emoticonosLista').find('.e'+i).css('background','url("img/emoticonos/e'+i+'.svg")no-repeat center center');
	};
	$('.emotFoto').click(function(){
		ga('send', 'event', 'usa_emoticono', 'click' ,nombreLocal+'-'+$(this).attr('id'));
		$('.chat_text').append('<img class="editIcon" src="img/emoticonos/e'+$(this).attr('id')+'.svg">');
	});
	if (isMobile.iOS()) {
		$('.titulo').css('font-size','15px');
		$('.usersIcon').css('margin-left','-24px');
		$('.chatIcon').css('margin-left','-26px');
	};
	$('.titulo').css('font-size','15px');
		$('.usersIcon').css('margin-left','-24px');
		$('.chatIcon').css('margin-left','-26px');
	$('.containerControls').click(function(){
		if (idChatAbierto!=0){
			if (bloqueoCierra!=true) {
				cierraChat();
			};
			bloqueoCierra=false;
		}
	});

	$('.cancelar_bloqueo').mouseenter(function(){
		$(this).css('color','#eee');
	});
	$('.cancelar_bloqueo').mouseleave(function(){
		$(this).css('color','#fff');
	})
	$('.cancelar_bloqueo').click(function(){
		$(this).css('color','#fff');
		cancelaBloqueo();
	})
	$('.bloquear_usuario').mouseenter(function(){
		$(this).css('color','#eee');
	});
	$('.bloquear_usuario').mouseleave(function(){
		$(this).css('color','#fff');
	})
	$('.bloquear_usuario').click(function(){
		$(this).css('color','#fff');
		// $('.trama').fadeOut();
		// $('.buttons').fadeOut();
		activaBloqueo();
		cancelaBloqueo();
	})

}

// gestión de mensajes pendientes:
function addMsgAlert(num) {
	if(num>1){
		mensajesPendientes+=num;
	}else{
		mensajesPendientes++;
	}

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
	if (mensajesPendientes<=0){
		mensajesPendientes=0;
		$('.msgsPendientes').hide();
	}else{
		$('.msgsPendientes').show();
	}
}

// agregamos mensajes de chat (a arrays y a chat si está abierto):
function orderByDistance() {
	setOut2 ('',$('.updateDistBtn'));
	for (var i = 0; i < lista.length; i++) {
		var index=usuarios.indexOf(lista[i].id);
		var distancia=(index<0)?0:Math.ceil(getMeters(usuariosData[index].lat,usuariosData[index].lng));
		lista[i].distancia=distancia;
	};
	lista.sort(function(a, b){
	 	return a.distancia-b.distancia
	});
	var items;
	listaIds=[];
	for (var i = 0; i < lista.length; i++) {
		var clase='btnChatUser';
		if ($('#'+lista[i].id).hasClass('chat')) {
			clase='btnChatUser chat';
		};
		items+='<li class="'+clase+'" id="'+lista[i].id+'">'+$('#'+lista[i].id).html()+'</li>';
		listaIds.push(lista[i].id);
	};
	$('.listRight').html(items);
	$('.btnChatUser').each(function(index){
		var dist=lista[index].distancia;
		if (dist<=10){
			dist='<10'
		}else if (dist<=20){
			dist='<20'
		}else if (dist<=30){
			dist='<30'
		}else if (dist>3000){
			dist='>3000'
		}else if (dist>2000){
			dist='>2000'
		}else if (dist>1000){
			dist='>1000'
		}
		$(this).find('.distancia').html(dist+'m');
		// alert($(this).find('.distancia').html() + ": " + lista[index].distancia);
	});
	$('.btnChatUser').click(function(){
		if(bloqueoBtnChatUser){
			bloqueoBtnChatUser=false;
			return;
		};
		if (findGeoTarget_temp || bloqueaTarget_temp) {
			findGeoTarget_temp=false;
			bloqueaTarget_temp=false;
			return;
		};
		var id=$(this).attr('id');

		var index;
		var nombre;
		var idOnline=(usuarios.indexOf(id)<0)?false:true
		index=(idOnline)?usuarios.indexOf(id):0;
		nombre=(idOnline)?usuariosData[index].nombre:conversaciones[id][0].nombre;

		if(window[id]!=undefined){
			if (window[id].length!=undefined ) {
				if(conversaciones[id]==undefined){
					if (window[id][0].usuarioActivo==false)return;
				}

			}
		}

		abreChat(id,index,nombre);
	});
	over($('.btnChatUser').find('.geoBtn'),setOver);
	out($('.btnChatUser').find('.geoBtn'),setOut);
	$('.btnChatUser').find('.geoBtn').click(function(){
		findGeoTarget_temp=true;
		var id = $(this).parent().attr("id");
		findPosTarget(id);
		snapper.close();
	});
	over($('.btnChatUser').find('.bloqueoBtn'),setOver2);
	out($('.btnChatUser').find('.bloqueoBtn'),setOut2);
	$('.btnChatUser').find('.bloqueoBtn').click(function(){
		bloqueoBtnChatUser=true;
		$('.trama').fadeIn();
		$('.buttons').fadeIn();
		$('.buttons').find('.buttonsBloqueo').css('display','block');
		$('.buttons').find('.buttonsFoto').css('display','none');
		$('.buttons').find('.buttonsEncadenarse').css('display','none');
		idToBlockTemp=$(this).parent().attr("id");
		// bloqueaTarget_temp=true;
		// var id = $(this).parent().attr("id");
		// bloqueaId(id);
	});
	$('.btnChatUser').find('.items').css('display','none');
	listaModo(modoLista);

}
function activaBloqueo() {
	bloqueaTarget_temp=true;
	bloqueaId(idToBlockTemp);
	ga('send', 'event', 'bloquear_usuario', 'click', nombreLocal+' bloquea a '+idToBlockTemp);
}
function cancelaBloqueo() {
	bloqueaTarget_temp=false;
	$('.trama').fadeOut();

	$('.buttons').fadeOut( "slow", function() {
    	$('.cajaButtons').css('display','none');
  	});
}
function addBtnToList (id) {
	// nuevo html de chat:
	if($('#'+id).css('position')!=undefined)return;
	var index=usuarios.indexOf(id);
	var nombre=usuariosData[index].nombre;
	var distancia=Math.ceil(getMeters(usuariosData[index].lat,usuariosData[index].lng));
	var nuevoChat='<li class="btnChatUser" id="'+id+'"><div class="btn bloqueoBtn"><div class="ico bloqueoico"></div></div><span class="nombreLista">'+nombre+'</span><span class="estadoLista cursiva"></span><span class="distancia">'+distancia+'m</span><span class="items"><span class="msgsNumber2"></span></span><div class="btn geoBtn"><div class="ico geoico"></div></div></li>';
	// agregamos botón al sidebar de la derecha y definimos acción:
	var usu=new Object();
	usu.id=id;
	usu.distancia=distancia;
	lista.push(usu);
	listaIds.push(id);
	$('.listRight').append(nuevoChat);
	orderByDistance();

	// console.log("LISTA:");
	// console.log(lista);

	// SET ENCADENADOS CHAT:
	//var idTem=usuariosData[i].id;
	//addEncadenadosId(id);
	updateEncadenadosBtnToList(id);
}

function removeBtnToList(id) {

	var index=listaIds.indexOf(id);
	lista.splice(index,1);
	listaIds.splice(index,1);
	$('#'+id).remove();
	window[id]=undefined;
	// console.log("LISTA (remove):")
	// console.log(lista);
}

function addMsg(id,msg,from,hora) {
	if (arrayBloqueados.indexOf(id)>=0)return;
	$('#'+id).addClass('chat');
	if (window[id]==undefined || window[id].length==undefined) {
		// CREA CHAT
		window[id]=new Array();
		var msgs=(from=='tú')?0:1;

		// creamos objeto con props de activo y msgs pendientes de ese usuario
		var objInitChat=new Object();
		objInitChat.created=true;
		objInitChat.usuarioActivo=true;

		var index=usuarios.indexOf(id);
		objInitChat.nombre=usuariosData[index].nombre;
		objInitChat.edad=usuariosData[index].edad;
		objInitChat.msgs=msgs;

		// addBtnToList(id);
		// var nuevoChat='<li class="btnChatUser" id="'+id+'"><div class="btn closeBtn"><div class="ico closeico"></div></div><span class="nombreLista">'+nombre+'</span><span class="estadoLista cursiva"></span><span class="items"><span class="msgsNumber2">'+msgs+'</span></span><div class="btn geoBtn"><div class="ico geoico"></div></div></li>';

		$('#'+id).find('.msgsNumber2').html(msgs);
		// objeto conversaciones
		var objMsgsChat=new Array();
		window[id][0]=objInitChat;
		window[id][1]=objMsgsChat;
		$('#'+id).find('.items').css('display','block');
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
	obj.hora=hora;
	// obj.leido=(idChatAbierto==id)?true:false;
	obj.leido=false;
	window[id][1].push(obj)
	// alert(window[id][1].length);
	if(idChatAbierto==id){
		addTextToChat(window[id],obj);
		if (from!='tú') {
			sendPTic(id);
		};
	}
	$('.chat_text').val('');
	updateEncadenadosConversation(id);
}

function setIdToEncadenados(id) {
	var index=encadenados.indexOf(id);
	if(index>=0)return;
	encadenados.push(id);
	localStorage.setObj("encadenados", encadenados);
	$('#'+id).addClass('chat');
	if (window[id]!=undefined) {
		conversaciones[id]=window[id];
		updateConversaciones();
	}
	checkEncadenarseSymbol(id);
	// console.log(conversaciones);
}
function updateEncadenadosConversation(id) {
	if (encadenados!=undefined || encadenados!=null) {
		if(encadenados.length>0){
			var indexEncadenado=encadenados.indexOf(id);
			if (indexEncadenado<0)return;
			if (window.localStorage) {
				conversaciones[id]=window[id];
				localStorage.setObj("conversaciones", conversaciones)
			}
  		}
  	}

}
function addEncadenadosBtns() {
	// alert('addEncadenadosBtns')
	// alert(encadenados)
	if (encadenados!=undefined || encadenados!=null) {
		if(encadenados.length>0){
			for (var i = 0; i < encadenados.length; i++) {
		  		// console.log(conversaciones[encadenados[i]]);
		  		addEncadenadosIdBtnToList(encadenados[i]);
		  	};
  		}
  	}
}
function addEncadenadosIdBtnToList(id) {
	// nuevo html de chat:
	if($('#'+id).css('position')!=undefined)return;
	if (window[id]==undefined || window[id].length==undefined) {
		window[id]=conversaciones[id];
	}
	var index=usuarios.indexOf(id);
	var nombre=window[id][0].nombre;
	var distancia=(index<0)?0:Math.ceil(getMeters(usuariosData[index].lat,usuariosData[index].lng));
	var nuevoChat='<li class="btnChatUser" id="'+id+'"><div class="btn bloqueoBtn"><div class="ico bloqueoico"></div></div><span class="nombreLista">'+nombre+'</span><span class="estadoLista cursiva"></span><span class="distancia">'+distancia+'m</span><span class="items"><span class="msgsNumber2"></span></span><div class="btn geoBtn"><div class="ico geoico"></div></div></li>';
	// agregamos botón al sidebar de la derecha y definimos acción:
	var usu=new Object();
	usu.id=id;
	usu.distancia=distancia;
	lista.push(usu);
	listaIds.push(id);
	$('.listRight').append(nuevoChat);
	// if(index>=0)
		orderByDistance();

	updateEncadenadosBtnToList(id);

}
function updateEncadenadosBtnToList(id) {
	//zzz;
	// console.log(conversaciones)
	if (conversaciones!=undefined || conversaciones!=null) {
		if(encadenados.length>0){

			if(conversaciones[String(id)]){

				$('#'+id).addClass('chat');
				window[id]=conversaciones[id];
				if(window[id][0].msgs>0){
					addMsgAlert(window[id][0].msgs);
					$('#'+id).find('.items').css('display','block');
					// alert("init Encadenado");
				}
				$('#'+id).find('.items').find('.msgsNumber2').html(window[id][0].msgs);
				if(usuarios.indexOf(id)<0){
					window[id][0].usuarioActivo=false;
					$('#'+id).find('.estadoLista').html(' (desconectado)');
				}
			}
		}
	}

}
var arrayBloqueados=new Array();
function bloqueaId (id) {
	arrayBloqueados.push(id);
	$('#'+id).remove();
	deleteEncadenado(id)
	var index=usuarios.indexOf(id);
	markers[index].setMap(null);
	markers[index]='';
	if (window.localStorage)localStorage.setItem("bloqueados",arrayBloqueados);
	if (window[id]!=undefined && window[id].length!=undefined) {
		removeMsgsAlert(window[id][0].msgs);
	}
	window[id]=null;
}
// agregamos bocadillo al chat:
function addTextToChat (array,obj) {
	var claseBocadillo=(obj.nombre=='tú')?'chatMsg1':'chatMsg2';
	var horaClass='<div class="chatMsgTics">'+obj.hora+'</div>';
	var ticClass=(claseBocadillo=='chatMsg1')?(obj.leido==true)?'<div class="leido">√√</div>':'<div class="leido"></div>':'';
	if (!ticHourDetection){
		horaClass='';
		ticClass='';
	}
	// var d = new Date();
	// var h = d.getHours();
	// var m = d.getMinutes();
	// if (m<10)m='0'+m;

	// h+':'+m
	//  √
	// var mensaje='<div class="'+claseBocadillo+' chatMsg"><div class="chatMsgTxt">'+obj.msg+'</div><div class="leido"></div><div class="chatMsgTics">'+obj.hora+'</div></div>'
	// var mensaje='<div class="'+claseBocadillo+' chatMsg"><div class="chatMsgTxt">'+obj.msg+'</div><div class="chatMsgTics">'+obj.hora+'</div></div>'
	if (obj.msg.indexOf('mensajeInterno')>=0) {
		claseBocadillo='chatMsgInterno';
	};
	var mensaje='<div class="'+claseBocadillo+' chatMsg"><div class="chatMsgTxt">'+obj.msg+'</div>'+ticClass+horaClass+'</div>'
	$('.contentText').append(mensaje);
	$('.content_active').animate({scrollTop: ( $(document).height())+'px'},200);
}
function setParametersNewUser(id,visible1) {
	if (window[id]!=undefined) {
		window[id][0].usuarioActivo=true;
		$('#'+id).find('.estadoLista').html('');
		$('#'+id).css('opacity','1');
		if (idChatAbierto==id) {
			var nivel=Math.round(usuariosData[index].temperatura/10);
			var icono='img/icons/dot000'+nivel+'.png';
			$('.userChat').find('img').attr('src',icono)
			$('.linkBtn').css('display','block');
		};
	}

	if(visible1==true){
		addBtnToList(id);
	}
	orderByDistance();
}
function onUsuarioNuevo(id, index, usuariosL, usuariosDataL) {
	// actualizamos arrays de usuarios:
//	alert('conectado');
	actualizaUsuarios(usuariosL, usuariosDataL);
	var visible1=false;
	if (idLocal) {
		// Usuario nuevo:
		if (usuariosDataL[index].sexo==preferencia && usuariosDataL[index].preferencia==sexo) {
			visible1=true;
		};
		if (arrayBloqueados.indexOf(id)>=0)visible1=false;
		// if (visible1)alert("nuevo usuario");
		addMarker(usuariosDataL[index].lat,usuariosDataL[index].lng,id,visible1);
		setParametersNewUser(id,visible1);
	}else{
		///// Primera conexión (solo se ejecuta la primera vez)
		//definimos nuestro id local:
		if (idLocalLS!='vacio') {
			idLocal=idLocalLS;
		}else{
			idLocal=id;
		}

		localStorage.setItem("id", idLocal);
		//$('.idTxt').html(nombreLocal+' ('+edad+' / '+idLocal+')');
		$('.idTxt').html(nombreLocal+' ('+edad+')');
		quitPreloader();



		// $('.idTxt').html(nombreLocal+' ('+edad+') ' + idLocal);
		// Pintamos usuarios anteriores a nosotros
		for (var i = 0; i < usuariosDataL.length; i++) {
			var visible2=false;
			if (usuariosDataL[i].sexo==preferencia && usuariosDataL[i].preferencia==sexo) {
				visible2=true;
				// alert(usuariosDataL[i].nombre+ '\n' +usuariosDataL[i].id+ '\n' + usuariosDataL[i].sexo+"/"+usuariosDataL[i].preferencia + '\n' + sexo+"/"+preferencia)

			};


			if (arrayBloqueados.indexOf(usuariosData[i].id)>=0)visible2=false;
			if (usuariosData[i].id==idLocal)visible2=false;
			// if (visible2==true)alert("usuario anterior");
			if (visible2==true)addBtnToList(usuariosData[i].id);
			addMarker(usuariosDataL[i].lat,usuariosDataL[i].lng,usuariosDataL[i].id,visible2);
		};
		addEncadenadosBtns();
		checkForStackMsgs();
		orderByDistance();
		//zzz;
	}
	 $('#userInfoTab #idUser').val(idLocal); // asigna idlocal al formulario del tab izquierdo en un hidden.

}
function checkForStackMsgs() {
	// alert('checkForStackMsgs')
	// alert(stackMsgs.length)
	if (stackMsgs!=undefined || stackMsgs!=null) {
		if(stackMsgs.length>0){
			for (var i = 0; i < stackMsgs.length; i++) {
				 for (var j = 0; j < stackMsgs[i].length; j++) {
		              var idTargetStack=stackMsgs[i][j].idTarget;
		              var idStack=stackMsgs[i][j].id;
		              var messageStack=stackMsgs[i][j].message;
		              var horaStack=stackMsgs[i][j].hora;
		              sendPrivateMsg(idTargetStack, messageStack,horaStack);
		             // socket.emit('privatemsg', idStack, messageStack,horaStack);
		        };
			};
  		}
  	}

	//zzz;
    resetStack();
}
function onUsuarioDesconectado(id,index,usuariosL,usuariosDataL) {
	// console.log("desconectado: " + id);
	// eliminamos marker GoogleMaps de array:

	removeMarker(index)

	// actualizamos arrays usuarios:
	if (window[id]==undefined || window[id].length==undefined) {
		if (listaIds.indexOf(id)>=0)removeBtnToList(id);
	}else{
		window[id][0].usuarioActivo=false;
		$('#'+id).find('.estadoLista').html(' (desconectado)');
		$('#'+id).find('.items').css('display','none');
		removeMsgsAlert(window[id][0].msgs);
		if(encadenados.indexOf(id)<0)$('#'+id).css('opacity','0.5');
		if (idChatAbierto==id) {
			$('.userChat').find('img').attr('src','img/icons/dot_inactivo.png')
			if(encadenados.indexOf(id)<0)$('.linkBtn').css('display','none');
		};
	}
	actualizaUsuarios(usuariosL, usuariosDataL);
	// var indexOld=usuarios.indexOf(id);
	// alert(indexOld)
}

function actualizaUsuarios(usuariosL, usuariosDataL) {
	// actualizamos arrays locales de usuarios con los actualizados desde el servidor
	usuarios=usuariosL;
	usuariosData=usuariosDataL;

	// console.log('USUARIOS:');
	// for (var i = 0; i < markers.length; i++) {
	// 	alert(usuarios[i].length)
		// if(idLocal != usuarios[i] ){
		// 	markers[i].setMap(null);
		// }
		//markers[i].setMap(null);
	// };
	// console.log(usuarios);
	// console.log('MARKERS:');
	// console.log(markers);
}

function onPrivateTic(id) {
	if(window[id]!=undefined){
		if (window[id].length!=undefined ) {
			for (var i = 0; i < window[id][1].length; i++) {
				var obj=window[id][1][i];
				obj.leido=true;
				if (idChatAbierto==id) {
					$('.chatMsg1').find('.leido').html('√√');
				};
			};
		}
		updateEncadenadosConversation(id);
	}
}

function sendPTic(id) {
	if (!ticHourDetection)return;
	updateEncadenadosConversation(id);
	websocket.emit('ptic', id);
}
function onPrivateMsg(id,msg,hora) {
	// alert('onPrivateMsg: ' + msg)
	var index=usuarios.indexOf(id);
	var nombre=(index<0)?conversaciones[id][0].nombre:usuariosData[index].nombre;

	if (navigator.vibrate) {
		console.log("vibrate")
	  	// window.navigator.vibrate(2000);
	  	navigator.vibrate([50, 100, 150]);
	}
	addMsg(id,msg,nombre,hora);
}
function sendPrivateMsg(id,msg,hora) {
	// alert("send")
	websocket.emit('pm', id, msg,hora);
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
	if (id=='' || id==undefined || lat=='' || lat==undefined || lng=='' || lng==undefined)return;
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
function getArraysUsers(usuariosL, usuariosDataL) {
	console.log("getArraysUsers")
	actualizaUsuarios(usuariosL, usuariosDataL);
	for (var i = 0; i < usuariosDataL.length; i++) {
		var visible2=false;
		if (usuariosDataL[i].sexo==preferencia && usuariosDataL[i].preferencia==sexo) {
			visible2=true;
			// alert(usuariosDataL[i].nombre+ '\n' +usuariosDataL[i].id+ '\n' + usuariosDataL[i].sexo+"/"+usuariosDataL[i].preferencia + '\n' + sexo+"/"+preferencia)
		};
		if (arrayBloqueados.indexOf(usuariosData[i].id)>=0)visible2=false;
		if (usuariosData[i].id==idLocal)visible2=false;
		// if (visible2==true)alert("usuario anterior");
		if (visible2==true)addBtnToList(usuariosData[i].id);
		addMarker(usuariosDataL[i].lat,usuariosDataL[i].lng,usuariosDataL[i].id,visible2);
	};
}
function sendEstado (nivel) {
	// alert("temperatura: "+nivel)
	if (nivel=='' || nivel==undefined)return;
	var userLevel=new Object();
	userLevel.id=idLocal;
	userLevel.nivel=nivel;
	if (window.localStorage)localStorage.setItem("temperatura", nivel);
	websocket.emit('estado', userLevel);
}
function sendFoto(url) {
	if (url=='' || url==undefined)return;
	websocket.emit('pfoto', idChatAbierto,url);
	$('.trama, .buttons').fadeOut();
}

var contInter;
var contInit=5;
var cont;
function getFoto(id,url) {
	if (idChatAbierto==id) {
		ga('send', 'event', 've_imagen', 'click',idChatAbierto+" "+url);
		sendPrivateMsg(idChatAbierto,'<span class="negro mensajeInterno">¡Foto recibida!</span>','');
		// $('.picture_chat').css('background', '#000 url(api/files/'+url+') no-repeat center center')
		$('.picture_chat').css('background-color', 'rgba(0, 0, 0,0.75)');
		$('.picture_chat').css({'background-image':'url(api/files/'+url+')','background-position':'50% 50%','background-repeat':'no-repeat no-repeat','background-size':'contain'});
		$('.picture_chat').css({'width':'100%','height':'100%','padding':'0','left':'0','top':'0'});
		$('.picture_chat span').css({'position':'absolute','width':'100%','font-size':'50px','left':'0','bottom':'20px','opacity':'1'});
		$('.picture_chat span').html('5');
		cont=contInit;
		contInter = setInterval(renuevaContador,1000);
		$('.picture_chat').fadeIn('slow', function(){
			$('.picture_chat').delay(contInit*1000).fadeOut('fast');
		})
	}else{
		// var index=usuarios.indexOf(id);
		// var nombre=usuariosData[index].nombre;
		ga('send', 'event', 'no_ve_imagen', 'click',idChatAbierto+' cerrado');
		sendPrivateMsg(id,'<span class="negro mensajeInterno">La foto no se ha enviado porque <span class="verde">'+nombreLocal+'</span> no tiene abierto el chat.</span>','');
	}
}
function pedirFoto() {
	sendPrivateMsg(idChatAbierto,'¿ME MANDAS TU FOTO??','');
	$('.trama, .buttons').fadeOut();
}
function askEncadenarseSrv(id) {
	websocket.emit('peticionEncadenarse', id);
	showMsgEncadenarse1();
}
function askDesencadenarseSrv(id) {
	websocket.emit('peticionDesencadenarse', id);
	showMsgDesencadenarse1();
	deleteEncadenado(id);
}
var bloqueoCierra=false;
function askForEncadenarse() {
	bloqueoCierra=true;
	if(window[idChatAbierto]==undefined || window[idChatAbierto].length==undefined){
		alertBeforeEncadenarse();
		return;
	}
	var index=encadenados.indexOf(idChatAbierto);
	$('.askEncadenarseBtn').click(function(){
		$(this).css('color','#fff');
		var msgGA=(index>=0)?'peticion_desencadenarse':'peticion_encadenarse'
		ga('send', 'event', msgGA, 'click',nombreLocal+'-'+idChatAbierto);
		var index1=encadenados.indexOf(idChatAbierto);
		if (index1>=0) {
			// alert("desengancharte")
			askDesencadenarseSrv(idChatAbierto);
		}else{
			askEncadenarseSrv(idChatAbierto);
		}
	})
	var msg=(index>=0)?'desengancharte de':'engancharte con';
	var tituloBtn=(index>=0)?'Desengancharte':'Solicítaselo';
	$('.askEncadenarseBtn').html(tituloBtn)

	$('.trama').fadeIn();
	$('.buttons').fadeIn();
	$('.buttons').find('.buttonsBloqueo').css('display','none');
	$('.buttons').find('.buttonsFoto').css('display','none');
	$('.buttons').find('.buttonsEncadenarse').css('display','block');
	var index=usuarios.indexOf(idChatAbierto);
	var nombre=(index<0)?conversaciones[idChatAbierto][0].nombre:usuariosData[index].nombre;
	$('.buttons').find('.buttonsEncadenarse').find('.tituloEncadenarse').html('¿Quieres '+msg+' <span class="verde">' + nombre + '</span>?');
}
function showMsgEncadenarse1() {
	$('.btnTrama').css('color','#fff');
	$('.buttons').find('.msgEncadenarse').css('display','block');
	$('.buttons').find('.buttonsEncadenarse').css('display','none');
	var index=usuarios.indexOf(idChatAbierto);
	$('.buttons').find('.msgEncadenarse').find('.tituloEncadenarse').html('¡Tu solicitud para engancharte con <span class="verde">'+usuariosData[index].nombre+'</span> ha sido enviada!<br>¡Te avisaremos con su respuesta!');
}
function showMsgDesencadenarse1() {
	$('.btnTrama').css('color','#fff');
	$('.buttons').find('.msgEncadenarse').css('display','block');
	$('.buttons').find('.buttonsEncadenarse').css('display','none');
	var index=usuarios.indexOf(idChatAbierto);
	var nombre=(index<0)?conversaciones[idChatAbierto][0].nombre:usuariosData[index].nombre;
	$('.buttons').find('.msgEncadenarse').find('.tituloEncadenarse').html('<span class="verde">'+nombre+'</span> y tú estáis ahora desenganchados.<br>El usuario y vuestra conversación dejará de estar disponible cuando uno de los dos se desconecte.');
}
function showMsgDesencadenarse2(id) {
	console.log("desengancharte msg remoto")
	$('.btnTrama').css('color','#fff');
	// $('.cajaButtons').css('display','none');

	$('.buttons').find('.buttonsFoto').css('display','none');
	$('.buttons').find('.buttonsEncadenarse').css('display','none');
	$('.buttons').find('.aceptarEncadenarse').css('display','none');
	$('.buttons').find('.buttonsBloqueo').css('display','none');
	$('.trama').fadeIn();
	$('.buttons').fadeIn();
	$('.buttons').find('.msgEncadenarse').css('display','block');
	var nombre=conversaciones[id][0].nombre;
	$('.buttons').find('.msgEncadenarse').find('.tituloEncadenarse').html('<span class="verde">'+nombre+'</span> se ha desenganchado de vuestra conversación.<br>Vuestra conversación dejará de estar disponible cuando uno de los dos se desconecte.');
	deleteEncadenado(id);
}

function alertBeforeEncadenarse() {
	$('.trama').fadeIn();
	$('.buttons').fadeIn();
	$('.btnTrama').css('color','#fff');
	$('.buttons').find('.msgEncadenarse').css('display','block');
	$('.buttons').find('.buttonsEncadenarse').css('display','none');
	$('.buttons').find('.aceptarEncadenarse').css('display','none');
	var index=usuarios.indexOf(idChatAbierto);
	var nombre=usuariosData[index].nombre;
	var mensaje='Para poder engancharte con <span class="verde">'+nombre+'</span> tenéis que haber hablado antes!';
	$('.buttons').find('.msgEncadenarse').find('.tituloEncadenarse').html(mensaje);
}
function showMsgEncadenarse2(id,granted) {
	$('.trama').fadeIn();
	$('.buttons').fadeIn();
	$('.btnTrama').css('color','#fff');
	$('.buttons').find('.msgEncadenarse').css('display','block');
	$('.buttons').find('.buttonsEncadenarse').css('display','none');
	$('.buttons').find('.aceptarEncadenarse').css('display','none');
	console.log(id)

	var index=usuarios.indexOf(id);
	console.log(index)
	var nombre=usuariosData[index].nombre;
	console.log(nombre)
	var mensaje;
	if (granted==true) {
		console.log("enganchado con: " + id)
		mensaje='¡<span class="verde">'+nombre + '</span> y tú estáis ya enganchados!<br>Puedes desengancharte pulsando de nuevo en el botón de enganche.';
		//setIdToEncadenados(id);
		setIdToEncadenados(id);
	}else{
		mensaje='<span class="verde">'+nombre + '</span> no aceptó tu solicitud para engancharos.';
	}
	$('.buttons').find('.msgEncadenarse').find('.tituloEncadenarse').html(mensaje);
}

function showMsgEncadenarse3(id) {
	$('.btnTrama').css('color','#fff');
	$('.buttons').find('.aceptarEncadenarse').css('display','block');
	$('.trama').fadeIn();
	$('.buttons').fadeIn();

	var index=usuarios.indexOf(id);
	$('.buttons').find('.aceptarEncadenarse').find('.tituloEncadenarse').html('<span class="verde">'+usuariosData[index].nombre + '</span> quiere engancharse contigo.');

	$('.aceptarEncadenarseBtn').click(function(){
		showMsgEncadenarse2(id,true);
		websocket.emit('respuestaEncadenarse', id,true);
	});
	$('.rechazarEncadenarseBtn').click(function(){

		websocket.emit('respuestaEncadenarse', id,false);
		cierraCajas();
	});
}
function onPeticionEncadenarse(id) {
	showMsgEncadenarse3(id);
}
function onPeticionDesencadenarse(id) {
	console.log("desengancharse from srv")
	showMsgDesencadenarse2(id);
}
function onRespuestaEncadenarse(id,granted) {
	showMsgEncadenarse2(id,granted);
}


function cierraCajas() {
	$('.trama, .buttons, .cajaButtons').fadeOut();
}
function renuevaContador(){
cont --;
	if(cont == 0){
		clearInterval(contInter);
		cont=contInit;
	}else{
		$('.picture_chat span').html(cont);

	}
//	$('.picture_chat').html(parseInt($(this).html()-1));
}
