//var servidor = require("socket.io").listen(5500);


var fs =    require('fs');

var options = {
    key:    fs.readFileSync('/usr/local/groundcontrol/cert/privkey.pem'),
    cert:   fs.readFileSync('/usr/local/groundcontrol/cert/fullchain.pem'),
    ca:     fs.readFileSync('/usr/local/groundcontrol/cert/chain.pem')
    // key:    fs.readFileSync('/usr/local/groundcontrol/cert/servidor.key'),
    // cert:   fs.readFileSync('/usr/local/groundcontrol/cert/servidor.crt')
};

var server = require('https').createServer(options);
servidor = require('socket.io').listen(server);     //socket.io server listens to https connections
//servidor.set('heartbeat timeout', 30000);
//servidor.set('heartbeat interval', 10000);
server.listen(5500);


var usuariosOriginalIds= new Array();
var usuarios= new Array();
var usuariosData= new Array();
var stackMsgs=new Array();
var stackIds=new Array();
var stackIdsToDesencadenarse=new Array();
var stackDataToDesencadenarse=new Array();
servidor.sockets.on("connection", onConnection);



/*
function inventario(){
    console.log('socketsid ',Object.keys(servidor.sockets.sockets));
    console.log('usuariosOriginalIds',usuariosOriginalIds);
    console.log('usuarios',usuarios);
    console.log('usuariosData',usuariosData);
    console.log('\n\n');
}
*/
//setInterval(inventario,10000);
//inventario();


