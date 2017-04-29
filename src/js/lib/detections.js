// MOBILE
	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i) ? true : false;
		},
		BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i) ? true : false;
		},
		iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
		},
		Windows: function() {
			return navigator.userAgent.match(/IEMobile/i) ? true : false;
		},
		any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
		}
	};
	//alert(isMobile.any());

// USER AGENT
var navUsed 		= new Array();
function navigators_detecction(){

	var navegador 		= navigator.appCodeName;
	var navName			= navigator.appName;
	var version			= navigator.appVersion;
	var cookies			= navigator.cookieEnabled;
	var os				= navigator.platform;
	var	userAgent		= navigator.userAgent;

	navUsed = Array(navegador,navName,version, cookies, os, userAgent);
	return navUsed;


}
var navJquery		= new Array();
function jqueryDetection(){
	 jQuery.each(jQuery.browser, function(i, val) {

    	navJquery.push(i,val);
	});

}
function isSafari(){
	return navigator.userAgent.match(/Mozilla/i) ? true : false;
}

function isIE8Browser() {
    var rv = -1;
    var ua = navigator.userAgent;
    var re = new RegExp("Trident\/([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null) {
        rv = parseFloat(RegExp.$1);
    }
    return (rv == 4);
}
function isWebKit() {
	//Initialize our user agent string to lower case.
    var uagent = navigator.userAgent.toLowerCase();

    var webkitSupport= "webkit";
    //**************************
    // Detects if the current browser supports WebKit.
   if (uagent.search(webkitSupport) > -1)
      return true;
   else
      return false;
}
function getInternetExplorerVersion()
// Returns the version of Windows Internet Explorer or a -1
// (indicating the use of another browser).
{
   var rv = 1000; // Return value assumes failure.
   if (navigator.appName == 'Microsoft Internet Explorer')
   {
      var ua = navigator.userAgent;
      var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
      if (re.exec(ua) != null)
         rv = parseFloat( RegExp.$1 );
   }
   return rv;
}
// FLASH

function isFlash(){
	return swfobject.hasFlashPlayerVersion("1");
}
function isFlashVersionOk(){
	return swfobject.hasFlashPlayerVersion("10.0.115");
}
var fixViewportIpad='';
function fixMovil(){
	if(isMobile.any()){

		// window.onorientationchange = function(){
		// 	alert("yea")
		// 	location.reload(true);
		// }
		$(window).bind('orientationchange', function(){
		//	location.reload(true);
		});

		if (window.orientation == 0 || window.orientation == 180) {
			if(navigator.userAgent.match(/iPad/i)){
		 		fixViewportIpad='<meta name="viewport" content="width=device-width, initial-scale=0.75, minimum-scale=0.75, maximum-scale=0.75, user-scalable=yes" />';
		 	}else if(navigator.userAgent.match(/iPhone|iPod/i)){
		 		alert("view better on IPad or desktop");
		 		fixViewportIpad='<meta name="viewport" content="width=device-width, initial-scale=0.7, minimum-scale=0.7, maximum-scale=0.7, user-scalable=yes" />';
		 	}else if(navigator.userAgent.match(/Android/i)){
		 		fixViewportIpad='<meta name="viewport" content="width=device-width, initial-scale=0.37, maximum-scale=0.7, user-scalable=yes">';
		 	}else{
		 		fixViewportIpad='<meta name="viewport" content="width=device-width, initial-scale=0.35, user-scalable=yes">';
		 	}
		}else{
			if(navigator.userAgent.match(/iPad/i)){
		 		fixViewportIpad='<meta name="viewport" content="width=device-width, initial-scale=0.96, user-scalable=yes" />';
		 	}else if(navigator.userAgent.match(/iPhone|iPod/i)){
		 		alert("view better on IPad or desktop");
		 		fixViewportIpad='<meta name="viewport" content="width=device-width, initial-scale=0.9, user-scalable=yes" />';
		 	}else if(navigator.userAgent.match(/Android/i)){
		 		fixViewportIpad='<meta name="viewport" content="width=device-width, initial-scale=0.54, maximum-scale=0.7, user-scalable=yes">';
		 	}else{
		 		fixViewportIpad='<meta name="viewport" content="width=device-width, initial-scale=0.35, user-scalable=yes">';
		 	}
		}
 	}
 	$('head').append(fixViewportIpad);
 }
  var swidth = window.screen.width;
    //These were the values of my website CSS container for portrait and landscape
    var vpwidth = 480;
    var vlwidth = 960;
function setOrientationModes(){


    updateOrientation();

    window.addEventListener('orientationchange', updateOrientation, false);
}
function updateOrientation() {
  var viewport = document.querySelector("meta[name=viewport]");
// alert("orientationchange")
  switch (window.orientation) {

    case 0: //portrait
      //set the viewport attributes to whatever you want!
      	var escala=(isMobile.iOS())?0.75:0.35;
        viewport.setAttribute('content', 'width=' + vpwidth + ', initial-scale='+escala+', maximum-scale=1.0;')
      break;
    case 90: case -90: //landscape
      //set the viewport attributes to whatever you want!
      	var escala=(isMobile.iOS())?1:0.625;
        viewport.setAttribute('content', 'width=' + vlwidth + ', initial-scale='+escala+', maximum-scale=1.0;')
      break;
    default:
      //set the viewport attributes to whatever you want!
        viewport.setAttribute('content', 'width=' + vpwidth + ', initial-scale=0.75, maximum-scale=1.0;')
      break;
  }
    //alert(swidth + ' lead to an initial width of ' + vpwidth + ' and a rotate width of ' + vlwidth);
}


var ventana = window;
if (ventana.addEventListener) {
	var condition = navigator.onLine ? "ONLINE" : "OFFLINE";
	//alert(condition)
   ventana.addEventListener("online", function () {
     changeMode("online");}, true);
   ventana.addEventListener("offline", function () {
     changeMode("offline");}, true);
}
else if (ventana.attachEvent) {
   ventana.attachEvent("ononline", function () {
     changeMode("online");});
   ventana.attachEvent("onoffline", function () {
     changeMode("offline");});
}
else {
   ventana.ononline = function () {
     changeMode("online");};
   ventana.onoffline = function () {
     changeMode("offline");};
}
var offlineMode=false;
function changeMode(mode) {
	// alert(mode);
	if (mode=='offline') {

		offlineMode=true;

			// resetData();
			// delete idLocal;
			// console.log("offline2")
	}else{
		if (offlineMode==true) {
			offlineMode=false;
			// iniciaSockets(actualPosition);
			// console.log("actualiza1")
			// for (var i = 0; i < usuarios.length; i++) {
			// 	markers[i].setMap(null);
			// };
			//var idLocal;

			//initLocalStorage();
			//showLastUser();
			//websocket.emit('actualizaUsuariosFromServer', idLocal);
			// console.log("actualiza2")
			//document.location.href='http://www.amapoint.com/web?id=actualiza';
	 document.location.href='index.php?id=actualiza';
	//		location.reload();
			// petición al server para obtener nuevo array

		};
	}
}





