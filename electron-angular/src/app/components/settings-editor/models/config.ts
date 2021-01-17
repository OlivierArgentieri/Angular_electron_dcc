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
    mayaActionsPath:String
    houdiniActionsPath:String
    hythonActionsPath:String
}

interface DccsPath{
    maya:String
    mayabatch:String
    houdini:String
    hython:String
}


export class Config{
    socketInterpreterSettings:SocketInterpreterSettings;
    dccPortSettings:DccPortSettings;
    pipelineSettings:PipelineSettings;
    tempFolder:String;
    dccsPath:DccsPath;
}