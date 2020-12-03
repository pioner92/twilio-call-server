import {companyType} from "../utils/responsible/number-validate";
import {readSyncConfig} from "../utils/read-write-config";

type dataType = {
    id: string
    numbers: string[]
}

export class Store {
    static data: Array<dataType> = []

    private static getObjectFromNumber(n: string) {
        return this.data.find((el) => el.numbers.includes(n))
    }

    private static getObjectFromId(id: string) {
        return this.data.find((el) => el.id === id)
    }

    private static getObjectIndexFromId(id: string) {
        return this.data.findIndex((el) => el.id === id)
    }

    private static getObjectIndexFromNumber(n: string) {
        return this.data.findIndex((el) => el.numbers.includes(n))
    }

    static shuffle(arr: string[]) {
        return arr.sort(() => Math.round(Math.random() * 100) - 50);
    }

    // Add object to store
    static addData(id: string, numbers: string[]) {
        this.data = [...this.data.filter((el) => el.id !== id)]
        this.data.push({id, numbers})
    }

    // Delete number from object
    static deleteNumber(number: string) {
        const index = this.getObjectIndexFromNumber(number)
        if (index !== -1) {
            const obj = {...this.data[index]}
            const numbers = obj.numbers.filter((el) => el !== number)
            obj.numbers = numbers
            this.data[index] = obj
        }
    }

    // Delete object from store
    static deleteObject(id: string) {
        this.data = this.data.filter((el) => el.id !== id)
    }

    // Return end delete from store first number
    static getFirstNumber(id: string) {
        const obj = this.getObjectFromId(id)
        if (obj) {
            return obj.numbers.shift()
        }
    }

    // init numbers from config
    static initData(number: string, id: string) {
        const _config = readSyncConfig().accounts as Array<companyType>
        const company = _config.find((el) => el.numbers_available.includes(number))
        if (company) {
            const numbers = company.numbers_available.filter((el) => el !== number)
            this.addData(id, this.shuffle(numbers))
        }
    }

    // Delete object if is empty
    static deleteObjectIfEmpty(id: string) {
        const obj = this.getObjectFromId(id)
        if (obj?.numbers.length === 0) {
            this.deleteObject(id)
            return true
        } else {
            return false
        }
    }

}
