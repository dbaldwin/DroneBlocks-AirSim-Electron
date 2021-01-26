let net = require('net')
 
// Configuration parameters
let HOST = 'localhost'
let PORT = 41451
 
// Create Server instance 
var server = net.createServer(onClientConnected)
 
server.listen(PORT, HOST, function() {  
  console.log('server listening on %j', server.address())
})
 
function onClientConnected(sock) {  
  var remoteAddress = sock.remoteAddress + ':' + sock.remotePort
  console.log('new client connected: %s', remoteAddress)
 
  sock.on('data', function(data) {
    console.log('%s Says: %s', remoteAddress, data)

    // Echo message back to client
    sock.write(data)
  })

  sock.on('close',  function () {
    console.log('connection from %s closed', remoteAddress)
  })

  sock.on('error', function (err) {
    console.log('Connection %s error: %s', remoteAddress, err.message)
  })

}