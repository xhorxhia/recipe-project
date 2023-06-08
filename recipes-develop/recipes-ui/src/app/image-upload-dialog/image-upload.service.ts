import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AsyncSubject, map, Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {
  private API_SERVER = "http://localhost:8080/images";

  constructor(private _http: HttpClient) { }

  // It may be a bit overengineered, but it works!
  // May come back to it if I feel like it's a bit too much code for a simple File conversion.
  // https://upmostly.com/angular/converting-files-to-base64-in-angular
  convertFileToBase64(file : File | undefined) : Observable<string> {
    // The best feature of the ReplaySubject is that it re-emits the stored values to new subscribers.
    // https://rxjs-dev.firebaseapp.com/api/index/class/ReplaySubject
    const result = new ReplaySubject<string>(1);
    if(file === undefined){
      result.next("");
    }
    else{
      const reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = (event) => {
        const eventTarget = event.target as FileReader;
        const readerResult = eventTarget.result as ArrayBuffer;
        result.next(btoa(readerResult.toString()));
      };
    }
    return result;
  }

  public uploadImage(image: FormData): Observable<any>{
    return this._http.post(`${this.API_SERVER}`, image, { observe: 'response' }).pipe(
      map((res: any) => {return res})
    );
  }

  public deleteImage(image: FormData): Observable<any>{
    return this._http.post(`${this.API_SERVER}`, image, { observe: 'response' }).pipe(
      map((res: any) => {return res})
    );
  }
}
