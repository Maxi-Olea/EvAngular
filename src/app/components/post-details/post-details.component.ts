import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';


@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit, OnDestroy {

  id: any;
  posts: any[];
  postDetails: any;
  loading = false
  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostsService
  ) { }

  ngOnInit(): void {
    this.loading = true
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getposts()

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getposts() {
    this.postService.getPosts().subscribe(data => {
      this.posts = data
      this.postDetails = this.getPostById(this.id)
      this.loading = false
    })
  }

  //Retorna el objeto del post en base al id
  getPostById(id) {
    const post = this.posts.filter(post => post.id == id) [0] || {}
    if (Object.keys(post).length) {
      return post
    } else{
      this.router.navigate(['/404'])
    }
  }

}

