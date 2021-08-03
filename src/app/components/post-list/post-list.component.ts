import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  loading = false
  posts:any[];

  constructor(
    private postService: PostsService
  ) { }

  ngOnInit(): void {
    this.loading = true
    console.log(this.loading)
    this.getPosts()
  }

  getPosts() {
    this.postService.getPosts().subscribe(data => {
      console.log('data - ',data)
      this.posts = data
      this.loading = false
      console.log(this.loading)
    })

  }
}
