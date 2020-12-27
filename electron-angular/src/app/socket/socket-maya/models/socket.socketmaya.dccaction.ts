interface Param {
    name:string;
    type:string;
    default:any;
}

export class DccAction {
    dcc:string;
    name:string;
    params:Array<Param>;
    script_path:string;
    default_script:string;

    // out for error
    error:string;
}