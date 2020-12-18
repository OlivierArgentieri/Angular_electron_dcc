interface SocketInterpreterSettings{
    port:number; 
}

interface DccPortSettings{

    mayaPortRangeStart:number; 
    mayaPortRangeEnd:number;

    houdiniPortRangeStart:number; 
    houdiniPortRangeEnd:number; 
}

interface PythonSettings{
    actionsPath:String
}


export class Config{
    SocketSettings:SocketInterpreterSettings;
    DccPortSettings:DccPortSettings;
    PythonSettings:PythonSettings;
}