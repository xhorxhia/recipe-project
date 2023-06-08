import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthState } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {
  loggedInUser = new BehaviorSubject<AuthState>(
    {
      state: false,
      userid: "",
      username: "",
    }
  );

  constructor() { }
}
