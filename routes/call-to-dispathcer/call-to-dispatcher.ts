import express = require("express");
import {callContainer, statusType} from "../../utils/call/callContainer";
import {findCompanyAndResponsible} from "../../utils/conference/find-company-and-responsible";
import {Store} from "../../store/store";

const CallSidService = require('../../store/call-sid-service')

const router = express.Router();


router.post('/:client/:from/:status?', async (req: express.Request, res: express.Response) => {
    try {
        const from = req.params.from
        const status = req.params.status as statusType
        const client = await findCompanyAndResponsible(req.params.client, from)
        //@ts-ignore
        const numberFromClient = req.body.from
        const conferenceId = numberFromClient || from

        //@ts-ignore
        !CallSidService.getSid(from) && CallSidService.addSid({from, sid: req.body.CallSid})

        if (status !== 'agent') {
            Store.initData(client, conferenceId) // Находим по номеру клиента компанию - и записываем все номера в массив + перемешываем
        } else {
            Store.deleteNumber(client)
        }
        callContainer(res, client, from, status, conferenceId)   // Вызов на номер клиента
    } catch (e) {
        console.log(e);
    }

})

module.exports = router
