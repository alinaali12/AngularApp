import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { LoginInfo } from '../models/login-info';
@Injectable({
  providedIn: 'root'
})
export class EncryptService {

  constructor() { }
 private CustomKey= '123456$#@$^@1ERF';

 private Encrypt(keys, value){
    var key = CryptoJS.enc.Utf8.parse(keys);
    var iv = CryptoJS.enc.Utf8.parse(keys);
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key,
    {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.toString();
  }

 private Decrypt(keys, value){
    var key = CryptoJS.enc.Utf8.parse(keys);
    var iv = CryptoJS.enc.Utf8.parse(keys);
    var decrypted = CryptoJS.AES.decrypt(value, key, {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    }); 
    return decrypted.toString(CryptoJS.enc.Utf8);
  } 

  encryptPass(User: LoginInfo) :LoginInfo{
    User.password= this.Encrypt(this.CustomKey,User.password);
   // console.log("Encrypted Password:",User.password);
    return User;
  }
  decryptPass (encrypted_pass : string) : string{
    return this.Decrypt(this.CustomKey,encrypted_pass);
  }
  
}
