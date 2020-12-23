//////////////////////////////////////////
// class to serialize return data in json
/////////////////////////////////////////
export class ActionsResult {
    actions:Array<string>;
    error:string;
    constructor(){
        this.actions = [];
        this.error= "";
    }
}