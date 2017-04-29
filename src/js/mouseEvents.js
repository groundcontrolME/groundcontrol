function isTouchDevice(){
	// return window.Touch;
	return ('ontouchstart' in window) 
}

function over(el,callback,params){
	if(isTouchDevice()){
		el[0].addEventListener('touchstart', function(event) {
			callback(params,$(this));
	    }, false);
	}else{
	 	el.mouseenter(function(){
            callback(params,$(this));
        });
	}
}
function out(el,callback,params){
	if(isTouchDevice()){
		el[0].addEventListener('touchmove', function(event) {
			callback(params,$(this));
	    }, false);
	}else{
	 	el.mouseleave(function(){
            callback(params,$(this));
        });
	}
}
function release(el,callback,params){
	if(isTouchDevice()){
		el[0].addEventListener('touchend', function(event) {
			callback(params,$(this));
	    }, false);
	}else{
	 	el.click(function(){
            callback(params,$(this));
        });
	}
}

function setOver (params,el) {
	el.find('.ico').css('background-position','bottom left')
}
function setOut(params,el) {
	el.find('.ico').css('background-position','top left')
}
function setOver2 (params,el) {
	el.css('opacity','0.5');
}
function setOut2 (params,el) {
	el.css('opacity','1');
}

function setBtnsCabecera() {
	over($('.geoBtn'),setOver);
    out($('.geoBtn'),setOut);
    release($('.geoBtn'),findPos);

    over($('.backico'),setOver2);
    out($('.backico'),setOut2);
    release($('.backico'),abrePanelIzq);

    over($('.updateico'),setOver2);
    out($('.updateico'),setOut2);
    release($('.updateico'),abrePanelDer);

    over($('.closeico'),setOver2);
    out($('.closeico'),setOut2);
    release($('.closeico'),cierraChat);

    over($('.linkico'),setOver2);
    out($('.linkico'),setOut2);
    release($('.linkico'),askForEncadenarse);
}