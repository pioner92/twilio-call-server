import express = require('express')
import { GetCompanyDataFromDb } from '../../schema-db/configDb'
import { companyNameValidate } from '../../utils/companyNameValidate'

const router = express.Router()
const ClientCapability = require('twilio').jwt.ClientCapability

router.get(
    '/generate/:name/:number',
    async (req: express.Request, res: express.Response) => {
        try {
            let companyName: string = companyNameValidate(req.params.name)

            const company = await GetCompanyDataFromDb.byName(companyName)

            if (company?.numbers_available.includes(req.params.number)) {
                const accountSid = company?.Account_Sid
                const authToken = company?.Auth_Token
                const applicationSid = company?.APP_SID
                const capability = new ClientCapability({
                    accountSid,
                    authToken,
                })

                capability.addScope(
                    new ClientCapability.OutgoingClientScope({ applicationSid })
                )
                capability.addScope(
                    new ClientCapability.IncomingClientScope(
                        req.params.number.toString()
                    )
                )
                const token = capability.toJwt()
                res.set('Content-Type', 'application/json')
                res.json({ token: token })
            } else {
                res.set('Content-Type', 'application/json')
                res.send({ token: '' })
            }
        } catch (e) {
            console.log('Token generate ERROR: ', e)
            res.status(500).send(e)
        }
    }
)

module.exports = router
