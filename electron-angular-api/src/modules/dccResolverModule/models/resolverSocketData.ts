export class ResolverSocketRow {
    port:Number;
    reachable:Boolean;
    filename:String;

    constructor(_port:Number =0, _reachable:Boolean = false, _filename:String = ""){
        this.port = _port;
        this.reachable= _reachable;
        this.filename= _filename;
    }
}

export  class ResolverSocketData {
   mayaDatas:Array<ResolverSocketRow>
   houdiniDatas:Array<ResolverSocketRow>
   nukeDatas:Array<ResolverSocketRow>
} 