import express = require("express");
import {fileType, readConfig, readSyncConfig} from "../../utils/read-write-config";
const router = express.Router();

router.get('/:name',async (req:express.Request,res:express.Response)=>{
    try {
        const file: fileType =  readSyncConfig();
        const company = file.accounts.find((el) => el.name === req.params.name);
        res.json({data: company?.numbers_available});
    }
    catch (e) {
        console.log('Get available dispatchers ERROR: ',e)
        res.json({error:e})
    }
})


module.exports = router
