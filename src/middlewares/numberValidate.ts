import { IncorrectRequest } from "../errors/incorrectRequest";

export const numberValidate = (value: any): number => {
    if (!isNaN(Number(value))) {
        return Number(value);
    } else {
        throw new IncorrectRequest("El valor ingresado no es numerico");
        ;
    }
}