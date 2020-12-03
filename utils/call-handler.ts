import express = require('express');
import {fn_call} from './call-function'

interface Interface {
    company_number?: string
    arr_numbers?: string[]
    isIter?: string
    companyName?: string
    from?:string
}

interface Call {
    req: express.Request
    res: express.Response

    connect({}): void

    incoming_call(numbers: string[], isIter: string, companyName: string,from:string): void

    out_coming_call(company_number: string): void

    counter: number
}


export class CallHandler implements Call {
    req: express.Request;
    res: express.Response
    counter = 0

    constructor(req: express.Request, res: express.Response) {
        this.req = req;
        this.res = res;
    }

    // Функция вызова
    connect({company_number, arr_numbers, isIter, companyName,from}: Interface) {
        fn_call({
            req: this.req,
            res: this.res,
            company_number,
            arr_numbers,
            isIter,
            companyName: companyName || '',
            from:from || ''
        })

    }

    // Вызов соеденения с диспетчерами
    incoming_call(numbers: string[], isIter: string, companyName: string,from:string) {
        this.connect({arr_numbers: numbers, isIter, companyName,from})
    }

    // Исходящий звонок
    out_coming_call(company_number: string) {
        this.connect({company_number})
    }
}
