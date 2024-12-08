"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { clearUser } from "@/redux/slice";
import { AuthContextType } from "@/types/auth";

const AuthContext = createContext<AuthContextType>({
  user: null,
  error: "",
  loading: true,
  verificationMessage: "",
  loginMessage: "",
});

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState<string>("");
  const [verificationMessage, setVerificationMessage] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const router = useRouter();
  const url = "http://localhost:8080/";
  const [isNewCredentials, setIsNewCredentials] = useState(false);
  const dispatch = useDispatch();
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const registration = async (email: string, password: string) => {
    const response = await fetch(url + "registration", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    if (!response.ok) {
      setError(await response.text());
    } else {
      toast("Check your email for verification");
    }
  };

  const login = async (email: string, password: string) => {
    const response = await fetch(url + "login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    if (response.ok) {
      const userData = await response.json();
      setUser(userData);
      setLoginMessage("");
      localStorage.setItem("user", JSON.stringify(userData));
      toast("You`ve logged in");
      // setTimeout(() => {
      router.push("/profile");
      // }, 1000);
    } else {
      setLoginMessage("Invalid credentials. Please try again");
    }
  };

  const verification = async (token: string) => {
    const response = await fetch(url + "verification?token=" + token);
    if (response.ok) {
      const userData = await response.json();
      setUser(userData);
      setVerificationMessage("Email has been successfully verified");
      localStorage.setItem("user", JSON.stringify(userData));
      if (isNewCredentials) {
        toast("Credentials were updated successfully");
      } else {
        toast("You`re registered");
      }
      setIsNewCredentials(false);
      setTimeout(() => {
        router.push("/profile");
      }, 3000);
    } else {
      setVerificationMessage("Verification failed");
    }
  };

  const updateUserDetails = async (
    oldemail: string,
    newemail: string,
    password: string
  ) => {
    setIsNewCredentials(true);
    const response = await fetch("http://localhost:8080/newcredentials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        oldEmail: oldemail,
        newEmail: newemail,
        newPassword: password,
      }),
    });

    if (response.ok) {
      toast("Check your email for verification");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    dispatch(clearUser());
    router.push("/profile");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        registration,
        verification,
        verificationMessage,
        login,
        loginMessage,
        logout,
        updateUserDetails,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
