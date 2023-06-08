import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { map,Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    constructor(private http: HttpClient) {}

    public updateUser(user: User): Observable<boolean> {
        return this.http.put<boolean>('http://localhost:8080/users/update',user);
    }

}