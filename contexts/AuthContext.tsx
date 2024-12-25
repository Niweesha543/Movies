import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
  name: string;
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => boolean; // Returns a boolean indicating success
  signUp: (name: string, email: string, password: string) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [registeredUsers, setRegisteredUsers] = useState<User[]>([]); // Simulating a user database

  const signIn = (email: string, password: string): boolean => {
    // Check if the user exists in the registered users list
    const existingUser = registeredUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (existingUser) {
      setUser(existingUser);
      console.log("Sign-in successful");
      return true;
    } else {
      console.error("Invalid email or password");
      alert("Invalid email or password");
      return false;
    }
  };

  const signUp = (name: string, email: string, password: string) => {
    // Check if the email is already registered
    const emailExists = registeredUsers.some((u) => u.email === email);

    if (emailExists) {
      alert("Email is already registered");
      return;
    }

    const newUser: User = { name, email, password };
    setRegisteredUsers((prevUsers) => [...prevUsers, newUser]); // Add the user to the registered users list
    console.log("Sign-up successful:", newUser);
    alert("Sign-up successful. Please sign in.");
  };

  const signOut = () => {
    setUser(null);
    console.log("User signed out");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};