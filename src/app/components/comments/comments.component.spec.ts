import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CommentsComponent } from "./comments.component";

describe("CommentsComponent", () => {
  // let component: CommentsComponent;
  // let fixture: ComponentFixture<CommentsComponent>;
  //let myService: MyService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentsComponent],
      //providers: [{ provide: MyService, useValue: {} }],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    }).compileComponents();
  });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(CommentsComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();

  //   //myService = TestBed.inject(MyService);
  // });

  describe('Tests del Componente AddCommentComponent', () => {
    it('Debe existir CommentsComponent', () => {
      const fixture = TestBed.createComponent(CommentsComponent);
      const app = fixture.componentInstance
      expect(app).toBeTruthy();
    });

    

  });
})