import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class LoginPageService{
  private API_SERVER = "http://localhost:8080/users";

  constructor(private _http: HttpClient){}

  public loginUser(user: User): Observable<any>{
    return this._http.post(`${this.API_SERVER}` + `/check`, user, { observe: 'response' }).pipe(
      map((res: any) => {return res})
    );
  }
}
