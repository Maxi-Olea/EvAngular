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
      this.postService.getComments().subscribe (data => {
        maxId = Math.max(...data.map(x => x.id));  
        res(maxId)                    
      });
     });
   }

  async addComment() {
      if(!localStorage.getItem('localcomments')) {        
        let maxId = <number> await this.getMaxId()
        let comment = {
          'postId': this.postId,
          'id': maxId + 1,
          'name': this.addCommentForm.get('name').value,
          'email': this.addCommentForm.get('email').value,
          'body': this.addCommentForm.get('comment').value,
          'local': 'Si'
        }
        localStorage.setItem('localcomments', `[${ JSON.stringify(comment) }]`);
      } 
      else {
        this.localComments = []; 
        this.localComments = JSON.parse(localStorage.getItem('localcomments'))
        let maxId = Math.max(...this.localComments.map(x => x.id))
        let comment = {
          'postId': this.postId,
          'id': maxId + 1,
          'name': this.addCommentForm.get('name').value,
          'email': this.addCommentForm.get('email').value,
          'body': this.addCommentForm.get('comment').value,
          'local': 'Si'
        }
        this.localComments.push(comment)
        localStorage.setItem('localcomments', JSON.stringify(this.localComments))
        this.localComments = [];
      }
      this.addCommentForm.reset(); 
      this.notifyNewComment();
    }

    notifyNewComment() {
      this.postService.notifyNewComment();
    }

}
