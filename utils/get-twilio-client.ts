import {Twilio} from "twilio";
import {ConfigSchemaType} from "../schema-db/config-schema-db";

export const getTwilioClient = async (company:ConfigSchemaType|undefined) => {
    if(company){
        return  require('twilio')(company.Account_Sid, company.Auth_Token) as Twilio
    }
}
