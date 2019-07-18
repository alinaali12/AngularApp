import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileDownloaderService {

  constructor() { }
  public base64ToBlob(b64Data: string, contentType='', sliceSize=512) {
    b64Data = b64Data.replace(/\s/g, ''); //IE compatibility...
    let byteCharacters = atob(b64Data);
    let byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        let slice = byteCharacters.slice(offset, offset + sliceSize);

        let byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        let byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, {type: contentType});
}

  downloadFile(b64encodedString: string|ArrayBuffer,filename:string) {
   
    if (b64encodedString) {
      var blob = this.base64ToBlob( b64encodedString.toString(), this.GetContentType(filename));
      var url = window.URL.createObjectURL(blob);

   //   window.open(url);
   //   window.navigator.msSaveOrOpenBlob(blob);
   const link = document.createElement('a');
   link.href = url;
   link.download = filename;
   link.click();
      // return new File([blob], filename,{type: this.GetContentType(filename)});
    }
  }
  GetContentType(path:string)
  {
      var types = this.GetMimeTypes();
      var ext = path.substring(path.lastIndexOf('.'));
      ext=ext.toLocaleLowerCase(); 
      console.log("Types are:",types[ext]);
      return types[ext];
  }

  
   GetMimeTypes()
  {
    var dict : {[key:string]: string}={};
    dict[".txt"]="text/plain";
    dict[".pdf"]="application/pdf";
    dict[".doc"]="application/vnd.ms-word";
    dict[".docx"]="application/vnd.ms-word";
    dict[".xls"]="application/vnd.ms-excel";
    dict[".xlsx"]="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    dict[".png"]="image/png";
    dict[".jpg"]="image/jpeg";
    dict[".jpeg"]="image/jpeg";
    dict[".gif"]="image/gif";
    dict[".csv"]="text/csv";
    dict[".cs"]="text/plain" ;
                
      return dict;
  }
}
