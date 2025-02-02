export interface RoleResponse {
  id: String;
  name: String;
}

export interface RoleRequest {
  name: String;
}

export interface UserResponse {
  id: string;
  username: string;
  email: string;
  avatarUrl: string;
  roles: RoleResponse[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserRequest {
  username: string;
  email: string;
  avatarUrl: string;
  roleNames: string[];
  passwordHash: string;
}

export interface LoginRequest {
  username: string;
  passwordHash: string;
}

export interface LoginResponse {
  jwtToken: string;
}

export interface CommentResponse {
  id: string;
  postId: string;
  authorId: string;
  authorUsername: string;
  parentCommentId: string;
  replies: CommentResponse[];
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryResponse {
  id: string;
  name: string;
}

export interface TagResponse {
  id: string;
  name: string;
}

export interface LikeRequest {
  userId: string;
  postId: string;
}

export interface LikeResponse {
  id: string;
  userId: string;
  postId: string;
  createdAt: Date;
}

export interface PostResponse {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorUsername: string;
  category: CategoryResponse;
  tags: TagResponse[];
  comments: CommentResponse[];
  viewsCount: number;
  likes: LikeResponse[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PostRequest {
  title: string;
  content: string;
  authorId: string;
  categoryName: string;
  tagNames: string[];
}
