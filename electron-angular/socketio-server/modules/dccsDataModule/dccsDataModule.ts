class RowCnxDccs {
    constructor(public port:Number, public cnx:any ) {}
}

export class DccsDataModule {

    // for data (port, cnxobject) of each dccs
    private static CNX_DCCS:Array<RowCnxDccs> = []

    public static addNewDatas(_port:Number, _cnxObject:any){
        DccsDataModule.CNX_DCCS.push(new RowCnxDccs(_port, _cnxObject))
    }

    public static clearDatas(){
        DccsDataModule.CNX_DCCS = []
    }

    public static getDatas():Array<RowCnxDccs> {
        return DccsDataModule.CNX_DCCS;
    }

    public static getDccByPort(_port:Number):RowCnxDccs{
        DccsDataModule.CNX_DCCS.forEach(o => console.log(o.port + " cnx : " + o.cnx))
        return DccsDataModule.CNX_DCCS.find(o => o.port == _port)
    }
}