import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private API_SERVER = "http://localhost:8080/images";

  constructor(private _http: HttpClient) { }

  public getImage(id: string): Observable<any>{
    return this._http.get(`${this.API_SERVER}` + '/' + id, { observe: 'response' }).pipe(
      map((res: any) => {return res})
    );
  }
}
