export default interface ISocketServer{

    // attr
    mainSocket : any;

    startServer() :void;
    stopServer() :void;
    setupAction(io:any) :void;
} 