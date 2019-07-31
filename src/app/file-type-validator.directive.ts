import { Directive } from '@angular/core';
import { FormControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appFileTypeValidator]',
  providers: [
    {
      provide: NG_VALIDATORS, useExisting: FileTypeValidatorDirective, multi: true
    }
  ]
})
export class FileTypeValidatorDirective {

  constructor() { }
  static validate(c: FormControl): { [key: string]: any } {
    if (c.value) {
      if (c.value[0]) {
        return FileTypeValidatorDirective.checkExtension(c);
      }
    }
  }

  private static checkExtension(c: FormControl) {
    // const valToLower = c.value[0].name.toLowerCase();
    const regex = new RegExp('(.*?)\.(JPG|PNG|JPEG)$'); // add or remove required extensions here
    const regexTest = regex.test(c.value[0].name);
    return !regexTest ? { notSupportedFileType: true } : null;
  }

  validate(c: FormControl): { [key: string]: any } {
    return FileTypeValidatorDirective.validate(c);
  }

}
