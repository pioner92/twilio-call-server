import {getCompanyFromNumber} from "./get-company/get-company";


export let arrNumbers: Array<string> = []

const _shuffle = (arr: Array<string>) => {
    return arr.sort(() => Math.round(Math.random() * 100) - 50);
}

export const shufleCompanyNumbers = (n: string) => {
    const company = getCompanyFromNumber(n);
    if (company) {
        const numbers = [...company?.numbers_available]?.filter((el: string) => el !== n);
        arrNumbers = _shuffle(numbers);
        console.log(arrNumbers);
    }
}




