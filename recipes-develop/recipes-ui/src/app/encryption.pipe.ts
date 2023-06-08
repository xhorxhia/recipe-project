import { Pipe, PipeTransform } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Pipe({
  name: 'encryption'
})
export class EncryptionPipe implements PipeTransform {
  transform(value: string) {
    return CryptoJS.SHA512(value).toString();
  }
}

