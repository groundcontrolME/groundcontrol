<!DOCTYPE html>
<html>
<head>
    <meta http-equiv='Content-Type' content='text/html; charset=utf-8'/>
    <meta name="viewport" content="width = device-width">
    <meta name="viewport" content="initial-scale = 1.0, user-scalable = no">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="mobile-web-app-capable" content="yes">

    <link id="linkApple1" rel="apple-touch-icon" />
    <link id="linkApple2" rel="apple-touch-icon-precomposed" />
    <link id="linkIpad" rel="apple-touch-icon" sizes="72x72" />
    <link id="linkApple3" rel="apple-touch-icon" sizes="114x114" />
    <link id="linkAndroid" rel="apple-touch-icon" sizes="128x128" />
    <!-- <link rel="apple-touch-startup-image" href="ath/imgs/iphone-startup-page.png"/> -->

<script src="//cdnjs.cloudflare.com/ajax/libs/socket.io/1.7.3/socket.io.min.js" > </script>

    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="mobile-web-app-capable" content="yes"/>
    <meta class="metatitle" name="mobile-web-app-title" />
    <meta class="metatitle" name="apple-mobile-web-app-title" />
    <!-- <link rel="apple-touch-icon-precomposed" href="ath/imgs/icon-152x152-precomposed.png"> -->


           <!-- Startup images -->

<!-- iOS 6 & 7 iPad (retina, portrait) -->
<link id="linkBg1"
      media="(device-width: 768px) and (device-height: 1024px)
         and (orientation: portrait)
         and (-webkit-device-pixel-ratio: 2)"
      rel="apple-touch-startup-image">

<!-- iOS 6 & 7 iPad (retina, landscape) -->
<link id="linkBg2"
      media="(device-width: 768px) and (device-height: 1024px)
         and (orientation: landscape)
         and (-webkit-device-pixel-ratio: 2)"
      rel="apple-touch-startup-image">

<!-- iOS 6 iPad (portrait) -->
<link id="linkBg3"
      media="(device-width: 768px) and (device-height: 1024px)
         and (orientation: portrait)
         and (-webkit-device-pixel-ratio: 1)"
      rel="apple-touch-startup-image">

<!-- iOS 6 iPad (landscape) -->
<link id="linkBg4"
      media="(device-width: 768px) and (device-height: 1024px)
         and (orientation: landscape)
         and (-webkit-device-pixel-ratio: 1)"
      rel="apple-touch-startup-image">

<!-- iOS 6 & 7 iPhone 5 -->
<link id="linkBg5"
      media="(device-width: 320px) and (device-height: 568px)
         and (-webkit-device-pixel-ratio: 2)"
      rel="apple-touch-startup-image">

<!-- iOS 6 & 7 iPhone (retina) -->
<link id="linkBg6"
      media="(device-width: 320px) and (device-height: 480px)
         and (-webkit-device-pixel-ratio: 2)"
      rel="apple-touch-startup-image">

<!-- iOS 6 iPhone -->
<link id="linkBg7" href=""
      media="(device-width: 320px) and (device-height: 480px)
         and (-webkit-device-pixel-ratio: 1)"
      rel="apple-touch-startup-image">

<title>amapoint</title>

    <link rel="stylesheet" href="css/jquery.mobile-1.4.2.min.css" />
    <link rel="stylesheet" type="text/css" href="css/main.css" />
    <link rel="stylesheet" href="css/map.css">


    <script src="js/lib/jquery-2.1.1.min.js"></script>
    <script src="//code.jquery.com/mobile/1.4.2/jquery.mobile-1.4.2.min.js"></script>
    <script src="js/lib/detections.js"></script>
    <script src="js/lib/snap.js"></script>
    <script src="js/mouseEvents.js"></script>
    <script src="js/sidebar.js"></script>
    <script src="js/geo.js"></script>
    <script src="js/socket.js"></script>
    <script src="js/map.js"></script>

    <link rel="stylesheet" type="text/css" href="ath/style/addtohomescreen.css">
    <script src="ath/src/addtohomescreen.js"></script>
    <script type="text/javascript">
        addToHomescreen.removeSession();     // use this to remove the localStorage variable
        var ath = addToHomescreen({
          // detectHomescreen: true,
            skipFirstVisit: false,  // show at first access
            startDelay: 0,          // display the message right away
            lifespan: 0,            // do not automatically kill the call out
            displayPace: 0,         // do not obey the display pace
            maxDisplayCount: 0,      // do not obey the max display count
            autostart:false
        });
        ath.clearSession();      // reset the user session
        function showIconPath() {
          ath.show();
        }
        var iconsActiveOnScreen;
        function checkDOMForIconsFunctionalities(icons) {
          iconsActiveOnScreen=icons;
        }

        // showIconPath();
    </script>

    <script>
      var ip='82.98.139.239';
      var ip='192.168.20.254';
      var ip='amapoint.takeaway.es';
      //var ip='192.168.20.125';
      // var ip='192.168.1.132';
      jQuery(function($) {
          var script = document.createElement('script');
          script.src = '//'+ip+':5500/socket.io/socket.io.js';
          document.body.appendChild(script);
        });
    </script>

    <!-- <script src="//cdn.socket.io/socket.io-1.7.3.js"></script> -->
