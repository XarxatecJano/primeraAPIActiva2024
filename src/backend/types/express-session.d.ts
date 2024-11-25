import 'express-session';

declare module 'express-session' {
  interface Session {
    userName?: string;
    role?: string;
  }
}