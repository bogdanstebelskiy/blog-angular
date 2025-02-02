import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostService } from '../../services/post/post.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../services/user/user.service';
import { AxiosService } from '../../axios.service';
import { PostResponse } from '../../interfaces/auth';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-view-all-posts',
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    RouterModule,
  ],
  templateUrl: './view-all-posts.component.html',
  styleUrl: './view-all-posts.component.scss',
})
export class ViewAllPostsComponent {
  allPosts: PostResponse[] = [];

  constructor(
    private postService: PostService,
    private axiosService: AxiosService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllPosts();
  }

  async getAllPosts() {
    try {
      const res = await this.postService.getAllPosts();
      this.allPosts = res.data;
      console.log(this.allPosts);
    } catch (error) {
      this.snackBar.open('Something went wrong!!!', 'Ok');
      console.error(error);
    }
  }

  likePost(postId: string) {
    if (!this.axiosService.isAuthenticated()) {
      this.router.navigate(['login']);
      return;
    }

    if (!this.isLiked(postId)) {
      console.log('Liking post');
      this.postService.likePost(postId);
    }

    if (this.isLiked(postId)) {
      console.log('Unliking post');
      this.postService.unlikePost(postId);
    }
  }

  isLiked(postId: string) {
    return this.postService.isLikedByUser(this.allPosts, postId);
  }
}