function onConnection(socket){
//    console.log(socket.id);
    // NUEVO USUARIO CONECTADO:
    // Agregamos usuarios a los arrays (2 arrays: 'usuarios' solo con ids para obtener rápido índices, y luego usuariosData)
//    var id=(socket.manager.handshaken[socket.id].query.id=='vacio')?socket.id:socket.manager.handshaken[socket.id].query.id;
//    usuariosOriginalIds.push(socket.id);
//    usuarios.push(id);
//    var usuarioData=new Object();
//    usuarioData.id=id;
//    usuarioData.nombre=socket.manager.handshaken[socket.id].query.nombre;
//    usuarioData.edad=socket.manager.handshaken[socket.id].query.edad;
//    usuarioData.sexo=socket.manager.handshaken[socket.id].query.sexo;
//    usuarioData.preferencia=socket.manager.handshaken[socket.id].query.preferencia;
//    usuarioData.temperatura=socket.manager.handshaken[socket.id].query.temperatura;
//    usuarioData.lat=socket.manager.handshaken[socket.id].query.lat;
//    usuarioData.lng=socket.manager.handshaken[socket.id].query.lng;
//      usuariosData.push(usuarioData);



    console.log("Hola guapo.");

    var id=socket.id;
    usuariosOriginalIds.push(socket.id);
    usuarios.push(id);
    var usuarioData=new Object();
    usuarioData.id=id;
    usuarioData.nombre=socket.handshake.query.nombre;
    usuarioData.edad=socket.handshake.query.edad;
    usuarioData.sexo=socket.handshake.query.sexo;
    usuarioData.preferencia=socket.handshake.query.preferencia;
    usuarioData.temperatura=socket.handshake.query.temperatura;
    usuarioData.lat=socket.handshake.query.lat;
    usuarioData.lng=socket.handshake.query.lng;
    usuariosData.push(usuarioData);







    // ESCUCHAMOS EVENTOS NUEVO USUARIO
    // cambio de posición:
    socket.on('position', function (data) {
          // Emitimos nueva posición a todos
          servidor.sockets.emit("broadcastPosition", data);
    });
     // cambio de estado:
    socket.on('estado', function (data) {
          // Emitimos nueva posición a todos
          var index=usuarios.indexOf(data.id);
          if (index>-1){
              usuariosData[index].temperatura=data.nivel;
              servidor.sockets.emit("broadcastEstado", data.id, index, data.nivel);
          }else{

//console.log('usuarios',usuarios);
//console.log('data',data);
          }
    });
    // desconexión:
    socket.on('disconnect', function () {
          var index=usuariosOriginalIds.indexOf(socket.id);
          if (index>-1){
              usuarios.splice(index,1);
              usuariosOriginalIds.splice(index,1);
              usuariosData.splice(index,1);

          }
          servidor.sockets.emit('usuarioDesconectado',id, index, usuarios, usuariosData);
    });
    // mensaje privado:
    socket.on('pm', function(id2, message,hora) {
        var index=usuarios.indexOf(id2);

        if (index<0) {
            var indexStackId=stackIds.indexOf(id2);
            var indice=indexStackId;
            if (indexStackId<0) {
                stackIds.push(id2);
                var mensajes=new Array();
                stackMsgs.push(mensajes);
                indexStackId=stackIds.indexOf(id2);
            };

            var obj=new Object();
            obj.id=id;
            obj.idTarget=id2;
            obj.message=message;
            obj.hora=hora;

            stackMsgs[indexStackId].push(obj);

        }else{
            var idTarget=usuariosOriginalIds[index];
            servidor.sockets.sockets[idTarget].emit('privatemsg', id, message,hora);

        }

    });
     // tic:
    socket.on('ptic', function(id2) {
        var index=usuarios.indexOf(id2);
        var idTarget=usuariosOriginalIds[index];
        servidor.sockets.sockets[idTarget].emit('privatetic', id);
    });
    // foto privada:
    socket.on('pfoto', function(id2, url) {
        var index=usuarios.indexOf(id2);
        var idTarget=usuariosOriginalIds[index];
        servidor.sockets.sockets[idTarget].emit('privatefoto', id, url);
    });

     // actualiza usuarios a socket:
    socket.on('actualizaUsuariosFromServer', function(id2) {
        var index=usuarios.indexOf(id2);
        var idTarget=usuariosOriginalIds[index];
        servidor.sockets.sockets[idTarget].emit('actualizaArraysUsers', usuarios, usuariosData);
    });

     // peticion para engancharse:
    socket.on('peticionEncadenarse', function(id2) {
        var index=usuarios.indexOf(id2);
        var idTarget=usuariosOriginalIds[index];
        servidor.sockets.sockets[idTarget].emit('peticionEncadenarseFromSrv', id);
    });
    // desengancharse:
    socket.on('peticionDesencadenarse', function(id2) {
        var index=usuarios.indexOf(id2);
        if (index<0) {
            var indexStackId=stackIdsToDesencadenarse.indexOf(id2);
            var indice=indexStackId;
            if (indexStackId<0) {
                stackIdsToDesencadenarse.push(id2);
                var mensajes=new Array();
                stackDataToDesencadenarse.push(mensajes);
                indexStackId=stackIdsToDesencadenarse.indexOf(id2);
            };
            var obj=new Object();
            obj.id=id;
            obj.idTarget=id2;
            stackDataToDesencadenarse[indexStackId].push(obj);
        }else{
            var idTarget=usuariosOriginalIds[index];
            servidor.sockets.sockets[idTarget].emit('peticionDesencadenarseFromSrv', id);
        }
    });

    socket.on('respuestaEncadenarse', function(id2,granted) {
        var index=usuarios.indexOf(id2);
        var idTarget=usuariosOriginalIds[index];
        servidor.sockets.sockets[idTarget].emit('respuestaEncadenarseFromSrv', id,granted);
    });

    // EMITIMOS NUEVO USUARIO A TODOS:
    index=usuarios.indexOf(id);
    servidor.sockets.emit("usuarioConectado", id, index, usuarios, usuariosData);

    // CHEQUEAMOS SI HAY MENSAJES EN ESPERA PARA ENVIAR A ESTE USUARIO:
    var indexStack=stackIds.indexOf(id);
    if (indexStack>=0) {
        for (var i = 0; i < stackMsgs[indexStack].length; i++) {
              var idTargetStack=stackMsgs[indexStack][i].idTarget;
              var idStack=stackMsgs[indexStack][i].id;
              var messageStack=stackMsgs[indexStack][i].message;
              var horaStack=stackMsgs[indexStack][i].hora;
              socket.emit('privatemsg', idStack, messageStack,horaStack);
        };
        stackMsgs.splice(indexStack,1);
        stackIds.splice(indexStack,1);
    };
    // CHEQUEAMOS SI HAY PETICIONES PARA DESENGANCHARSE EN ESPERA PARA ENVIAR A ESTE USUARIO:
    var indexStackToDesencadenarse=stackIdsToDesencadenarse.indexOf(id);
    if (indexStackToDesencadenarse>=0) {
        for (var i = 0; i < stackDataToDesencadenarse[indexStackToDesencadenarse].length; i++) {
            var idStackToDesencadenarse=stackDataToDesencadenarse[indexStackToDesencadenarse][i].id;
            socket.emit('peticionDesencadenarseFromSrv', idStackToDesencadenarse);
        }
        stackIdsToDesencadenarse.splice(indexStackToDesencadenarse,1);
        stackDataToDesencadenarse.splice(indexStackToDesencadenarse,1);
    };
    socket.emit('tuid', id);
}
