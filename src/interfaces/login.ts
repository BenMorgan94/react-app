export interface user {
    email: string;
    password: string;
  }
  
  export interface LoginProps {
    name?: any;
    value?: any;
  }
  export interface LoginState {
    user: user;
    errors: {
      email: string;
      password: string;
    };
  }
  