import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {

  addCommentForm: FormGroup;

  @Input() postId: number;

  constructor(private fb: FormBuilder) {
    this.addCommentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      comment: ['', [Validators.required, Validators.maxLength(500)]]
    })
   }

  ngOnInit(): void {
  }

  addComment() {
    console.log(this.addCommentForm);
  }

}
