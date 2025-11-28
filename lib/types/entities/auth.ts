// Authentication Types

export interface LoginDTO {
  email: string;
  password: string;
}

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
  roles: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  roles: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

export interface RefreshTokenResponse {
  token: string;
}
