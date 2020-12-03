import {io} from "../twilio_call_widget";
import {eventBodyType} from "../routes/status-event/status-event";

type propsType = {
    link:string
    from:string
    to:string
    status:string
    direction:'incoming' | 'outgoing',
    duration:string
}

export enum direction {
    incoming = 'incoming',
    outgoing = 'outgoing'
}

export const sendRecordLink = ({link,from,to,status,direction,duration}:propsType) => {
    try {
        const data = {
            link,
            from,
            to,
            status,
            direction,
            duration
        }
        console.log(data)
        io.emit("message_link", data);
    }
    catch (e){
        console.log('Send Record Link ERROR')
        console.log(e)
    }
}
