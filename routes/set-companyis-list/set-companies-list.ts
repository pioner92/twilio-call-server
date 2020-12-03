//@ts-ignore
import express from "express";

const express = require('express');
const router = express.Router();
const adCompanyToConfig = require('../../utils/add-company')
const deleteCompanyFromConfig = require('../../utils/delete-company')

const validate = (req:express.Request)=> {
    const {
        name, Account_Sid, Auth_Token, APP_SID,
        voice_assistant_number, hidden_number, dispatcher_numbers, numbers_available
        //@ts-ignore
    } = req.body

    return !!(name && Account_Sid && Auth_Token && APP_SID && voice_assistant_number && hidden_number && dispatcher_numbers.length > 0
        && numbers_available.length > 0);
}

// Добавить компанию в конфиг
router.post('/add', async (req:express.Request, res:express.Response) => {
    try{
        if (validate(req)) {
            //@ts-ignore
            await adCompanyToConfig({...req.body})
            res.json({status: 'ok'})
        } else {
            res.json({error: 'Error, not all data'})
        }
    }
    catch (e) {
        console.log('Add company ERROR: ',e)
        res.json({error: 'Error, not all data'})
    }

})

// Добавить компанию в конфиг
router.get('/delete/:name', async (req:express.Request, res:express.Response) => {
    try{
        const result = await deleteCompanyFromConfig(req.params.name)
        res.json(await result)
    }
    catch (e) {
        console.log('Delete company ERROR: ',e)
    }
})


module.exports = router;
