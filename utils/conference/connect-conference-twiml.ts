import {urls} from "../../routes/urls";
//@ts-ignore

const VoiceResponse = require("twilio").twiml.VoiceResponse;

type optionsType = {
    startConferenceOnEnter: boolean
    endConferenceOnExit: boolean
    waitUrl: string
    conferenceId: string
    callerId: string,
}

export const connectConferenceTwiml = function (options: optionsType) {
    const voiceResponse = new VoiceResponse();
    voiceResponse.dial({
        callerId: options.callerId,
        recordingStatusCallback: `${urls.url}/${urls.event}`,
        recordingStatusCallbackMethod: "GET",
        record: "record-from-answer",
        method:'POST',
    }).conference(
        {
            startConferenceOnEnter: options.startConferenceOnEnter,
            endConferenceOnExit: options.endConferenceOnExit,
            waitUrl: `${urls.url}${urls.ringSignal}`,
        },
        options.conferenceId
    );
    return voiceResponse.toString();

};
