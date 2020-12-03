import VoiceResponse from "twilio/lib/twiml/VoiceResponse";
import express from "express";

export const hungUpCalling = (twiml:VoiceResponse,res:express.Response) =>{
    res.type("text/xml");
    res.send(twiml.toString())
}
