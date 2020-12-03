import {Twilio} from "twilio";
import {getCompanyFromNumber} from "./get-company/get-company";

export const getTwilioClient = (from:string) => {
    console.log(from)
    const company = getCompanyFromNumber(from)
    console.log(company)
    if(company){
        return  require('twilio')(company.Account_Sid, company.Auth_Token) as Twilio
    }
}
