import express = require("express");
import {Store} from "../../store/store";
import {connectConferenceTwiml} from "../../utils/conference/connect-conference-twiml";

const router = express.Router();

router.post('/:callerId/:conferenceId',(req:express.Request,res:express.Response)=>{

    try {
        const callerId = req.params.callerId
        const conferenceId = req.params.conferenceId
        Store.deleteObjectIfEmpty(conferenceId)


        console.log(callerId)
        console.log(conferenceId)

        res.type('text/xml');
        res.send(connectConferenceTwiml({
            callerId,
            conferenceId: conferenceId,
            startConferenceOnEnter: true,
            endConferenceOnExit: false
        }).toString());
    }
    catch (e) {
        console.log('Connect to conference ERROR: ',e)
        res.status(500).send(e)
    }
})

module.exports = router
