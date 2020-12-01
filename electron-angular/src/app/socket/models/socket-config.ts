class SocketConfig {

    // attr
    address : string;
    port : number;
    dccName : string;

    constructor(address?: string, port?: number, dccName?: string){
        this.address = address;
        this.port = port;
        this.dccName = dccName;
    }

    static fromJSON(d: object): SocketConfig {
        return Object.assign(new SocketConfig(), d);
    }

    serialize(): string {
        return JSON.stringify(this);
    }
}