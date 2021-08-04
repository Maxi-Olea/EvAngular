import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  loading = false;
  posts:any[];
  errorMsg;


  constructor(
    private postService: PostsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loading = true
    this.getPosts()
  }

  getPosts() {
    this.postService.getPosts().subscribe(data => {
      this.posts = data
      this.loading = false
    },
    error => {
      this.errorMsg = error
      console.log(this.errorMsg)
      this.router.navigate(['/404'])
    })

  }
}
