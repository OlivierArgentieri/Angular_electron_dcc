export class ResolverIdentify{
    filename:string
    exec_name:string
}

export class ResolverSocketRow {
    port:Number;
    reachable:Boolean;
    identify:ResolverIdentify;

    constructor(_port:Number, _reachable:Boolean, _identify:ResolverIdentify){
        this.port = _port;
        this.reachable = _reachable;
        this.identify = _identify;
    }

   
}

export  class ResolverSocketData {
   mayaDatas:Array<ResolverSocketRow>
   houdiniDatas:Array<ResolverSocketRow>
   nukeDatas:Array<ResolverSocketRow>
} 