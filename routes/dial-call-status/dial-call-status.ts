import express = require("express");
import {direction, sendRecordLink} from "../../utils/send-record-link";

const router = express.Router();

type statusType = 'completed' | 'answered' | 'busy' | 'no-answer' | 'failed' | 'canceled'



type dialNumberCallStatusType = {
    ApiVersion: string
    Called: string
    ParentCallSid: string
    CallStatus: statusType,
    RecordingSid: string
    Duration: string
    RecordingUrl: string
    From: string
    CallDuration: string
    Direction: string,
    Timestamp: string
    AccountSid: string
    CallbackSource: string
    ApplicationSid: string
    Caller: string
    SequenceNumber: string,
    To: string
    CallSid: string
    RecordingDuration: string
}


router.post('/:from',(req:express.Request,res:express.Response)=>{
    try {

        const from = req.params.from || 'client:null'
        const fromMatch = from.match(/([0-9].+)./)
        if(fromMatch){
            //@ts-ignore
            const {body} : {body:dialNumberCallStatusType} = req
            const {RecordingUrl:link,From,To:to,CallStatus:status,Duration}  = body
            // sendRecordLink({link,from:from.slice(7),to,status,direction:direction.outgoing,duration:Duration})
            sendRecordLink({link,from:fromMatch[0],to,status,direction:direction.outgoing,duration:Duration})
        }
        res.status(200).send('ok')
    }
    catch (e){
        console.log('DialCallStatus Error')
        console.log(e)
        res.status(500).send(e)
    }
})

module.exports = router
