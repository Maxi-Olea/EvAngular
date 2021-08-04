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
  errorMsg: any
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
    this.getPostById(this.id)

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  //Retorna el objeto del post en base al id
  getPostById(id) {
    this.postService.getPostById(id).subscribe(data => {
      this.postDetails = data
      this.loading = false
    },
    error => {
      this.errorMsg = error
      console.log(this.errorMsg)
      this.router.navigate(['/404'])
    })

  }

}

