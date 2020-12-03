import {saveToDb} from '../schema-db/save-to-db'

export const writeToLog = (name:string,from:string='dispatcher',to:string,status:string,duration:number) => {
    // const date = new Date().toLocaleDateString()
    // const time = new Date().toLocaleTimeString()
    // let strDuration = duration.toString()+' s'
    // saveToDb({name,date:`${date}/${time}`,from,to,status,duration:strDuration})
}



