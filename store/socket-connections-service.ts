
type dataType = {
    number:string
    company:string
    socketId:string
}

type getType ={
    from:string
    to:string
}

export class SocketConnectionsService {
    private static socketsId:Array<dataType> = []

    static add(data:dataType){
        this.socketsId = this.socketsId.filter((el)=>el.number !== data.number)
        this.socketsId.push(data)
    }

    static get({from, to}:getType){
        return this.socketsId.find((el)=>el.number === from || el.number === to)
    }
}
