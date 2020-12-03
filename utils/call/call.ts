import {connectConferenceTwiml} from "../conference/connect-conference-twiml";
import {Twilio} from "twilio";
import express from "express";
import {CallListInstanceCreateOptions} from "twilio/lib/rest/api/v2010/account/call";

type callDataType = {
    res: express.Response
    auth: { Account_Sid: string, Auth_Token: string }
    from: string
    number: string
    url: string
    urlEvent?: string
    statuses?: string[] | string
    timeout:number
    callerId:string
    conferenceId:string
}

export const call = ({res, from, auth, number, url, urlEvent, statuses,timeout,conferenceId}: callDataType) => {

    const client: Twilio = require("twilio")(auth.Account_Sid, auth.Auth_Token);

    const options: CallListInstanceCreateOptions = {
        from: from,
        to: `client:${number}`,
        url,
        record:true,
        timeout,
    }


    if (urlEvent) {
        options.statusCallbackMethod = 'POST'
        options.statusCallback = urlEvent
        options.statusCallbackEvent = statuses
    }

    client.calls.create(options)

    res.type("text/xml");
    res.send(
        connectConferenceTwiml({
            callerId:from,
            conferenceId: conferenceId,
            waitUrl: "",
            startConferenceOnEnter: false,
            endConferenceOnExit: true,
        }));
}
