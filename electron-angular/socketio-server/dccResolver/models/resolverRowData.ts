export default class ResolverSocketRow {
    port:Number;
    reachable:Boolean;
    filename:String;
    constructor(_port:Number, _reachable:Boolean, _filename:String){
        this.port = _port;
        this.reachable= _reachable;
        this.filename= _filename;
    }
} 