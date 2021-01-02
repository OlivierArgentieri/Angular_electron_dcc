interface SocketInterpreterSettings{
    port:number; 
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
    SocketSettings:SocketInterpreterSettings;
    DccPortSettings:DccPortSettings;
    PipelineSettings:PipelineSettings;
}