import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';




@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit, OnDestroy {

  loading = false;
  serverComments: any[];
  localComments: any[];
  localCommentsById: any[];
  comments:any[];
  errorMsg;

  @Input() postId: number;

  @Output() sendTime: EventEmitter<number> = new EventEmitter<number>();

  dateTime: number = Date.now();

  newCommentSubscriber: Subscription = this.postService.newCommentNotifier.subscribe(() => {
    this.ngOnInit();
  })

  constructor(
    private postService : PostsService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.loading = true
    this.getCommentsByPostId()    
  }


  getCommentsByPostId() {
    //from the api
    this.postService.getCommentsByPostId(this.postId).subscribe(data => {
      this.serverComments = data
      //from localStorage
      if(localStorage.getItem('localcomments')) {
        this.localComments = JSON.parse(localStorage.getItem('localcomments'))
        console.log('local comments: ', this.localComments)
        this.localCommentsById = this.localComments.filter((element) => {
          return element.postId == this.postId;
        })
        console.log('commentsByPostId: ', this.localCommentsById)      
      }
      //comments api + local
      if(this.localCommentsById){
        this.comments = this.serverComments.concat(this.localCommentsById)
      } else {
        this.comments = this.serverComments
      }
      this.loading = false
    },
    error => {
      this.errorMsg = error
      console.log(this.errorMsg)
      this.router.navigate(['/404'])
    })
  }

  deleteCommentById(id) {
    console.log('id recibido: ', id)
    console.log('Comentarios locales antes del delete: ', this.localComments)
    let comments = this.localComments.filter((comment) => {
      return (comment.id !== id)
    })
    console.log('Comentarios despues del delete: ', comments)
    this.localComments = comments
    localStorage.setItem('localcomments', JSON.stringify(this.localComments))
    this.ngOnInit()
  }

  emitTime() {
    this.sendTime.emit(this.dateTime)
  }

  ngOnDestroy(): void {
    this.newCommentSubscriber.unsubscribe();
  }

}
