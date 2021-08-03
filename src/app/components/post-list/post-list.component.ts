import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts:any[];

  constructor(
    private postService: PostsService
  ) { }

  ngOnInit(): void {
    this.getPosts()
  }

  getPosts() {
    this.postService.getPosts().subscribe(data => {
      console.log('data - ',data)
      this.posts = data
    })

  }
}
