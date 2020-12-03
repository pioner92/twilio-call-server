import express = require('express');
import {CallHandler} from '../../utils/call-handler';
import {readSyncConfig} from "../../utils/read-write-config";
const router = express.Router();

interface name {
    name: string;
}

// Ихсодящий вызов, передаем номер компании
router.post('/connect/:company_name', (req: express.Request, res: express.Response) => {
    try {
        const call: CallHandler = new CallHandler(req, res)
        let company = readSyncConfig().accounts.find((el: name) => el.name === req.params.company_name)
        if (company) {
            call.out_coming_call(company.voice_assistant_number)
        }
    } catch (e) {
        console.log('Out coming ERROR: ', e)
    }
})

module.exports = router;
