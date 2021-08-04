import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  urlPosts = 'https://jsonplaceholder.typicode.com/posts'

  errorMsg

  constructor(
    private httpClient: HttpClient
  ) { }

  getPosts(): Observable<any> {
    return this.httpClient.get(this.urlPosts)
    .pipe(catchError(error => {
      if (error.error instanceof ErrorEvent) {
          this.errorMsg = `Error: ${error.error.message}`;
      } else {
          this.errorMsg = `Error: ${error.message}`;
      }
      return throwError(this.errorMsg);
    })
    )
  }

  getPostById(id): Observable<any> {
    return this.httpClient.get(`${this.urlPosts}/${id}`)
      .pipe(catchError(error => {
        if (error.error instanceof ErrorEvent) {
            this.errorMsg = `Error: ${error.error.message}`;
        } else {
            this.errorMsg = `Error: ${error.message}`;
        }
        return throwError(this.errorMsg);
      })
      )
  }

}

