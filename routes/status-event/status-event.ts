import express = require('express')
import { CallStatus } from 'twilio/lib/rest/api/v2010/account/call'
import { direction, sendRecordLink } from '../../utils/send-record-link'
import { getTwilioClient } from '../../utils/get-twilio-client'
import VoiceResponse from 'twilio/lib/twiml/VoiceResponse'
import { GetCompanyDataFromDb } from '../../schema-db/configDb'
import { Store } from '../../store/store'
import { voiceMail } from '../../utils/voice-mail'
import { callContainer } from '../../utils/call/callContainer'
import { dialCreate } from '../../utils/dial-create'
import { hrRedirect } from '../../utils/hr-redirect'

const CallSidService = require('../../store/call-sid-service')
const router = express.Router()

export enum SipResponseCodeEnum {
    notAvailable = '480',
    timeOut = '487',
    completed = '200',
}

export type eventBodyType = {
    RecordingUrl: string
    RecordingDuration: string
    ApiVersion: string
    Called: string
    CallStatus: CallStatus
    Duration: string
    From: string
    CallerCountry: string
    Direction: string
    Timestamp: string
    CallDuration: string
    CallbackSource: string
    AccountSid: string
    CallerCity: string
    SipResponseCode:
        | SipResponseCodeEnum.timeOut
        | SipResponseCodeEnum.completed
        | SipResponseCodeEnum.notAvailable
    CallerState: string
    FromCountry: string
    Caller: string
    FromCity: string
    SequenceNumber: string
    CallSid: string
    To: string
    FromZip: string
    CallerZip: string
    FromState: string
}

router.post(
    '/:company_name/:from/:conferenceId',
    async (req: express.Request, res: express.Response) => {
        try {
            const twiml = new VoiceResponse()

            //@ts-ignore
            const body = req.body as eventBodyType
            const companyName = req.params.company_name
            const from = req.params.from
            const conferenceId = req.params.conferenceId
            const status = body.CallStatus as CallStatus

            const companyData = await GetCompanyDataFromDb.byName(companyName)

            const { RecordingUrl, From, To, CallStatus, Duration } = body
            const client = await getTwilioClient(companyData)
            sendRecordLink({
                link: RecordingUrl,
                from: From,
                to: To.slice(7),
                status: CallStatus,
                direction: direction.incoming,
                duration: Duration,
            })

            if (status === 'no-answer' || status === 'busy') {
                // Отбой или таймаут
                const number = Store.getFirstNumber(conferenceId)
                const hr = hrRedirect(companyName)

                if (hr) {
                    const dial = dialCreate(
                        twiml,
                        'false',
                        companyData?.company_number
                    )
                    dial.number(hr.number)

                    res.type('text/xml')
                    res.send(twiml.toString())
                    return
                } else {
                    if (number) {
                        callContainer(
                            res,
                            companyData,
                            number,
                            from,
                            'iter',
                            conferenceId
                        )
                    } else {
                        client
                            ?.calls(CallSidService.getSid(from))
                            .update({ twiml: voiceMail() })
                        Store.deleteObject(conferenceId)
                        res.send(twiml.toString())
                        return
                    }
                }
            } else {
                Store.deleteObject(conferenceId)
                res.type('text/xml')
                res.send(twiml.toString())
                return
            }
        } catch (e) {
            console.log('Status event ERROR: ', e)
            res.status(500).send(e)
        }
    }
)

module.exports = router
