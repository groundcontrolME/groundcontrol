function init() {
	$('.btnIcon').click(function(){
		setIcon($(this).attr('param-number'));
		showIconPath();
	});
	var standalone = window.navigator.standalone || navigator.standalone || (screen.height-document.documentElement.clientHeight)<100 || ("standalone" in window.navigator);

	// if(standalone)$('.icons').remove();
	//setIcon(2);
}


function setIcon(id) {
	var el=$('#icon'+id);
	var titulo=el.find('.txt').html();
	var carpetaId=(id>1)?id:'';

	activaBtn($('.btnIcon'),false);
	activaBtn(el,true);
	document.title = titulo;

	document.getElementById('linkAndroid').href='ath/imgs'+carpetaId+'/touch-icon-android.png';
	document.getElementById('linkApple1').href='ath/imgs'+carpetaId+'/touch-icon-iphone4.png';
	document.getElementById('linkApple2').href='ath/imgs'+carpetaId+'/touch-icon-iphone4.png';
	document.getElementById('linkApple3').href='ath/imgs'+carpetaId+'/touch-icon-iphone4.png';
	document.getElementById('linkIpad').href='ath/imgs'+carpetaId+'/touch-icon-ipad.png';
	document.getElementById('linkBg1').href='ath/imgs'+carpetaId+'/1536x2008.jpg';
	document.getElementById('linkBg2').href='ath/imgs'+carpetaId+'/1496x2048.jpg';
	document.getElementById('linkBg3').href='ath/imgs'+carpetaId+'/768x1004.jpg';
	document.getElementById('linkBg4').href='ath/imgs'+carpetaId+'/748x1024.jpg';
	document.getElementById('linkBg5').href='ath/imgs'+carpetaId+'/640x1096.jpg';
	document.getElementById('linkBg6').href='ath/imgs'+carpetaId+'/640x920.jpg';
	document.getElementById('linkBg7').href='ath/imgs'+carpetaId+'/320x460.jpg';
	$('.metatitle').attr('content',titulo);
}
function activaBtn (el,activa) {
	if (activa) {
		el.addClass('activado');
	}else{
		el.removeClass('activado')
		if (el.hasClass('activado')) {

		};
	}
}
$(init)