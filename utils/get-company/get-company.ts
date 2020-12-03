import {companyType} from "../responsible/number-validate";
import {readSyncConfig} from "../read-write-config";


const _companies:Array<companyType> = readSyncConfig().accounts;

export const getCompanyFromName = (name:string) => {
    return  _companies.find((el)=>el.name === name)
}

export const getCompanyFromNumber = (number:string) => {
    return _companies.find((el)=>el.numbers_available.includes(number))
}
