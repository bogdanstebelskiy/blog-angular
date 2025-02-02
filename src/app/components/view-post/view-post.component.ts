import { Component } from '@angular/core';
import { PostResponse } from '../../interfaces/auth';
import { PostService } from '../../services/post/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-view-post',
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    RouterModule,
  ],
  templateUrl: './view-post.component.html',
  styleUrl: './view-post.component.scss',
})
export class ViewPostComponent {
  postId!: string;
  postData!: PostResponse;

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private matSnackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.postId = this.activatedRoute.snapshot.params['id'];
    this.getPostById();
  }

  async getPostById() {
    try {
      this.postData = (await this.postService.getPostById(this.postId)).data;
      console.log(this.postData);
    } catch (error) {
      console.error(error);
      this.matSnackBar.open('Something went wrong!', 'OK');
    }
  }
}
