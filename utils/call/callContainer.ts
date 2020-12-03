import {getCompanyFromNumber} from "../get-company/get-company";
import {call} from "./call";
import {CallEvent} from "twilio/lib/rest/api/v2010/account/call";
import express = require("express");
import {urls} from "../../routes/urls";
import {voiceMail} from "../voice-mail";


export type statusType = 'iter' | 'agent'


export const callContainer = (res: express.Response, number: string, from: string, status: statusType, conferenceId: string) => {

    const statuses: CallEvent = 'completed'

    const urlGeneration = (number: string, callerId: string, conferenceId: string) => `${urls.url}/connect_to_agent/${number}/${callerId}/${conferenceId}`

    const urlEventGeneration = (from: string, conferenceId: string) => `${urls.url}/status_event/${from}/${conferenceId}`

    const company = getCompanyFromNumber(number)


    if (company) {
        const callerId = company!.voice_assistant_number
        const auth = {Account_Sid: company!.Account_Sid, Auth_Token: company!.Auth_Token}
        const urlEvent = urlEventGeneration(from, conferenceId)
        const url = urlGeneration(number, callerId, conferenceId)
        const timeout = status === 'iter' ? 10 : 15

        call({res, from, auth, number, urlEvent, url, statuses, timeout, callerId, conferenceId})

    } else {
        res.type('text/xml')
        res.send(voiceMail())
    }
};


