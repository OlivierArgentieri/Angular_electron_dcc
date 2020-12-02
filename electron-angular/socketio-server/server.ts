const net = require('net');

export default class SocketServer{
    test(){
        const client = net.Socket();
        client.connect(1111, '127.0.0.1', function() {
            console.log('Connected');
            //client.write('Hello, server! Love, Client.');
            //client.write('import maya.cmds as mc\n mc.polyCube()');
        });
        var command = 'import maya.cmds as cmds\ncmds.polyCube()' 
            client.write(command);
    }
}


/*
app.createServer(function(req, res){
    res.end("Hello from electron app")
}).listen(9000)*/