import express = require("express");
import VoiceResponse from "twilio/lib/twiml/VoiceResponse";

const router = express.Router();


type getCallResourceResponseType = {
    AccountSid: string
    ApiVersion: string
    CallSid: string
    CallStatus: 'completed',
    Called: string
    Caller: string
    CallerCity: string
    CallerCountry: string
    CallerState: string
    CallerZip: string
    ConferenceSid: string
    DialCallStatus: 'completed' | 'answered' | 'busy' | 'no-answer' | 'failed' | 'canceled'
    Direction: 'outbound-api',
    From: string
    FromCity: string
    FromCountry: string
    FromState: string
    FromZip: string
    RecordingDuration: string
    RecordingSid: string
    RecordingUrl: string
    To: string
}


router.post('/', (req: express.Request, res: express.Response) => {

    try {
        const twiml = new VoiceResponse()

        //@ts-ignore
        const body = req.body as getCallResourceResponseType
        if (body.Called && body.Caller) {
            console.log(body)
        }

        res.type('text/xml')
        res.send(twiml.toString())
    } catch (e) {
        console.log('Get call resource ERROR: ', e)
        res.send('ERROR')
    }


})

module.exports = router