</head>
<body>
<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-50547772-1', 'amapoint.com');
ga('require', 'displayfeatures');
ga('send', 'pageview');

$(document).on('ready',function(){

})
</script>
<style type="text/css">
.mainTitle{
  position: relative;
  width: 400px;
  margin-left: -200px;
  height: 30px;
  /*background-color: #ff0;*/
  top:10px;
  left: 50%;
}
.logoNegro{
    position: relative;
    top:-65px;
    left: 167px;
    width: 240px;
    height: 70px;
    margin-left: -2px;
    background: url(img/amapoint_negro.png) no-repeat center center;
    background-size: 100% 100%;
}
.logoNegro2{
    position: relative;
    top:15px;
    left: 50%;
    width: 240px;
    height: 70px;
    margin-left: -120px;
    background: url(img/amapoint_negro.png) no-repeat center center;
    background-size: 100% 100%;
}
#preloaderBgAll{
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.85);
  display: none;
  z-index: 10000000;
}
#preloaderAll{
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -32px;
  margin-left: -32px;
  width: 63px;
  height: 64px;
  background: url(img/preloaderblack.gif) no-repeat center center;

}
</style>
  <div class="formulario"  >
    <form id="userData" style="display:none">
      <!-- <div class="mainTitle"><h1>Bienvenido a </h1><div class="logoNegro"></div></div><br> -->
      <div class="logoNegro2"></div><br>
      <input name="text-basic" id="nick" value="" type="text" placeholder="tu nick">
      <label for="edad">tu edad:</label>
      <input name="slider-fill" id="edad" value="30" min="16" max="50" step="1" data-highlight="true" type="range">
      <div class="mitad">
        <label for="soy">eres:</label>
        <select name="slider-flip-m" id="soy" data-role="slider" data-mini="true">
            <option value="h"  selected="">chico</option>
            <option value="m">chica</option>
        </select>
      </div>
      <div class="mitad">
      <label for="busco">buscas:</label>
      <select name="slider-flip-m" id="busco" data-role="slider" data-mini="true">
          <option value="h">chico</option>
          <option value="m" selected="">chica</option>
      </select>
      </div>
      <label for="temperatura">tu temperatura:</label>
      <input name="slider-fill" id="temperatura" class="temperatura" value="50" min="0" max="100" step="1" data-highlight="true" type="range">
      <input value="conectarme" data-theme="b" type="submit">
    </form>
    <div id="conectarComo"  style="display:none">
      <div class="logoNegro2"></div><br>

      <h1>Conectar como </h1>
      <input value="conectarme" data-theme="b" type="button" class="mismoUser">
      <a href="##" class="removeconectarcomo">conectar con otro usuario</a>
    </div>
  </div>
  <div class="containerAll" style="display:none">
    <!--
    SIDEBAR -->
    <div class="snap-drawers">
      <div class="snap-drawer snap-drawer-left" id="left-drawer">
        <ul class="list">
                <h2></h2>
                <?php include 'form.html'; ?>
        </ul>
      </div>
      <div class="snap-drawer snap-drawer-right" id="right-drawer">
        <span class="titulo">
          <span class="btnFilter btnFilter_users"><div class="usersIcon"></div>Usuarios</span>
          <span class="btnFilter btnFilter_chats"><div class="chatIcon"></div>Chats</span>
          <span class="btnFilter btnFilter_update"><div class="btn updateDistBtn"><div class="ico updatedistico"></div></div></span>
        </span>
        <ul class="list listRight"></ul>
      </div>
    </div>
    <!--
    CONTENIDO CENTRAL -->
    <div id="content" class="snap-content">
      <!--
      FORMULARIO DATOS INICIO -->
      <!--  -->
      <!--
      CABECERA Y MAPA -->
      <!--  -->
      <div class="mapa">
          <div class="bg"></div>

          <div id="map_wrapper">
              <div id="map_canvas" class="mapping"></div>
          </div>
          <div class="mapControls">
            <div class="containerControls">
              <div class="btn backBtn">
                <div class="ico backico"></div>
              </div>
              <div class="msgsPendientes"><span class="msgsNumber">0</span></div>
              <div class="btn updateBtn">
                <div class="ico updateico"></div>
              </div>

              <div class="btn geoBtn">
                <div class="ico geoico"></div>
              </div>
              <div class="btn linkBtn">
                <div class="ico linkico"></div>
              </div>
              <div class="btn closeBtn">
                <div class="ico closeico"></div>
              </div>
              <div class="userChat"></div>
              <div class="idTxt"></div>
            </div>
          </div>
      </div>
      <!--
      CHATS -->
      <!--  -->
      <div id ="contenido" class="contentText">
        <div class="transparent"></div>
        <div class="transparent_right"></div>
        <div class="main"></div>
      </div>
      <!--
      MENU FOOTER -->
      <div id="footer-box-bg" data-snap-ignore="true"></div>
      <div id="footer-box" data-snap-ignore="true">
        <table class="tablafooter" width="100%" border="0" cellspacing="5" cellpadding="0">
          <tr>
              <td width="30px"><div id="fotoBtn" class="btnsChat fotochat"></div></td>
              <td width="30px"><div id="emoticonoBtn" class="btnsChat emoticono"></div></td>
              <td><div class="chat_text" contenteditable="true" onkeydown="if (event.keyCode == 13) document.getElementById('chat_envia').click()" ></div></td>
                      <!-- <td><div class="chat_text" contenteditable="true" onkeydown="if (event.keyCode == 13) document.getElementById('chat_envia').click()" ></div></td> -->
                      <td width="30px"><div id="chat_envia" class="btnsChat chat_envia">></div></td>
          </tr>
        </table>
        <div class="emoticonosLista">

        </div>
      </div>
      <!--  -->
    </div>
  </div>

  <script type="text/javascript">
    var localTest=false;
    var conversaciones=new Object();
    var encadenados=new Array();
    // MENSAJES EN ESPERA:

    var stackMsgs=new Array();
    var stackIds=new Array();


    if (window.localStorage) {
      Storage.prototype.setObj = function(key, obj) {
          return this.setItem(key, JSON.stringify(obj))
      }
      Storage.prototype.getObj = function(key) {
          return JSON.parse(this.getItem(key))
      }
    }
    var arrayBloqueados=new Array();
    function updateOrientation (argument) {
      var modo=(window.orientation==90 || window.orientation==-90)?'landscape':'portrait';
      widthSidebarRight=-($(window).innerWidth()-50);
      if (sideBarAbierto!=null)snapper.open(sideBarAbierto);
    }
    function showNewUser() {
      showPreloader();
      $('.containerAll').fadeIn('slow',function(){
        $('.formulario').remove();
        $('.ui-slider-bg').eq(0).css('background','-webkit-linear-gradient(left, #eae446 0%, #ea4646 99%)');
        $('.ui-slider-bg').eq(0).css('background','-moz-linear-gradient(left, #eae446 0%, #ea4646 99%)');
        $('.ui-page-active').removeClass('ui-page');
        $('.ui-page-active').attr('data-role','');
        getLocation(true);
        ga('send', 'event', 'conectar', 'usuario_localStorage', 'false');
        ga('send', 'event', 'conectar', 'nuevoUser',nombreLocal);
        ga('send', 'event', 'conectar', 'nuevoUser','es='+sexo);
        ga('send', 'event', 'conectar', 'nuevoUser','busca='+preferencia);
        ga('send', 'event', 'conectar', 'nuevoUser','temp='+temperatura);
        ga('send', 'event', 'conectar', 'nuevoUser','edad='+edad);
      });
    }
    function showLastUser() {
      showPreloader();
      $('.containerAll').fadeIn('slow',function(){
        $('.formulario').remove();
        $('.ui-slider-bg').eq(0).css('background','-webkit-linear-gradient(left, #eae446 0%, #ea4646 99%)');
        $('.ui-slider-bg').eq(0).css('background','-moz-linear-gradient(left, #eae446 0%, #ea4646 99%)');
        $('.ui-slider-bg').eq(0).css('background-color','#555252')
        $('.ui-page-active').removeClass('ui-page');
        $('.ui-page-active').attr('data-role','');
        getLocation(true);
        ga('send', 'event', 'conectar', 'usuario_localStorage', 'true');
        ga('send', 'event', 'conectar', 'mismoUser', localStorage.getItem("nick"));
        ga('send', 'event', 'conectar', 'mismoUser', 'temp='+localStorage.getItem("temperatura"));
        ga('send', 'event', 'conectar', 'mismoUser', 'busca='+localStorage.getItem("busco"));
        ga('send', 'event', 'conectar', 'mismoUser', 'es='+localStorage.getItem("soy"));
        ga('send', 'event', 'conectar', 'mismoUser', 'edad='+localStorage.getItem("edad"));
      });
    }
    function showPreloader() {
      $('#preloaderBgAll').delay(1000).fadeIn();
    }
    function quitPreloader() {
      // $('#preloaderBgAll').css('display','none');
      $('#preloaderBgAll').fadeOut();
    }
    function initLocalStorage() {
      if (window.localStorage) {
        if (localStorage.getItem("nick")!=null) {
          nombreLocal = localStorage.getItem("nick");
          sexo    = localStorage.getItem("soy");
          preferencia = localStorage.getItem("busco");
          temperatura = localStorage.getItem("temperatura");
          edad    = localStorage.getItem("edad");
          idLocalLS   = localStorage.getItem("id");
          if(localStorage.getItem("bloqueados")!=null){
            arrayBloqueados=new Array();
            var arraytemp=localStorage.getItem("bloqueados");
            arrayBloqueados=arraytemp.split(',');
          }
          $('#userData').css('display','none');
          $('#conectarComo').css('display','block');
          $('#conectarComo h1').html($('#conectarComo h1').html()+'<b>'+nombreLocal+'</b>')

        }else{
          $('#conectarComo').css('display','none');
          $('#userData').css('display','block');
        }
      }else{
        $('#userData').css('display','block');
      }
    }
    function resetData() {
      for (var i = 0; i < usuarios.length; i++) {
        removeMarker(i);
             usuarios.splice(i,1);
              usuariosData.splice(i,1);
              onUsuarioDesconectado(id,index,usuariosL,usuariosDataL)
      };
      idLocal=undefined;
    }
    function getURLParameter(name) {
      return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
    }
    function deleteEncadenado(id) {
      if (encadenados.indexOf(id)>=0) {
        delete conversaciones[id];
        var index=encadenados.indexOf(id);
        encadenados.splice(index,1);
        localStorage.setObj("conversaciones", conversaciones);
        localStorage.setObj("encadenados", encadenados);
        if (usuarios.indexOf(id)<0){
          $('.linkBtn').css('display','none');
          removeBtnToList(id);
          cierraChat()
        }else{
          $('#'+id).removeClass('chat');
          var visible=(usuarios.indexOf(id)>=0)?true:false;
          setParametersNewUser(id,visible)
        }
      };
      checkEncadenarseSymbol(id);
      //console.log(conversaciones)
    }
    function resetStack() {
      stackMsgs=new Array();
        stackIds=new Array();
        updateStackLS()
    }
    function updateStackLS() {
      // alert('update stack')
      localStorage.setObj("stackIds", stackIds);
        localStorage.setObj("stackMsgs", stackMsgs);
    }
    function updateConversaciones() {
      localStorage.setObj("conversaciones", conversaciones)
    }
    //$(window).load(function(){
    function initEncadenados() {
      // alert('initEncadenados')
      if (window.localStorage) {

        if (localStorage.getObj("conversaciones")==null) {
          localStorage.setObj("conversaciones", conversaciones);
        }else{
          conversaciones=localStorage.getObj("conversaciones");
        }

        if (localStorage.getObj("encadenados")==null) {
          localStorage.setObj("encadenados", encadenados);
        }else{
          encadenados=localStorage.getObj("encadenados");
        }

        if (localStorage.getObj("stackIds")==null) {
          localStorage.setObj("stackIds", stackIds);
        }else{
          stackIds=localStorage.getObj("stackIds");
        }

        if (localStorage.getObj("stackMsgs")==null) {
          localStorage.setObj("stackMsgs", stackMsgs);
        }else{
          stackMsgs=localStorage.getObj("stackMsgs");
        }
        // alert('conversaciones: ' + conversaciones)
        // console.log('encadenados:')
        // console.log(encadenados)
        // console.log('conversaciones:')
        // console.log(conversaciones)

        // conversaciones=(localStorage.getObj("conversaciones")==null)?localStorage.setObj("conversaciones", conversaciones):localStorage.getObj("conversaciones");
        // encadenados=(localStorage.getObj("encadenados")==null)?localStorage.setObj("encadenados", encadenados):localStorage.getObj("encadenados");

        // stackIds=(localStorage.getObj("stackIds")==null)?localStorage.setObj("stackIds", stackIds):localStorage.getObj("stackIds");
        // stackMsgs=(localStorage.getObj("stackMsgs")==null)?localStorage.setObj("stackMsgs", stackMsgs):localStorage.getObj("stackMsgs");

        // localStorage.clear();
        if (encadenados!=undefined || encadenados!=null) {
          if(encadenados.length>0){
            for (var i = 0; i < encadenados.length; i++) {
              if (conversaciones[encadenados[i]]!=undefined) {
                window[encadenados[i]]=conversaciones[encadenados[i]];
              };

            };
          }
        };
        // localStorage.removeItem("lastname");

          // console.log(conversaciones)
        // for (var i = 0; i < conversaciones.length; i++) {
        //  alert(i)
        //  console.log(conversaciones[i])
        // };
        //window['8OlmubflnzAMS55BEWwU']=conversaciones['8OlmubflnzAMS55BEWwU'];

      }
    }
    function removeLocalStorage() {
      if (window.localStorage){
        localStorage.clear();
      }
    }
    function init () {
      initEncadenados();
      $('.ui-slider-bg').eq(0).css('background-color','#555252')
      $('.ui-slider-bg').eq(1).css('background','-webkit-linear-gradient(left, #eae446 0%, #ea4646 99%)');
      $('.ui-slider-bg').eq(1).css('background','-moz-linear-gradient(left, #eae446 0%, #ea4646 99%)');

      var myvar = getURLParameter('id');

      widthSidebarRight=-($(window).innerWidth()-50);
      // window.addEventListener('orientationchange', updateOrientation, false);
      // window.onorientationchange = function(){
      //  widthSidebarRight=-($(window).innerWidth()-50);
      //  if (sideBarAbierto!=null)snapper.open(sideBarAbierto);
      // }
      // $(window).resize(function(){
      //  widthSidebarRight=-($(window).innerWidth()-50);
      //  if (sideBarAbierto!=null)snapper.open(sideBarAbierto);
      // }));
      $(window).resize(function(){
        widthSidebarRight=-($(window).innerWidth()-50);
        if(sideBarAbierto!=null && chatAbierto==false){
          // if(idLocal)alert('resize')
          snapper.open(sideBarAbierto);
        }
      });
      initLocalStorage();

      $('.removeconectarcomo').on('click', function(){
        $('#conectarComo').remove();
        $('#userData').fadeIn();
        removeLocalStorage();
      });

      console.log(conversaciones)

      $('#userData').submit(function(e){
        e.preventDefault();
        var nick = $.trim($('#nick').val());
        if (window.localStorage) {
           localStorage.setItem("nick", $('#nick').val());
           localStorage.setItem("edad", $('#edad').val());
           localStorage.setItem("soy", $('#soy').val());
           localStorage.setItem("busco", $('#busco').val());
           localStorage.setItem("temperatura", $('#temperatura').val());
        }
         nombreLocal = $('#nick').val();
         sexo     = $('#soy').val();
         preferencia = $('#busco').val();
         temperatura = $('#temperatura').val();
         edad     = $('#edad').val();
         idLocalLS = 'vacio';
        if(nick.length > 0){
           $('#userData').remove();
           showNewUser();
        }else{
          //alert(temperatura)
          ga('send', 'event', 'conectar', 'nuevoUser','Error_no_nick');
          alert('Debes introducir un nombre de usuario')
        }
      });
      $('.mismoUser').on('click', function(){
        showLastUser();
        //$('#userData').submit();
      });

      $('.btnTrama').mouseenter(function(){
        $(this).css('color','#eee');
      });
      $('.btnTrama').mouseleave(function(){
        $(this).css('color','#fff');

      })
      $('.cancel_img').click(function(){
        $(this).css('color','#fff');
        $('.trama, .buttons, .cajaButtons').fadeOut();
      })
      if(myvar!=null){
        $('.formulario').remove();
        $('.containerAll').css('background-color','#000');
        $('.ui-overlay-a, .ui-page-theme-a').css('background-color','#000');
        showLastUser();
      }
      // removeLocalStorage()
    //});
    }
  // $(init)
  $(window).load(init);
  </script>
  <!--script src="http://maps.googleapis.com/maps/api/js?sensor=false&callback=getLocation"></script-->
  <script src="//maps.googleapis.com/maps/api/js?key=AIzaSyAasDjW1mnM7LTm6Wg-lA229vLoVR6K3WE"></script>
  <style type="text/css">
    .btnTrama{
        position: relative;
        width: auto;
        height: 30px;
        padding: 5px;
        padding-top: 10px;
        padding-left: 10px;
        border-radius: 5px;
        background: linear-gradient(#555, #222);
    }
    .btnTrama:hover{
        background: linear-gradient(#222, #555);
    }
  </style>
  <div class="trama"></div>
  <div class="buttons">
    <div class="buttonsFoto cajaButtons">
      <a href="##"><div class="btnTrama ask_img">Pedir imagen</div></a>
      <a href="##"><div class="btnTrama  send_img">Enviar imagen ></div></a>
      <a href="##"><div class="btnTrama cancel_img">Cancelar</div></a>
    </div>
    <div class="buttonsEncadenarse cajaButtons">
      <br><span class="tituloCaja"><span class="tituloEncadenarse fontGr">¿Quieres engancharte conas Ana?</span></span><br>
      <a href="##"><div class="btnTrama  askEncadenarseBtn">Solicítaselo ></div></a>
      <a href="##"><div class="btnTrama cancel_img">Cancelar</div></a>
    </div>
    <div class="aceptarEncadenarse cajaButtons">
      <br><span class="tituloCaja"><span class="tituloEncadenarse fontGr">¿Quieres engancharte conas Ana?</span></span><br>
      <a href="##"><div class="btnTrama aceptarEncadenarseBtn">Aceptar ></div></a>
      <a href="##"><div class="btnTrama rechazarEncadenarseBtn">Rechazar ></div></a>
    </div>
    <div class="msgEncadenarse cajaButtons">
      <br><span class="tituloCaja"><span class="tituloEncadenarse fontGr">Tu solicitud ha sido enviada!<br>Te avisaremos con la respuesta!</span></span><br>
      <a href="##"><div class="btnTrama cancel_img">Aceptar</div></a>
    </div>

    <div class="buttonsBloqueo cajaButtons">
      <a href="##"><div class="btnTrama bloquear_usuario">Bloquear usuario</div></a>
      <a href="##"><div class="btnTrama cancelar_bloqueo">Cancelar</div></a>
    </div>
  </div>
  <div class="picture_chat" style="width:90%; height: 90%; min-height: 400px; padding: 0.3em 1em; position: fixed; left: 5%; top: 5%; z-index: 10000000001; background-color: #000; display: block; box-shadow: 0px 0px 4px #000; box-sizing:border-box; -webkit-box-sizing: border-box; display:none; background-size:contain; text-align:center;"><span style="font-size: 500px; opacity: 0.3; color: #fff; line-height: 90%; text-align: center;"></span></div>
  <div id="preloaderBgAll"><div id="preloaderAll"></div></div>
</body>

</html>
