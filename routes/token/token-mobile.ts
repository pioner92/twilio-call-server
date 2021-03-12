import express = require('express');

const AccessToken = require('twilio').jwt.AccessToken;
const VoiceGrant = AccessToken.VoiceGrant;

const router = express.Router();
const defaultIdentity = '888';
const accountSid = "ACea92366cacdea08cdc099ce743379dcb";
const apiKey = "SK2adfa5da90a0dd16286d2e613612ad22";
const apiSecret = "hjvzFYjPnZGjE64TsvEhsVsFzpATA4e2";

let pushCredSid = "CRb8f1e176a5b8c46358ed9108578c37ff";

const outgoingApplicationSid = "AP93b929bfe1e77b4d4af322604ad63862";


router.get('/accessToken/:platform?', async (req: express.Request, res: express.Response) => {


    if(req.params.platform === "android"){
        pushCredSid = "AP93b929bfe1e77b4d4af322604ad63862";
    }

    let identity:String;

    if (req.method == 'POST') {
        //@ts-ignore
      identity = req.body.identity;
    } else {
      identity = req.query.identity;
    }

    if(!identity) {
      identity = defaultIdentity;
    }

    const voiceGrant = new VoiceGrant({
        outgoingApplicationSid: outgoingApplicationSid,
        pushCredentialSid: pushCredSid
    });

    const token = new AccessToken(accountSid, apiKey, apiSecret);
    token.addGrant(voiceGrant);
    console.log(identity)
    token.identity = identity;
    console.log('Token:' + token.toJwt());
    res.send(token.toJwt());
})

module.exports = router;
