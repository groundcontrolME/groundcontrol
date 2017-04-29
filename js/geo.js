var latitudActual;
var longitudActual;
var geolocationCallBack;
var solometros=true;
//////////		LOCATION 	 /////////////


//////////		DISTANCE   	 /////////////

function getDistance(lat,lon){ // km
	var distance=calcCrow(latitudActual,longitudActual,lat,lon).toFixed(1);
	return distance;
}
function getDistance2Points(lat1,lon1,lat2,lon2){
	var distance=calcCrow(lat1,lon1,lat2,lon2).toFixed(1);
	return distance;
}
function getMeters(lat,lon){
	var distance=calculateDistanceInMeters(latitudActual,longitudActual,lat,lon);
	return distance;
}

function setDistanceType(distance){
	var correctDistance=(distance/2>=0);
	if (correctDistance) {
		distance=Math.ceil(distance)
		if (solometros) {
			distance=distance+"m";
		}else{
			if (distance<10000) {
				distance=distance+"m";
			}else{
				if (distance>20000) {
					distance=Math.ceil(distance/1000)+"Km";
				}else{
					distance=(distance/1000).toFixed(1)+"Km";
				}
			}
		}
		
	}else{
		distance="GPS no\ndisponible"
	}
	return distance;
}
function setDistanceTypeFromKm(distance){
	if (distance<10) {
		distance=Math.ceil(distance*1000)+"m";
	}else{
		if (distance>20) {
			distance=Math.ceil(distance)+"Km";
		}else{
			distance=distance+"Km";
		}
	}
	return distance;
}

function calcCrow(lat1,lon1,lat2,lon2) 
{
  var R = 6371; // km
  var dLat = (lat2-lat1)* Math.PI / 180; ;
  var dLon = (lon2-lon1)* Math.PI / 180; ;
  var lat1 = (lat1)* Math.PI / 180; ;
  var lat2 = (lat2)* Math.PI / 180; ;

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c;
  return d;
}

var rad = function(x) {
  return x * Math.PI / 180;
};

var calculateDistanceInMeters = function(lat1,lon1,lat2,lon2) {
  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(lat2 - lat1);
  var dLong = rad(lon2 - lon1);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(lat1)) * Math.cos(rad(lat2)) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d; // returns the distance in meter
};