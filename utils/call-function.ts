import {getConnectedStatus} from "../twilio_call_widget";
import VoiceResponse from "twilio/lib/twiml/VoiceResponse";
import {dialCreate} from "./dial-create";
import {hungUpCalling} from "./hung-up-calling";
import {urls} from "../routes/urls";

interface GetParams {
    [key: string]: any;
    company_number?: string;
    arr_numbers?: string[];
    companyName: string,
    from: string
}


export async function fn_call({req, res, company_number, arr_numbers, isIter, companyName, from}: GetParams) {
    const twiml: VoiceResponse = new VoiceResponse();
    try {
        if (getConnectedStatus()) {
            hungUpCalling(twiml, res)
            return;
        }
        const PhoneNumber: string = req.body.phoneNumber;
        const ext = req.body.from
        const dial = dialCreate(twiml, isIter, company_number)

        if (PhoneNumber) {
            dial.number({
                statusCallback:`${urls.url}${urls.dialCallStatus}/${ext}`,
                statusCallbackMethod:'POST'
            },PhoneNumber);
        }

        // Звонок на голосовой асистент
        else if (company_number) {
            dial.number(company_number);
        }
        // Входящий вызов на диспетчеров
        // else if (arr_numbers) {
        //     // Звонок после редиректа на всех диспетчеров
        //     if (isIter) {
        //         callInterval(dial, twiml, arr_numbers[0], from);
        //     }
        //     // Первый звонок на всех диспетчеров
        //     if (!isIter && arr_numbers.length === 2) {
        //         const responsible = await getResponsible(companyName, from)
        //         responsible ? arr_numbers[0] = responsible : null
        //         shufleCompanyNumbers(arr_numbers[0]);
        //         callInterval(dial, twiml, arr_numbers[0], from);
        //     }
        //     // Звонок на одного диспетчера
        //     if (!isIter && arr_numbers.length === 1) {
        //         // dial.client(arr_numbers[0])
        //         // dial.conference({startConferenceOnEnter:true,endConferenceOnExit:false},'room')
        //     }
        // }
        res.type("text/xml");
        res.send(dial.toString());
        // res.send(twiml.toString());
    } catch (e) {
        console.log("FN_call ERROR " + e);
    }
}
