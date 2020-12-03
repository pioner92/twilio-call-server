import {numberValidate} from "../responsible/number-validate";
import {getResponsible} from "../responsible/get-responsible";
import {Store} from "../../store/store";

export const findCompanyAndResponsible = async (client: string, from: string) => {
    const company = numberValidate(client) // Если клиент = имя компании
    if (company) {
        const responsible = await getResponsible(client, from)
        if (responsible) {
            return responsible
        } else {
            const newArr = Store.shuffle(company.numbers_available)
            return newArr[0]
        }
    }
    return client // клиент = номер
}

