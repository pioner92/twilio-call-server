import express = require('express');
import fs from 'fs'
import {readSyncConfig} from "../../utils/read-write-config";

const router = express.Router();
const ClientCapability = require('twilio').jwt.ClientCapability


interface numbers {
    dispatcher_numbers: string[]
}

router.get('/generate/:name', (req: express.Request, res: express.Response) => {
    try {
        let company = readSyncConfig().accounts.find((el: numbers) => el.dispatcher_numbers.includes(req.params.name))

        if(company){
            const data = fs.readFileSync('./config.json',
                {encoding:'utf8', flag:'r'});
            console.log(JSON.parse(data).accounts[0])
            const accountSid: string = company?.Account_Sid || 'null'
            const authToken: string = company?.Auth_Token || 'null'
            const applicationSid: string = company?.APP_SID || 'null'
            const capability = new ClientCapability({accountSid, authToken})

            capability.addScope(new ClientCapability.OutgoingClientScope({applicationSid}));
            capability.addScope(new ClientCapability.IncomingClientScope(req.params.name.toString()))

            const token: string = capability.toJwt()

            res.set('Content-Type', 'application/json')
            res.send(JSON.stringify({token: token}))
        }
        else {
            res.set('Content-Type', 'application/json')
            res.send(JSON.stringify({token: ''}))
        }


    } catch (e) {
        console.log('Token generate Error ' + e)
        res.status(500).json({error:e})
    }

})

module.exports = router;
