import express = require("express");
import {direction, sendRecordLink} from "../../utils/send-record-link";
import {getTwilioClient} from "../../utils/get-twilio-client";
import VoiceResponse from "twilio/lib/twiml/VoiceResponse";

const router = express.Router();


type responseType = {
    AccountSid: 'ACea92366cacdea08cdc099ce743379dcb',
    ApiVersion: '2010-04-01',
    CallSid: 'CAd6461c3d3b97ae498a1bf7f45d5074ae',
    CallStatus: 'completed',
    Called: '+18147040010',
    CalledCity: 'MEYERSDALE',
    CalledCountry: 'US',
    CalledState: 'PA',
    CalledZip: '15558',
    Caller: '+18147040010',
    CallerCity: 'MEYERSDALE',
    CallerCountry: 'US',
    CallerState: 'PA',
    CallerZip: '15558',
    Digits: 'hangup',
    Direction: 'inbound',
    From: '+18147040010',
    FromCity: 'MEYERSDALE',
    FromCountry: 'US',
    FromState: 'PA',
    FromZip: '15558',
    RecordingDuration: '8',
    RecordingSid: 'RE1e2218d84468ff10c7d6580321d61ddf',
    RecordingUrl: 'https://api.twilio.com/2010-04-01/Accounts/ACea92366cacdea08cdc099ce743379dcb/Recordings/RE1e2218d84468ff10c7d6580321d61ddf',
    To: '+18147040010',
    ToCity: 'MEYERSDALE',
    ToCountry: 'US',
    ToState: 'PA',
    ToZip: '15558'
}

const CallSidService = require('../../store/call-sid-service')

router.get(`/`, (req: express.Request, res: express.Response) => {

    try{
        const data = req.query as responseType

        if ('From' in data) {
            sendRecordLink({
                link: data.RecordingUrl,
                from: data.From,
                to: data.To,
                status: 'Voicemail',
                duration: data.RecordingDuration,
                direction: direction.incoming
            })
        }
        const twiml = new VoiceResponse()
        res.type('text/xml')
        res.send(twiml.toString())
    }catch (e){
        console.log('Record link voiceMail ERROR: ',e)
        res.send('ERROR')
    }

})

module.exports = router
