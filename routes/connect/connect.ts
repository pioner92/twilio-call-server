import express = require("express");

const router = express.Router();
import {CallHandler} from "../../utils/call-handler";
import {GetCompanyDataFromDb} from "../../schema-db/configDb";


const promise = (interval: number) =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, interval);
    });

// При входящем вызове проверка кому звонить
router.post("/connect/:to/:from/:iter?", async (req: express.Request, res: express.Response) => {
        try {
            const to = req.params.to;
            const from = req.params.from;
            const isIter = req.params.iter
            const call: CallHandler = new CallHandler(req, res);
            let company = await GetCompanyDataFromDb.byName(to)
            // Звонок на всех диспетчеров этой компании
            if (company) {
                const companyName = to
                const numbers = [...company.numbers_available].slice(0, 2);
                call.incoming_call(numbers, isIter, companyName, from);
            }
            // Звонок на конкретный номер , переданный хуком
            else {
                if (req.params.iter) {
                    // Пауза между вызовами
                    await promise(3000);
                }
                call.incoming_call([to], isIter, '', from);
            }
        } catch (e) {
            console.log("Connect ERROR !!!" + e);
            res.status(500).send(e)
        }
    }
);

module.exports = router;
