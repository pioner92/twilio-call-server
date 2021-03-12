import express = require("express");
import {SetCompanyDataInDb} from "../../schema-db/configDb";
import {companyNameValidate} from "../../utils/companyNameValidate";

const router = express.Router();

const createResponseData = (company: string, number: string) => {
    return (action: string) => {
        return {msg: `Number ${number} ${action} ${company}`}
    }
}


router.post('/', (req: express.Request, res: express.Response) => {
    try {
        // @ts-ignore
        const {name, number, action} = req.body;
        if (name && number && action) {

            const validName = companyNameValidate(name)
            const responseData = createResponseData(name, number)

            switch (action) {
                case 'addDispatcher':
                    SetCompanyDataInDb.addNumber(validName, number)
                    res.json(responseData("added to"));
                    return;
                case 'deleteDispatcher':
                    SetCompanyDataInDb.deleteNumber(validName, number);
                    res.json(responseData("deleted from"));
                    return;
                default :
                    return
            }
        }
        res.json({msg: "Fail"});
    } catch (e) {
        console.log('Set dispatcher list ERROR: ', e)
        res.json({msg: 'ERROR', error: e})
    }

})

module.exports = router
