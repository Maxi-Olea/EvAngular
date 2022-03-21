import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {

  localComments: any[];

  addCommentForm: FormGroup;

  @Input() postId: number;

  constructor(
    private fb: FormBuilder,
    private postService: PostsService
    ) {
    this.addCommentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      comment: ['', [Validators.required, Validators.maxLength(500)]]
    })
   }

  ngOnInit(): void { }


   getMaxId() {
     return new Promise((res,rej) => {
      let maxId = 0
      console.log('Entre por aca pq no hay variable local')
      this.postService.getComments().subscribe (data => {
        maxId = Math.max(...data.map(x => x.id));  
        res(maxId)                    
      });
     });
   }

  async addComment() {
      if(!localStorage.getItem('localcomments')) {
        console.log('no existe vble localStorage, la creamos')
        let maxId = <number> await this.getMaxId()
        console.log('maxId: ', maxId)
        let comment = {
          'postId': this.postId,
          'id': maxId + 1,
          'name': this.addCommentForm.get('name').value,
          'email': this.addCommentForm.get('email').value,
          'body': this.addCommentForm.get('comment').value,
          'local': 'Si'
        }
        console.log(comment);
        localStorage.setItem('localcomments', `[${ JSON.stringify(comment) }]`);
      } 
      else {
        console.log('la vble local ya existe')
        this.localComments = [];
        console.log('localComments: ', this.localComments) 
        this.localComments = JSON.parse(localStorage.getItem('localcomments'))
        console.log('comentarios antes de agregar el nuevo', this.localComments)
        let maxId = Math.max(...this.localComments.map(x => x.id))
        console.log('maxid local: ', maxId)
        let comment = {
          'postId': this.postId,
          'id': maxId + 1,
          'name': this.addCommentForm.get('name').value,
          'email': this.addCommentForm.get('email').value,
          'body': this.addCommentForm.get('comment').value,
          'local': 'Si'
        }
        console.log(comment)
        this.localComments.push(comment)
        console.log('locomments con el ultimo mensaje agregado', this.localComments)
        localStorage.setItem('localcomments', JSON.stringify(this.localComments))
        this.localComments = [];
        console.log(this.localComments)
      }
      this.addCommentForm.reset(); 
      this.notifyNewComment();
    }

    notifyNewComment() {
      this.postService.notifyNewComment();
    }

}
