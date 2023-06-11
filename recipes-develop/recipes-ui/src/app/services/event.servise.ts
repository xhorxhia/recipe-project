import { Injectable } from "@angular/core";
import { Subject } from "rxjs";


@Injectable()
export class EventService {

    static _loggedUser = new Subject();

    static emitUser(data: any) {
        this._loggedUser.next(data);
    }
    
}