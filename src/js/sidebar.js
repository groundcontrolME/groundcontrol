$$ = function(id){
	return document.getElementById(id);
}
var snapper;
var o={};
var sideBarAbierto=null;
function initSidebars() {
	snapper = new Snap({
		element: document.getElementById('content'),
		hyperextensible: false,
		dragger: document.getElementById('contenido')//,
		// disable: 'right'
	});
	snapper.on('drag', UpdateDrawers);
	snapper.on('animating', UpdateDrawers);
	snapper.on('animated', UpdateDrawers);
	snapper.on('close',updateData);
	// o.disable="right";
	// snapper.settings(o);
}

function UpdateDrawers(){
	var state = snapper.state(),
		towards = state.info.towards,
		opening = state.info.opening;
	if(opening=='right' && towards=='left'){
		sideBarAbierto="right";
		$$('right-drawer').classList.add('active-drawer');
		$$('left-drawer').classList.remove('active-drawer');
	} else if(opening=='left' && towards=='right') {
		sideBarAbierto="left";
		$$('right-drawer').classList.remove('active-drawer');
		$$('left-drawer').classList.add('active-drawer');
	}
};

function updateData () {
	sideBarAbierto=null;
	if (temperaturaNueva==true && $('#level_control').val()!=undefined) {
		sendEstado($('#level_control').val());
		temperaturaNueva=false;
	};
}

function abrePanelIzq(params,el) {
	el.css('opacity','1');
	snapper.open('left');
}
function abrePanelDer(params,el) {
	el.css('opacity','1');
	snapper.open('right');
}
var iconosOpened=false;
function quitIconsFuncOnScreen() {
  if(!iconsActiveOnScreen){
        $('.appIns').remove(); 
        $('#userInfoTab .linea_separacion').remove();
    }
}
var standaloneModeActive=false;
function initIconsFunctionality() {
	quitIconsFuncOnScreen();
	$('.iconsBloque').click(function(){
		iconosOpened=!iconosOpened;
		var altura=(iconosOpened)?'260px':'60px';
		var fondoflecha=(iconosOpened)?'url("img/flecha_arriba.png") no-repeat top center':'url("img/flecha_abajo.png") no-repeat top center';
		$('.appIns').css('height',altura);
		$('#icono_flecha_abajo').css('background',fondoflecha);
	});
	$('.btnIcon').click(function(){
		setIcon($(this).attr('param-number'));
		showIconPath();
	});
//	 alert((screen.height-document.documentElement.clientHeight))
//	alert(window.navigator.standalone)
	if(window.navigator.standalone != undefined){
		if(window.navigator.standalone == true){
			$('.appIns').remove();
		}
	}else{
		if((screen.height-document.documentElement.clientHeight)<80){
			$('.appIns').remove();
		}
	}
	// standaloneModeActive = window.navigator.standalone || navigator.standalone || (screen.height-document.documentElement.clientHeight)<80 || ("standalone" in window.navigator);
	// if(standaloneModeActive && !localTest)
}
