import {getResponsible} from "../responsible/get-responsible";
import {Store} from "../../store/store";
import {ConfigSchemaType} from "../../schema-db/config-schema-db";

export const findCompanyAndResponsible = async (companyData:ConfigSchemaType|undefined,client: string, from: string) => {
    if (companyData) {
        const responsible = await getResponsible(client, from)
        if (responsible) {
            return responsible
        } else {
            const newArr = Store.shuffle(companyData.numbers_available)
            return newArr[0]
        }
    }
    return client // клиент = номер
}

