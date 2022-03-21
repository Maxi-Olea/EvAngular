import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  urlPosts = 'https://jsonplaceholder.typicode.com/posts';
  urlComments = 'https://jsonplaceholder.typicode.com/comments';

  newCommentNotifier: Subject<null> = new Subject<null>();

  errorMsg

  constructor(
    private httpClient: HttpClient
  ) { }

  getPosts(): Observable<any> {
    return this.httpClient.get(this.urlPosts)
    .pipe(catchError(error => this.handleError(error)))
  }

  getPostById(id): Observable<any> {
    return this.httpClient.get(`${this.urlPosts}/${id}`)
    .pipe(catchError(error => this.handleError(error)))
  }

  getCommentsByPostId (postId): Observable<any> {
    return this.httpClient.get(`${this.urlComments}?postId=${postId}`)
    .pipe(catchError(error => this.handleError(error)))
  }

  getComments(): Observable<any> {
    return this.httpClient.get(this.urlComments)
    .pipe(catchError(error => this.handleError(error)))
  }

  notifyNewComment() {
    this.newCommentNotifier.next();
  }

  handleError(error) {
    if (error.error instanceof ErrorEvent) {
      this.errorMsg = `Error: ${error.error.message}`;
  } else {
      this.errorMsg = `Error: ${error.message}`;
  }
  return throwError(this.errorMsg);
  }

}

