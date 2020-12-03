import VoiceResponse from "twilio/lib/twiml/VoiceResponse";
import {urls} from "../routes/urls";

export const dialCreate = (twilm:VoiceResponse,flag:string,company_number:string | undefined)=> {
    return twilm.dial({ timeout: flag ? 15 : 45,
        callerId: company_number || '',
        recordingStatusCallback: `${urls.url}${urls.event}`,
        recordingStatusCallbackMethod: "GET",
        record: "record-from-answer",
    })
}
