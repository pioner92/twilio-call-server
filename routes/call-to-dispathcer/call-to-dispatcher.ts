import express = require('express')
import { callContainer, statusType } from '../../utils/call/callContainer'
import { GetCompanyDataFromDb } from '../../schema-db/configDb'
import VoiceResponse from 'twilio/lib/twiml/VoiceResponse'
import { urls } from '../urls'
import { companyNameValidate } from '../../utils/companyNameValidate'
import { findCompanyAndResponsible } from '../../utils/conference/find-company-and-responsible'

const CallSidService = require('../../store/call-sid-service')

const router = express.Router()

router.post(
    '/:company_name/:to/:from/:status?',
    async (req: express.Request, res: express.Response) => {
        const twiml: VoiceResponse = new VoiceResponse()

        try {
            const companyName = req.params.company_name
            const companyData = await GetCompanyDataFromDb.byName(companyName)
            const from = req.params.from
            const to = await findCompanyAndResponsible(
                companyData,
                companyName,
                from
            )

            const status = req.params.status as statusType
            //@ts-ignore
            const numberFromClient = req.body.from
            const conferenceId = numberFromClient || from

            const dial = twiml.dial({
                timeout: 15,
                callerId: companyData?.company_number || '',
                recordingStatusCallback: `${urls.url}${urls.event}`,
                recordingStatusCallbackMethod: 'GET',
                record: 'record-from-answer',
            })

            if (companyData?.name === companyNameValidate(req.params.to)) {
                for (let el of companyData.numbers_available) {
                    dial.client(el)
                }
            } else {
                // dial.client(req.params.to)
                callContainer(res, companyData, to, from, status, conferenceId) // Вызов на номер клиента
            }
            res.send(twiml.toString())
            // //@ts-ignore
            // !CallSidService.getSid(from) && CallSidService.addSid({from, sid: req.body.CallSid})
            //
            // if (status !== 'agent') {
            //     Store.initData(companyData,to, conferenceId) // Находим по номеру клиента компанию - и записываем все номера в массив + перемешываем
            // } else {
            //     Store.deleteNumber(to)
            // }
            // callContainer(res,companyData, to, from, status, conferenceId)   // Вызов на номер клиента
        } catch (e) {
            console.log('Call to dispatcher ERROR: ', e)
            res.status(500).send(e)
        }
    }
)

module.exports = router
