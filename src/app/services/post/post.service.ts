import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AxiosService } from '../../axios.service';
import { LikeRequest, PostRequest, PostResponse } from '../../interfaces/auth';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    private axiosService: AxiosService,
    private userService: UserService
  ) {}

  createNewPost(data: PostRequest): Promise<any> {
    return this.axiosService.request('POST', '/api/posts', data);
  }

  getAllPosts(): Promise<any> {
    return this.axiosService.request('GET', '/api/posts');
  }

  getPostById(postId: string): Promise<any> {
    return this.axiosService.request('GET', `/api/posts/${postId}`);
  }

  isLikedByUser(posts: PostResponse[], postId: string): boolean {
    //let isLiked = false;
    //const currentUserId = this.userService.getId();
    const post = posts.find((post) => post.id === postId);
    if (!post) {
      return false;
    }

    return post.likes.some((like) => like.userId === this.userService.getId());

    /*this.axiosService
      .request('GET', `/api/posts/${postId}`)
      .then((post: PostResponse) => {
        isLiked = post.likes.some((like) => like.userId === currentUserId);
      })
      .catch((error) => {
        console.error('Error checking if liked:', error);
        isLiked = false;
      });*/

    //return isLiked;
  }

  likePost(postId: string): Promise<any> {
    const getUserId = this.userService.getId();
    const data: LikeRequest = {
      userId: getUserId,
      postId: postId,
    };
    return this.axiosService.request('POST', `/api/posts/like`, data);
  }

  unlikePost(postId: string): Promise<any> {
    const getUserId = this.userService.getId();
    const data: LikeRequest = {
      userId: getUserId,
      postId: postId,
    };
    console.log(data);
    return this.axiosService.request('DELETE', `/api/posts/like`, data);
  }
}
