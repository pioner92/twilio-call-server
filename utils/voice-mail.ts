import VoiceResponse from "twilio/lib/twiml/VoiceResponse";
import {urls} from "../routes/urls";

export const voiceMail = () => {
    const twiml = new VoiceResponse()
    twiml.say("No one is available to take your call, please leave a message and we will get back to you shortly")
    twiml.record({
        action: `${urls.url}${urls.event}`,
        method: 'GET',
        maxLength: 30,
        timeout:30,
        playBeep: true,
        finishOnKey: '#',
    })
    twiml.hangup()
    twiml.reject()
    return twiml.toString()
}
