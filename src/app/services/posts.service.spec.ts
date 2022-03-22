import { HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { TestBed } from '@angular/core/testing';

import { PostsService } from "./posts.service";

describe("PostsService", () => {
  let service: PostsService;
  let httpClientSpy: { get: jasmine.Spy };

  const mockResponse = {
    "postId": 2,
    "id": 6,
    "name": "et fugit eligendi deleniti quidem qui sint nihil autem",
    "email": "Presley.Mueller@myrl.com",
    "body": "doloribus at sed quis culpa deserunt consectetur qui praesentium\naccusamus fugiat dicta"
  };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new PostsService(httpClientSpy as any);
  });

  describe('Tests del Servicio PostService', () => {
    it('Debe existir PostService', () => {
      expect(service).toBeTruthy();
    });

    it('Debe retornar response de getPosts() OK', (done: DoneFn) => {

      httpClientSpy.get.and.returnValue(of(mockResponse))

      service.getPosts().subscribe(res => {
        expect(res).toEqual(mockResponse)
        done()
      })

    })

    it('Debe retornar response de getComments() OK', (done: DoneFn) => {

      httpClientSpy.get.and.returnValue(of(mockResponse))

      service.getComments().subscribe(res => {
        expect(res).toEqual(mockResponse)
        done()
      })

    })

    it('Debe retornar response de getPostsById() OK', (done: DoneFn) => {

      httpClientSpy.get.and.returnValue(of(mockResponse))

      service.getPostById(5).subscribe(res => {
        expect(res).toEqual(mockResponse)
        done()
      })

    })

    it('Debe retornar response de getCommentsByPostId() OK', (done: DoneFn) => {

      httpClientSpy.get.and.returnValue(of(mockResponse))

      service.getCommentsByPostId(2).subscribe(res => {
        expect(res).toEqual(mockResponse)
        done()
      })

    })

    it('Debe retornar error de getCommentsByPostId()', (done: DoneFn) => {

      const id = 'x'
      const errorEvent = new ErrorEvent('API error', { error: new Error('Internal error'), message: 'internal server error' });


      httpClientSpy.get.and.returnValue(throwError(errorEvent))

      service.getCommentsByPostId(id).subscribe(res => {
        
      }, error => {
        console.log(error)
        expect(error).toEqual('Error: internal server error')
        done()
      })

    })


  });
});
