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
  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostsService
  ) { }

  ngOnInit(): void {
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
      console.log('data - ',data)
      this.posts = data
      this.postDetails = this.getPostById(this.id)

    })
  }

  //Retorna el objeto del post en base al id
  getPostById(id) {
    console.log('Id: ', id)
    console.log('posts: ', this.posts)
    const post = this.posts.filter(post => post.id == id) [0] || {}
    console.log(Object.keys(post).length)
    console.log('post', post)
    if (Object.keys(post).length) {
      return post
    } else{
      this.router.navigate(['/404'])
    }
  }

}

