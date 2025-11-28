// User Entity Types

export interface User {
  id: number;
  name: string;
  email: string;
  roles: string;
}

// DTOs for User operations
export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  roles: string;
}

export interface UpdateUserDTO {
  name?: string;
  email?: string;
  roles?: string;
}

export interface UserResponse {
  id: number;
  name: string;
  email: string;
  roles: string;
}
