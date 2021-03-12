import {connectConferenceTwiml} from "../conference/connect-conference-twiml";
import {Twilio} from "twilio";
import express from "express";
import {CallListInstanceCreateOptions} from "twilio/lib/rest/api/v2010/account/call";
import {ConfigSchemaType} from "../../schema-db/config-schema-db";
import {getTwilioClient} from "../get-twilio-client";

type callDataType = {
    res: express.Response
    companyData: ConfigSchemaType | undefined
    from: string
    number: string
    url: string
    urlEvent?: string
    statuses?: string[] | string
    timeout: number
    callerId: string
    conferenceId: string
}

export const call = async ({res, companyData, from, number, url, urlEvent, statuses, timeout, conferenceId}: callDataType) => {

    try{
        const client: Twilio | undefined = await getTwilioClient(companyData)

        const options: CallListInstanceCreateOptions = {
            from: from,
            to: `client:${number}`,
            url,
            record: true,
            timeout,
        }

        if (urlEvent) {
            options.statusCallbackMethod = 'POST'
            options.statusCallback = urlEvent
            options.statusCallbackEvent = statuses
        }

        client?.calls.create(options)

        res.type("text/xml");
        res.send(
            connectConferenceTwiml({
                callerId: from,
                conferenceId: conferenceId,
                startConferenceOnEnter: false,
                endConferenceOnExit: true,
            }));
    }
    catch (e) {
        console.log('Call ERROR: ',e)
        res.status(500).send(e)
    }
}
