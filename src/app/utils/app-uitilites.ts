import { FormControl, FormGroup, ValidationErrors } from "@angular/forms";

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
}