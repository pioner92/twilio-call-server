import {readSyncConfig} from "../read-write-config";


export type companyType = {
	"name": string,
	"Account_Sid": string
	"Auth_Token": string,
	"APP_SID": string,
	"voice_assistant_number": string,
	"hidden_number": string,
	"dispatcher_numbers": string[]
	"numbers_available": string[]
}

export const numberValidate = (value:string):companyType|undefined =>{
	const companies:Array<companyType> = readSyncConfig().accounts
	return companies.find((el)=>el.name === value)
}
