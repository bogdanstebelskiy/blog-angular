import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatChipEditedEvent,
  MatChipInputEvent,
  MatChipsModule,
} from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgFor, NgForOf } from '@angular/common';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { PostService } from '../../services/post/post.service';
import { PostRequest } from '../../interfaces/auth';
import { UserService } from '../../services/user/user.service';

export interface Tag {
  name: string;
}

@Component({
  selector: 'app-create-post',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatChipsModule,
  ],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePostComponent {
  postForm!: FormGroup;
  readonly addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  readonly tags = signal<Tag[]>([{ name: 'Java' }, { name: 'Spring' }]);
  readonly announcer = inject(LiveAnnouncer);

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.postForm = this.fb.group({
      title: [null, Validators.required],
      content: [null, [Validators.required, Validators.maxLength(5000)]],
      //img: [null, Validators.required],
      //postedBy: [null, Validators.required],
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.tags.update((tags) => [...tags, { name: value }]);
    }

    event.chipInput!.clear();
  }

  remove(tag: Tag): void {
    this.tags.update((tags) => {
      const index = tags.indexOf(tag);
      if (index < 0) {
        return tags;
      }

      tags.splice(index, 1);
      this.announcer.announce(`Removed ${tag.name}`);
      return [...tags];
    });
  }

  edit(tag: Tag, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.remove(tag);
      return;
    }

    this.tags.update((tags) => {
      const index = tags.indexOf(tag);
      if (index >= 0) {
        tags[index].name = value;
        return [...tags];
      }
      return tags;
    });
  }

  async createNewPost() {
    const data: PostRequest = {
      title: this.postForm.controls['title'].value,
      content: this.postForm.controls['content'].value,
      authorId: this.userService.getId(),
      categoryName: 'Technology',
      tagNames: this.tags().map((tag) => tag.name),
    };

    console.log(data);

    try {
      await this.postService.createNewPost(data);
      this.snackBar.open('Created!', 'Ok');
    } catch (error) {
      console.error(error);
      this.snackBar.open('Something went wrong!!!', 'Ok');
    }
  }
}
