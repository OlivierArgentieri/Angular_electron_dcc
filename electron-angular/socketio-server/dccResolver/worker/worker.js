const { parentPort, workerData } = require('worker_threads');
const net = require('net');

const message = "Test intensive CPU TASK";

var client = net.Socket();


var tcpConnection = client.connect(workerData.port, '127.0.0.1', function() {
     console.log(`Found on : ${workerData.port}`);
     client.destroy();
     parentPort.postMessage("Server Found !");
    });

tcpConnection.on('error', (error)=>{
    console.log(`Error : ${error}`)
    client.destroy();
    parentPort.postMessage("Server Not Found !");
});
//client.destroy();

parentPort.postMessage(message);