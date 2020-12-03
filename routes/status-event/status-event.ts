import express = require("express");
import {CallStatus} from "twilio/lib/rest/api/v2010/account/call";
import {Store} from "../../store/store";
import {callContainer} from "../../utils/call/callContainer";
import {direction, sendRecordLink} from "../../utils/send-record-link";
import {voiceMail} from "../../utils/voice-mail";
import {getTwilioClient} from "../../utils/get-twilio-client";

const CallSidService = require('../../store/call-sid-service')
const router = express.Router();


export enum SipResponseCodeEnum {
    notAvailable = '480',
    timeOut = '487',
    completed = '200'
}

export type eventBodyType = {
    RecordingUrl: string
    RecordingDuration: string
    ApiVersion: string,
    Called: string,
    CallStatus: CallStatus,
    Duration: string,
    From: string,
    CallerCountry: string,
    Direction: string,
    Timestamp: string,
    CallDuration: string,
    CallbackSource: string,
    AccountSid: string,
    CallerCity: string,
    SipResponseCode: SipResponseCodeEnum.timeOut | SipResponseCodeEnum.completed | SipResponseCodeEnum.notAvailable,
    CallerState: string,
    FromCountry: string,
    Caller: string,
    FromCity: string,
    SequenceNumber: string,
    CallSid: string,
    To: string,
    FromZip: string,
    CallerZip: string,
    FromState: string
}


router.post('/:from/:conferenceId', (req: express.Request, res: express.Response) => {
    try {
        //@ts-ignore
        const body = req.body as eventBodyType
        const from = req.params.from
        const conferenceId = req.params.conferenceId
        const status = body.CallStatus as CallStatus
        //@ts-ignore

        const {RecordingUrl, From, To, CallStatus, Duration} = body
        const client = getTwilioClient(To.slice(7))

        sendRecordLink({
            link: RecordingUrl,
            from: From,
            to: To.slice(7),
            status: CallStatus,
            direction: direction.incoming,
            duration: Duration
        })


        if (status === 'no-answer' || status === 'busy') { // Отбой или таймаут
            const number = Store.getFirstNumber(conferenceId)

            if (number) {
                callContainer(res, number, from, 'iter', conferenceId)
            } else {
                client?.calls(CallSidService.getSid(from))
                    .update({twiml: voiceMail()})
                Store.deleteObject(conferenceId)
                return;
            }
        } else {
            Store.deleteObject(conferenceId)
            client?.calls(CallSidService.getSid(from))
                .update({twiml: voiceMail()})
            return
        }
    } catch (e) {
        console.log('Status event ERROR: ', e)
        res.send('ERROR')
    }

})

module.exports = router
