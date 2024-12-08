import { User } from "./user";

export interface AuthContextType {
  user: User | null;
  error: string;
  loading: boolean;
  registration?: (email: string, password: string) => Promise<void>;
  verification?: (token: string) => Promise<void>;
  updateUserDetails?: (
    oldemail: string,
    newemail: string,
    password: string
  ) => Promise<void>;
  verificationMessage: string;
  login?: (email: string, password: string) => Promise<void>;
  loginMessage: string;
  logout?: () => void;
}
