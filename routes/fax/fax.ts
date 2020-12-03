import express = require("express");
const router = express.Router();


router.post('/sent',(req:express.Request,res:express.Response)=>{
    try {
        //@ts-ignore
        console.log(req.body)
        const twiml = `
     <Response>
         <Receive action="/fax/received"/>
     </Response> `
        res.type('text/xml');
        res.send(twiml);
    }
    catch (e) {
        console.log('Fax ERROR: ',e)
        res.send('error')
    }

})


module.exports = router
