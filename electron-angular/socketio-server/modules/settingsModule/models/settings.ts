interface SocketInterpreterSettings{
    port:number; 
    host:string;
}

interface DccPortSettings{

    mayaPortRangeStart:number; 
    mayaPortRangeEnd:number;

    houdiniPortRangeStart:number; 
    houdiniPortRangeEnd:number; 
}

interface PipelineSettings{
    mayaActionsPath:string
    mayapyActionsPath:string
    houdiniActionsPath:string
    hythonActionsPath:string
    mayapyHandlerPath:string
    hythonHandlerPath:string
}

interface DccsPath{
    maya:string
    mayapy:string
    hython:string
    houdini:string
}


export class Config{
    socketInterpreterSettings:SocketInterpreterSettings;
    dccPortSettings:DccPortSettings;
    pipelineSettings:PipelineSettings;
    tempFolder:String;
    dccsPath:DccsPath;
}