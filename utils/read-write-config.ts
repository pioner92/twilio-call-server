const fs = require('fs')

export type accountsType = {
    name: string
    Account_Sid: string
    Auth_Token: string
    APP_SID: string
    voice_assistant_number: string
    hidden_number: string
    dispatcher_numbers: string[]
    numbers_available: string[]
}

export type fileType = {
    accounts: Array<accountsType>
}

export const readSyncConfig = ():fileType =>{
    const data = fs.readFileSync(__dirname+'/../config.json',
        {encoding:'utf8', flag:'r'});
    return JSON.parse(data)
}

export const readConfig = (): Promise<fileType> => {
    return new Promise(((resolve, reject) => {
        fs.readFile('./config.json', 'utf-8', (err: never, data: string) => {
            if (err) {
                reject(err)
            }
            resolve(JSON.parse(data))
        })
    }))
}


export const writeConfig = async (data: {}) => {
    return new Promise(((resolve, reject) => {
        if (data) {
            fs.writeFile('./config.json',
                JSON.stringify(data, null, 2), {encoding: 'utf-8'}, (err: never) => {
                    if (err) {
                        console.log(err)
                        reject({status: 'error'})
                    }
                    resolve({status: 'ok'})
                })
        } else {
            reject({status: 'error'})
        }
    }))
}

