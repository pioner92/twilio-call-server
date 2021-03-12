import {accountsType, fileType, readConfig, writeConfig} from "./read-write-config";

type findCompanyType = {
    result: accountsType | undefined,
    index: number
}

type actionType = 'addDispatcher' | 'deleteDispatcher'


const findCompany = (file: fileType, name: string): findCompanyType => {
    const result = file.accounts.find((el) => el.name === name)
    const index = file.accounts.findIndex((el) => el.name === name)
    return ({result, index})
}

export const configDispatcherHandler = async (name: string, number: string, action: actionType) => {
    const file: fileType = await readConfig()
    const company: findCompanyType = findCompany(file, name)
    if (action === 'deleteDispatcher') {
        deleteDispatcher(company, number, file)
    } else if (action === 'addDispatcher') {
        addDispatcher(company, number, file)
    }
    await writeConfig(file)
}

const addDispatcher = (company: findCompanyType, number: string, file: fileType) => {
    if (company.result && company.index !== undefined) {
        const index = company.result.numbers_available.indexOf(number)
        if (index === -1) {
            company.result.numbers_available.push(number)
            company.result.dispatcher_numbers.push(number)
            file.accounts[company.index] = company.result
        } else {
            console.log('The number already exists')
        }
    }
}

const deleteDispatcher = (company: findCompanyType, number: string, file: fileType) => {
    if (company.result && company.index !== undefined) {
        company.result.numbers_available = company.result.numbers_available.filter((el) => el !== number)
        company.result.dispatcher_numbers = company.result.dispatcher_numbers.filter((el) => el !== number)
        file.accounts[company.index] = company.result
    }
}
