export interface User {
    _id: string;
    userName: string;
    email: string;
}

export interface TaskType {
  id: string;
  description: string;
}

export interface AuthResponse {
  body: {
    user: User;
    token: string;
    refreshToken: string;
  };
}

export interface AuthResponseError {
    body: {
        error: string;
    };
}

export interface AccessTokenResponse {
  statusCode: number;
  body: {
    accessToken: string;
  };
  error?: string;

}