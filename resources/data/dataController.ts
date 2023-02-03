class Controller {
    dataTable : string

    constructor(dataTable) {
        this.dataTable = dataTable
    }

    private __init(ObjectData: object) :boolean {
        return Object.keys(ObjectData).length > 0
    }

    public pushObjectToDatabase(ObjectData: object, dataName: CodeceptJS.DataTable) : void {
        if (this.__init) {
            Object.values(ObjectData).map((e) => dataName.add([e]))
        }
    }
}

export default Controller