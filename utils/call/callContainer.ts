import { call } from './call'
import { CallEvent } from 'twilio/lib/rest/api/v2010/account/call'
import { urls } from '../../routes/urls'
import { voiceMail } from '../voice-mail'
import { ConfigSchemaType } from '../../schema-db/config-schema-db'
import express = require('express')

export type statusType = 'iter' | 'agent' | 'hr'

const timeoutService = (status: statusType) => {
    switch (status) {
        case 'iter':
            return 10
            break
        case 'agent':
            return 15
            break
        case 'hr':
            return 30
            break
        default:
            return 15
            break
    }
}

export const callContainer = async (
    res: express.Response,
    companyData: ConfigSchemaType | undefined,
    number: string,
    from: string,
    status: statusType,
    conferenceId: string
) => {
    const statuses: CallEvent = 'completed'

    const connectToAgentLink = (
        number: string,
        callerId: string,
        conferenceId: string
    ) => `${urls.url}/connect_to_agent/${callerId}/${conferenceId}`

    const statusEventLink = (
        companyName: string,
        from: string,
        conferenceId: string
    ) => `${urls.url}/status_event/${companyName}/${from}/${conferenceId}`

    if (companyData) {
        const callerId = companyData!.company_number
        const urlEvent = statusEventLink(companyData.name, from, conferenceId)
        const url = connectToAgentLink(number, callerId, conferenceId)
        const timeout = timeoutService(status)

        call({
            res,
            from,
            companyData,
            number,
            urlEvent,
            url,
            statuses,
            timeout,
            callerId,
            conferenceId,
        })
    } else {
        res.type('text/xml')
        res.send(voiceMail())
    }
}
