export type User = {
  _id: string;
  username?: string;
  passwordHash?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  mobile?: string;
  roles?: Role[];
};

export enum Role {
  admin = "ADMIN",
  user = "USER",
  guest = "GUEST",
}

export type LoginResponse = {
  access: {
    token: string;
    expiresInMinutes: number;
  };
  refresh: {
    token: string;
    expiresInMinutes: number;
  };
  user: User;
};

export type ApiResponse<T> = {
  content: T;
  errors: string[];
  status: string;
};
