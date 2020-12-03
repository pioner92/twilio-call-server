type sidsType = {
    from: string
    sid: string
}

class CallSidService {
     static sids: Array<sidsType> = []

    public static addSid({from,sid}:sidsType){
        this.sids.push({from,sid})
    }

    public static getSid(from:string){
         return this.sids.find((el)=>el.from === from)?.sid
    }

    public static deleteSid(from:string){
        this.sids.filter((el)=>el.from !== from)
    }
}

module.exports = CallSidService
