import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  loading = false;
  comments:any[];
  errorMsg;

  @Input() postId: number;


  constructor(
    private postService : PostsService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.loading = true
    this.getCommentsByPostId()
  }

  getCommentsByPostId() {
    this.postService.getCommentsByPostId(this.postId).subscribe(data => {
      this.comments = data
      this.loading = false
    },
    error => {
      this.errorMsg = error
      console.log(this.errorMsg)
      this.router.navigate(['/404'])
    })
  }

}
