import { of } from 'rxjs';

export class PostServiceStub {
    getCommentsByPostId() {
        return of (
            [
                {"postId":"1","id":505,"name":"maxi","email":"mail@mail.com","body":"mensaje 1"},
                {"postId":"1","id":506,"name":"maxi","email":"mail@mail.com","body":"mensaje 2"}
            ]
        )
    }

    getComments() {
        return of (
            [
                {"postId":"2","id":505,"name":"maxi","email":"mail@mail.com","body":"mensaje 1","local":"Si"},
                {"postId":"1","id":506,"name":"maxi","email":"mail@mail.com","body":"mensaje 2","local":"Si"}
            ]
        )
    }

    notifyNewComment() {}
}