export default class ResolverSocketRow {
    port:Number;
    reachable:Boolean;
    constructor(_port:Number, _reachable:Boolean){
        this.port = _port;
        this.reachable= _reachable;
    }
} 