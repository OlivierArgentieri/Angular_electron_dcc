interface Param {
    name:string;
    type:string;
    default:any;
}

export class ActionResult {
    dcc:string;
    name:string;
    params:Array<Param>;
    script_path:string;
    entry_point:string;

    // out for error
    error:string;

    // port for exec command
    port:number;
}