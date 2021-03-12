import express = require('express');
import {GetCompanyDataFromDb} from "../../schema-db/configDb";
import {companyNameValidate} from "../../utils/companyNameValidate";

const router = express.Router();

type paramsType = {
    companyName: string
    number: string
}

router.get('/:companyName/:number', async (req: express.Request, res: express.Response) => {
    try {
        const {companyName = '', number = ''} = req.params as paramsType

        const name = companyNameValidate(companyName)
        const company = await GetCompanyDataFromDb.byName(name)

        if (company) {
            const isAvailable = company.dispatcher_numbers.includes(number)
            if (isAvailable) {
                res.json({status: true})
                return
            } else {
                res.json({status: false})
                return
            }
        } else {
            res.json({msg: "Company not found", status: false})
        }

    } catch (e) {
        console.log(e)
        res.status(500).json({error: e})
    }
})

module.exports = router;
