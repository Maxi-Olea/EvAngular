import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CommentsComponent } from "./comments.component";
import { PostsService } from 'src/app/services/posts.service';
import { PostServiceStub } from 'src/app/services/post.service.mock';
import { Observable } from 'rxjs';

describe("CommentsComponent", () => {
  let app: CommentsComponent;
  let fixture: ComponentFixture<CommentsComponent>;
  
  //let myService: MyService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentsComponent],
      providers: [{ provide: PostsService, useClass: PostServiceStub }],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    }).compileComponents();
  });

  let localStore;
  let service: PostsService
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new PostsService(httpClientSpy as any);

    
    var store = {};

    spyOn(localStorage, 'getItem').and.callFake((key:string):string => {
      console.log('vine al local storage mockeado')
     return store[key] || null;
    });
    spyOn(localStorage, 'removeItem').and.callFake((key:string):void =>  {
      delete store[key];
    });
    spyOn(localStorage, 'setItem').and.callFake((key:string, value:string):string =>  {
      console.log('deberia venir aca para guardar')
      return store[key] = <string>value;
    });
    spyOn(localStorage, 'clear').and.callFake(() =>  {
        store = {};
    });
  });

  describe('Tests del Componente CommentComponent', () => {

    beforeEach(() => {
      const fixture = TestBed.createComponent(CommentsComponent);
      const app = fixture.componentInstance;
      app.postId = 1
      fixture.detectChanges();
    

      it('Debe existir CommentsComponent', () => {
        expect(app).toBeFalsy();
      });

      it('Debe llamar a getCommentsBy', () => {
        app.getCommentsByPostId()
        localStorage.setItem('localcomments', '[{"postId":"2","id":505,"name":"maxi","email":"mail@mail.com","body":"mensaje 1","local":"Si"}]')
        expect(app.getCommentsByPostId).toHaveBeenCalled()
      })
      
    });
  });
  

    //myService = TestBed.inject(MyService);
});

