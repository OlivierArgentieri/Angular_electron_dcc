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
    commonActionsPath:String
    mayaActionsPath:String
    houdiniActionsPath:String
}


export class Config{
    socketInterpreterSettings:SocketInterpreterSettings;
    dccPortSettings:DccPortSettings;
    pipelineSettings:PipelineSettings;
}