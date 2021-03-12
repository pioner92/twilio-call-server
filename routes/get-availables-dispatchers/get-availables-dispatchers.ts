import express = require("express");
import {GetCompanyDataFromDb} from "../../schema-db/configDb";
import {companyNameValidate} from "../../utils/companyNameValidate";

const router = express.Router();

router.get('/:name',async (req:express.Request,res:express.Response)=>{

    const name = companyNameValidate(req.params.name)

    try {
        const company = await GetCompanyDataFromDb.byName(name)
        if (company) {
            res.json({data: company?.numbers_available});
        }
        else {
            res.json({msg:"Company not found !"});
        }
    }
    catch (e) {
        console.log('Get available dispatchers ERROR: ',e)
        res.json({error:e})
    }
})

module.exports = router
