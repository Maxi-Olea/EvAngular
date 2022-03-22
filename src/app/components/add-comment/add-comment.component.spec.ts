import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from "@angular/core/testing";
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCommentComponent } from "./add-comment.component";
import { PostsService } from 'src/app/services/posts.service';
import { PostServiceStub } from 'src/app/services/post.service.mock';

describe("AddCommentComponent", () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCommentComponent],
      providers: [{ provide: PostsService, useClass: PostServiceStub }],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule
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
     return store[key] || null;
    });
    spyOn(localStorage, 'removeItem').and.callFake((key:string):void =>  {
      delete store[key];
    });
    spyOn(localStorage, 'setItem').and.callFake((key:string, value:string):string =>  {
      return store[key] = <string>value;
    });
    spyOn(localStorage, 'clear').and.callFake(() =>  {
        store = {};
    });
  });


  describe('Tests del Componente AddCommentComponent', () => {
    it('Debe existir AddCoomentComponent', () => {
      const fixture = TestBed.createComponent(AddCommentComponent);
      const app = fixture.componentInstance
      expect(app).toBeTruthy();
    });

    it('Debe retornar formulario invalido - campo nombre vacio', () => {
      const fixture = TestBed.createComponent(AddCommentComponent);
      const app = fixture.componentInstance
      fixture.detectChanges()
  
      const email = app.addCommentForm.controls['email']
      const comment = app.addCommentForm.controls['comment']
      email.setValue('mail123@gmail.com')
      comment.setValue('Mensaje de prueba  del test')
  
      expect(app.addCommentForm.invalid).toBeTrue();
    });
    
    it('Debe retornar formulario invalido - campo email formato incorrecto', () => {
      const fixture = TestBed.createComponent(AddCommentComponent);
      const app = fixture.componentInstance
      fixture.detectChanges()
  
      const name = app.addCommentForm.controls['name']
      const email = app.addCommentForm.controls['email']
      const comment = app.addCommentForm.controls['comment']
      name.setValue('Maxi')
      email.setValue('mail123gmail.com')
      comment.setValue('Mensaje de prueba  del test')
  
      expect(app.addCommentForm.invalid).toBeTrue();
    });

    it('Debe retornar formulario invalido - Comentario supera los 500 caracteres', () => {
      const fixture = TestBed.createComponent(AddCommentComponent);
      const app = fixture.componentInstance
      fixture.detectChanges()
  
      const name = app.addCommentForm.controls['name']
      const email = app.addCommentForm.controls['email']
      const comment = app.addCommentForm.controls['comment']
      name.setValue('Maxi')
      email.setValue('mail123gmail.com')
      //Lorem ipsum 501 caracteres
      comment.setValue('Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis, eius? Error aspernatur tempore itaque asperiores laborum molestias repellat dicta. Suscipit deleniti laboriosam dolores odit porro facere expedita ut, ipsa eaque ex sed, ipsam itaque nostrum aliquid! Quod iste aperiam facilis placeat odio voluptates doloremque sapiente. Similique sunt excepturi voluptatibus perferendis animi veritatis! Laborum iure sed nisi repellendus amet reiciendis aliquam autem assumenda, eius distinctio in! Assumenda cum sapiente labore id esse, dicta optio nemo quos necessitatibus quaerat non aperiam tempore. Explicabo quisquam, earum beatae fugit ullam quaerat possimus facere laudantium, unde cum, sapiente accusantium. Possimus nemo quia tempora veniam fuga rerum, quidem minima totam expedita veritatis optio perferendis sapiente iste dolorem aliquid inventore vel eum vitae, excepturi dicta qui iure nam quo eveniet. Alias, rem. Ipsam numquam dolore iste! Cupiditate, quo non? Aliquid, praesentium veniam aspernatur tempora iusto reiciendis fugiat officia quae fugit molestiae laborum ullam provident nemo doloribus repellendus, exercitationem perferendis asperiores sequi quia! Repellendus voluptatum sint facilis fugiat, placeat autem vitae est, nulla aliquam omnis blanditiis. Ducimus, earum commodi sed itaque nisi aut eos vitae? Optio, eum nobis consequatur adipisci maxime sequi enim maiores commodi et, sint molestias velit, accusantium quos dolore dolores a magni? Ex, nesciunt sit vero doloribus sequi autem nisi aperiam, asperiores debitis laborum voluptatem, voluptatibus eos neque molestiae! Totam at optio odio molestias, quas dolor minus cumque ipsam aperiam perspiciatis repudiandae dolores aut accusantium similique suscipit veritatis vel, eveniet illum. Hic quae earum aperiam magnam autem tenetur at reprehenderit totam perferendis! Impedit optio doloremque dicta, officiis dolorem eveniet accusantium quidem possimus id ea delectus at molestias iusto repellat deleniti, sapiente perspiciatis distinctio! Velit amet inventore vitae quod veritatis facere eveniet quaerat magni recusandae alias hic temporibus perferendis a culpa numquam iure id sunt vel dolore nostrum, in voluptatibus! Vel nobis minus quo incidunt alias a adipisci. Eligendi, illo ipsam commodi veniam sunt iusto! Ea consectetur saepe repudiandae beatae quaerat autem illo cum, suscipit explicabo dolor minima facere itaque placeat nobis repellendus animi facilis fuga vel praesentium blanditiis unde inventore possimus! Maxime, repellat. Ipsam ex iusto iure neque reprehenderit enim labore, incidunt impedit dolores nostrum qui maiores iste consectetur debitis nobis ducimus cupiditate a dolor earum corporis. Non cupiditate eius eum esse placeat quam voluptatibus. Ullam, pariatur voluptatem perspiciatis doloremque, error reprehenderit saepe aperiam id mollitia rerum quisquam amet quas qui esse ipsum facilis? Fugit ad, est laudantium necessitatibus harum ipsum quisquam quod quia cumque praesentium accusantium doloremque ex labore, quaerat aliquid sit sequi eveniet nesciunt illo? Doloribus, sed quis nostrum ullam vitae obcaecati dolores nemo beatae ab, consectetur at perspiciatis nihil quidem tenetur cupiditate itaque hic iure expedita facere sapiente praesentium eum! Reiciendis quisquam id deserunt officiis itaque alias, voluptate facere. Repellendus vel inventore omnis, libero unde vero assumenda perspiciatis eligendi nisi expedita architecto modi quisquam, qui pariatur ipsam nesciunt aliquam tenetur dicta eum amet saepe maiores. Repellendus fuga error ullam repudiandae magni obcaecati molestiae consequatur dolor officiis quisquam officia praesentium provident laborum repellat possimus, iure perferendis expedita tempore, illum omnis libero? Et, eius voluptatum!')
  
      expect(app.addCommentForm.invalid).toBeTrue();
    });

    it('Debe retornar formulario Valido', () => {
      const fixture = TestBed.createComponent(AddCommentComponent);
      const app = fixture.componentInstance
      fixture.detectChanges()
  
      const name = app.addCommentForm.controls['name']
      const email = app.addCommentForm.controls['email']
      const comment = app.addCommentForm.controls['comment']
      name.setValue('Maxi')
      email.setValue('mail123@gmail.com')
      comment.setValue('Mensaje de Prueba válido para el test')
  
      expect(app.addCommentForm.invalid).toBeFalse();
    });

    it(`Debe llamar la funcion addComment onSubmit`, () => {
      const fixture = TestBed.createComponent(AddCommentComponent);
      const app = fixture.componentInstance;
      fixture.detectChanges()

      let name = app.addCommentForm.controls['name']
      let email = app.addCommentForm.controls['email']
      let comment = app.addCommentForm.controls['comment']
      name.setValue('Maxi')
      email.setValue('mail123@gmail.com')
      comment.setValue('Mensaje de prueba')

      spyOn(app, 'addComment')
      const btnElement = fixture.debugElement.query(By.css('button.btn'))
      btnElement.nativeElement.click()
      expect(app.addComment).toHaveBeenCalledTimes(0)
  });

  it(`Debe guardar el 1er comentario (rama if)`, () => {
    const fixture = TestBed.createComponent(AddCommentComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges()
 
    let name = app.addCommentForm.controls['name']
    let email = app.addCommentForm.controls['email']
    let comment = app.addCommentForm.controls['comment']
    name.setValue('Maxi')
    email.setValue('mail123@gmail.com')
    comment.setValue('Mensaje de prueba')

    app.addComment();
    expect(localStorage.getItem('localcomments')).toBeDefined()
  });

  it(`Debe guardar el 2do comentario (rama else)`, () => {
    const fixture = TestBed.createComponent(AddCommentComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges()

    localStorage.setItem('localcomments', '[{"postId":"2","id":505,"name":"maxi","email":"mail@mail.com","body":"mensaje 1","local":"Si"}]')
 
    let name = app.addCommentForm.controls['name']
    let email = app.addCommentForm.controls['email']
    let comment = app.addCommentForm.controls['comment']
    name.setValue('Maxi')
    email.setValue('mail123@gmail.com')
    comment.setValue('Mensaje 2')

    let expectedResult = '[{"postId":"2","id":505,"name":"maxi","email":"mail@mail.com","body":"mensaje 1","local":"Si"},{"id":506,"name":"Maxi","email":"mail123@gmail.com","body":"Mensaje 2","local":"Si"}]'

    app.addComment();
    expect(localStorage.getItem('localcomments')).toEqual(expectedResult)
  });

  it('Debe retornar el maxId', (done: DoneFn) => {
    const fixture = TestBed.createComponent(AddCommentComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges()
    app.getMaxId().then((res) => {
      expect(res).toEqual(506) // dato que vuelve del servicio mockeado
      done()
    })
  })


  });

    // it.todo('should ...');
  });


