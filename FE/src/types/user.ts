// user.ts
export interface User {
  _id: string;
  username: string;
  email: string;
  avatarImage: string;
  phone?: string;
}

export interface UserResponse {
  success: boolean;
  message: string;
  data: User; // thêm data vào đây
}
