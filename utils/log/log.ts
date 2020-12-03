import {eventBodyType, SipResponseCodeEnum} from "../../routes/status-event/status-event";

export const logCreate = (data: eventBodyType) => {
    const startDate = new Date().toLocaleDateString()
    const startTime = new Date().toLocaleTimeString()
    const date = `${startDate} / ${startTime}`
    const from = data.From
    const to = data.To
    const duration = timeCreator(data.CallDuration)
    const status = data.CallStatus
    const direction = data.Direction
    // saveToDb({name: direction, date, from, to, status, duration})
}

const timeCreator = (value: string) => {
    let time: number|string = +value + ' s'
    if (+value >= 60) {
        time = (+value/60).toFixed(2) + ' m'
    }
    return time.toString()
}

type historyType={
    to:string
    status:string
    duration:string
}

type SchemeType = {
    id:string
    date:string
    from:string
    to:string
    status:string
    direction:string
    history:Array<historyType>
}

const store = [] as Array<SchemeType>

export const agentHandler = (id:string) => {
    const index = store.findIndex((el)=>el.id ===id )


}

export const addData = (id:string,data:eventBodyType,isTransfer=false) => {
    const date = `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`
    const from = data.From
    const to = data.To
    const direction = data.Direction
    const duration = data.CallDuration
    let status:string = data.CallStatus
    const statusCode = data.SipResponseCode

    switch (statusCode){
        case SipResponseCodeEnum.notAvailable:status += ' ( not available )';break;
        case SipResponseCodeEnum.timeOut:status += ' ( timeout )'
    }
    const history:historyType = {status,to,duration}

    const index = store.findIndex((el)=>el.id === id)
    if(index !== -1){
        store[index].history.push(history)
    }
    else {
        store.push({id,date,from,to,status,direction,history:[{to,status,duration}]})
    }
}


const testData = {
    ApiVersion: '2010-04-01',
    Called: 'client:888',
    CallStatus: 'no-answer',
    Duration: '0',
    From: '+15703144444',
    CallerCountry: 'US',
    Direction: 'outbound-api',
    Timestamp: 'Fri, 09 Oct 2020 14:42:35 +0000',
    CallDuration: '0',
    CallbackSource: 'call-progress-events',
    AccountSid: 'ACea92366cacdea08cdc099ce743379dcb',
    CallerCity: 'WILKES BARRE',
    SipResponseCode: '487',
    CallerState: 'PA',
    FromCountry: 'US',
    Caller: '+15703144444',
    FromCity: 'WILKES BARRE',
    SequenceNumber: '0',
    CallSid: 'CA9e927bb4494c0bda9c0223712c52b680',
    To: 'client:888',
    FromZip: '18701',
    CallerZip: '18701',
    FromState: 'PA'
} as eventBodyType

