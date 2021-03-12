import {io} from "../twilio_call_widget";
import {SocketConnectionsService} from "../store/socket-connections-service";

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
        const socketId = SocketConnectionsService.get({from,to})?.socketId
        socketId && io.to(socketId).emit('message_link', data)
    }
    catch (e){
        console.log('Send Record Link ERROR')
        console.log(e)
    }
}
