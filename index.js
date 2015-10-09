var app = require('express')();
/*var http = require('http').Server(app);
var io = require('socket.io')(http);*/
var http = require('http').createServer(app);
var io = require('socket.io')(http);
//server.listen(3000);



var users=[];
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

function randomString(length) {
    chars="qweiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890";
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}

io.on('connection', function(socket){
  //user connection protocol
  console.log('a user connected');
  var id=randomString(Math.random()*80);
  var pos=users.push(id)-1;
  console.log('given the '+id+' id at'+pos);
  io.emit('new user',id);
  socket.emit('hello',id,users);
  socket.on('disconnect', function(){
    console.log('user disconnected');
    users.splice(pos,1);
    io.emit('disconnect',id);
  });
  socket.on('update', function(who,msg){
    //console.log('update: '+ who +" sent "+ msg);
    socket.broadcast.emit('update',who, msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

/*

io.on('connection', function(socket){ 
  socket.on('event', function(data){}); 
  socket.on('disconnect', function(){}); 
}); 
server.listen(3000);
toupéadd that code it works
toupéStarting with 3.0, express applications have become request handler 
functions that you pass to http or http Server instances. You need to pass
 the Server to socket.io, and not the express application function.}




 var app = require('koa')();
  var server = require('http').createServer(app.callback()); 
var io = require('socket.io')(server); io.on('connection', function(){ 
 }); server.listen(3000);*/