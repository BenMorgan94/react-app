export interface user {
  username: string;
  email: string;
  password: string;
}

export interface SignUpProps {
  name?: any;
  value?: any;
}
export interface SignUpState {
  pageDirection?: string;
  user: user;
  errors: {
    username: string;
    email: string;
    password: string;
  };
}
