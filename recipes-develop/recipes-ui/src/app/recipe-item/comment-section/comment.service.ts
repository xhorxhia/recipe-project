import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, tap, Observable, BehaviorSubject, merge } from "rxjs";
import { Comment } from "./comment.model";


@Injectable()
export class CommentService {
    private commentsUrl: string;

    constructor(private http: HttpClient) {
        this.commentsUrl = 'http://localhost:8080/comments';
    }

    public getComments(): Observable<Comment[]> {
        return this.http.get<Comment[]>(this.commentsUrl).pipe(
            tap(data => console.log(data))
        );
    }

    public getRootNodes(): Observable<string[]> {
        return this.http.get<string[]>(this.commentsUrl+'/root-nodes').pipe(
            tap(data => console.log(data))
        );
    }

    public getChildrenByRootNode(id: string): Observable<string[]> {
        return this.http.get<string[]>(this.commentsUrl+'/children/'+id).pipe(
            tap(data => console.log(data))
        );
    }

    addComment(comment: Comment): Observable<Comment> {
        return this.http.post<Comment>(this.commentsUrl, comment);
    }
}