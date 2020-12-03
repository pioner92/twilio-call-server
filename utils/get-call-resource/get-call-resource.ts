import {getCompanyFromName} from "../get-company/get-company";
import {CallListInstance} from "twilio/lib/rest/api/v2010/account/call";
import {CallPage} from "twilio/lib/rest/insights/v1/call";
import {Twilio} from "twilio";
import fetch from 'node-fetch'
import Buffer from 'buffer'

type getCallResourceResponseType = {
    sid: string,
    dateCreated: string
    dateUpdated: string
    parentCallSid: null | string,
    accountSid: string
    to: string
    toFormatted: string
    from: string
    fromFormatted: string
    phoneNumberSid: null | string,
    status: 'completed' | '',
    startTime: string
    endTime: string
    duration: string
    price: string
    priceUnit: string
    direction: 'outbound-api',
    answeredBy: null | string,
    annotation: null | string,
    apiVersion: string
    forwardedFrom: null | string,
    groupSid: null | string,
    callerName: string,
    queueTime: string,
    trunkSid: string,
    uri: string,
    subresourceUris: {
        notifications: string
        recordings: string
    }

}


export const getCallResource = (name: string,page:string) => {
    const company = getCompanyFromName(name)
    if (company) {

        const client = require('twilio')(company.Account_Sid, company.Auth_Token) as Twilio
        // if(page === '0'){
        //     // return client.calls.page({pageSize:20},(error, items)=>{
        //     //     // console.log(items)
        //     //     return items
        //     // })
        //     return fetch('https://api.twilio.com/2010-04-01/Accounts/ACea92366cacdea08cdc099ce743379dcb/Calls.json',{
        //         headers:{
        //             'Authorization':"Basic " + Buffer.Buffer.from("ACea92366cacdea08cdc099ce743379dcb"+":"+"844678f3c4a9fd2a423205754f69c012").toString('base64')
        //         }
        //     })
        //         .then((res)=>res.json())
        //         .then((data)=>data)
        // }
        // return fetch('https://api.twilio.com'+page,{
        //     headers:{
        //         'Authorization':"Basic " + Buffer.Buffer.from("ACea92366cacdea08cdc099ce743379dcb"+":"+"844678f3c4a9fd2a423205754f69c012").toString('base64')
        //     }
        // })
        //     .then((res)=>res.json())
        //     .then((data)=>data)
        return client.calls.list({limit:50})

    }
}
