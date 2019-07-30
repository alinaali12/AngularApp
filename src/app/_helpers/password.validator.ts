import { FormGroup } from '@angular/forms';


// REGEX DOESNT WORK WITH STRING 


// custom validator to check that two fields match
export function customPasswordCheck(controlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
    
        if (control.errors && !control.errors.customPasswordCheck) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on control if validation fails
        console.log("value =",control.value.includes('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$') );
        if (!(control.value.includes("[a-zA-Z]+") || control.value.includes("[0-9]+") || (control.value.includes(" !\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~")))) {
            control.setErrors({ customPasswordCheck: true });
        } else {
            control.setErrors(null);
        }
    }
}