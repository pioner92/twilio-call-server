import express = require('express');
import {CallHandler} from '../../utils/call-handler';
import {GetCompanyDataFromDb} from "../../schema-db/configDb";

const router = express.Router();

interface name {
    name: string;
}

// Ихсодящий вызов, передаем номер компании
router.post('/connect/:company_name', async (req: express.Request, res: express.Response) => {
    try {
        const call: CallHandler = new CallHandler(req, res)
        let company = await GetCompanyDataFromDb.byName(req.params.company_name)
        if (company) {
            call.out_coming_call(company.company_number)
        }
    } catch (e) {
        console.log('Out coming ERROR: ', e)
        res.status(500).send(e)
    }
})

module.exports = router;
