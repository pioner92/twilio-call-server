import express = require("express");
import {configDispatcherHandler} from "../../utils/add-delete-dispatcher";
const router = express.Router();

router.post('/',(req:express.Request,res:express.Response)=>{
    try {
        // @ts-ignore
        const {name, number, action} = req.body;
        if (name && number && action) {
            configDispatcherHandler(name, number, action);
        }
        res.json({msg: "Ok"});
    }
    catch (e) {
        console.log('Set dispatcher list ERROR: ',e)
        res.json({msg:'ERROR',error:e})
    }

})

module.exports = router
