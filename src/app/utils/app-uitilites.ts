import { FormControl, FormGroup, ValidationErrors } from "@angular/forms";
import * as moment from "moment";
import { Moment } from "moment";
import { AppContants } from "./app-constants";

export class AppUtilities {

    public static noWhitespaceValidator(control: FormControl) {
        const isWhitespace = (control.value || '').trim().length === 0;
        const isValid = !isWhitespace;
        return isValid ? null : { 'whitespace': true };
    }

    public static getErrorsFromForm(form: FormGroup) {
        let messages: string[] = [];
        Object.keys(form.controls).forEach(key => {
            const controlErrors: ValidationErrors | null = form.get(key)!.errors;
            if (controlErrors != undefined) {
                Object.keys(controlErrors).forEach(keyError => {
                    if (keyError === 'required') {
                        messages.push(`Rellene el campo obligatorio ${key}`);
                    }
                });
            }
        });
        return messages;
    }

    public static firstLetterUpper(text: string) {
        if (!text || text.length === 0) return '';
        let textFormatted: string = text.substr(0, 1).toUpperCase();
        if (text.length > 1) {
            textFormatted = `${textFormatted}${text.substr(1, text.length).toLowerCase()}`;
        }
        return textFormatted;
    }

    public static checkAuthority(name: string): number {
        let id: string = '0';
        Object.keys(AppContants.ROLES).forEach(key => {
            if(AppContants.ROLES[key] === name) { id = key; }
        });
        return Number(id);
    }

    public static fomatDateToDDMMYYYY(date: any): string {
        return moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY');
    }
}