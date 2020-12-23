interface Param {
    name:string;
    type:string;
    default:string;
}

export class ActionResult {

    dcc:string;
    name:string;
    params:Array<Param>;
    default_script:string;
    script_path:string;
}