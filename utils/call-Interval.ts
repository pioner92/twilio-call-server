import {arrNumbers} from "./shufle-company-numbers";
import {urls} from "../routes/urls";

type getNumberType = (arr: Array<string>) => string | undefined;

type dialType = {
    client: Function;
};
type twilmType = {
    redirect: Function;
};

const _getNumber: getNumberType = (arr) => {
    if (arr?.length && Array.isArray(arr)) {
        return arr.shift();
    }
};
/**
 * @params dial from Twilio
 * @params twilm from Twilio
 * @params firstNumber from call
 */

export const callInterval = (dial: dialType, twilm: twilmType, firstNumber = _getNumber(arrNumbers), from: string) => {
    const secondNumber = _getNumber(arrNumbers);
    if (firstNumber) {
        dial.client(firstNumber);
        if (secondNumber) {
            twilm.redirect(`${urls.url}/dispatcher/connect/${secondNumber}/${from}/true`);
        }
        dial.client;
    }
};

