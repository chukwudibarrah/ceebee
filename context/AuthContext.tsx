// /context/AuthContext.tsx

"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/components/ui/use-toast';

// Define the user type
export type User = {
  id: string;
  name: string;
  email: string;
  image?: string;
};

// Define the auth context type
type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
};

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider props
type AuthProviderProps = {
  children: ReactNode;
};

// Simple user database in localStorage
const USER_STORAGE_KEY = 'journal_users';

// Auth provider component
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { toast } = useToast();

  // Check for stored user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('journal_current_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('journal_current_user');
      }
    }
    setLoading(false);
  }, []);

  // Helper to get users from localStorage
  const getUsers = (): Record<string, User> => {
    const storedUsers = localStorage.getItem(USER_STORAGE_KEY);
    return storedUsers ? JSON.parse(storedUsers) : {};
  };

  // Helper to save users to localStorage
  const saveUsers = (users: Record<string, User>) => {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users));
  };

  // Sign in function
  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // Simple front-end only auth - get users from localStorage
      const users = getUsers();
      
      // Check if user exists and password matches
      // WARNING: This is NOT secure and only for demo purposes
      const userEntry = Object.values(users).find(u => u.email === email);
      
      // For demo purposes, create a new user if the email doesn't exist
      if (!userEntry) {
        // Create a new user with this email
        const newUser: User = {
          id: `user_${Date.now()}`,
          name: email.split('@')[0], // Simple name generation from email
          email
        };
        
        // Add to users storage
        users[newUser.id] = newUser;
        saveUsers(users);
        
        // Set as current user
        setUser(newUser);
        localStorage.setItem('journal_current_user', JSON.stringify(newUser));
        setIsAuthenticated(true);
        
        toast({
          title: "Account created automatically",
          description: `Welcome, ${newUser.name}!`,
        });
        return;
      }
      
      // Store current user
      setUser(userEntry);
      localStorage.setItem('journal_current_user', JSON.stringify(userEntry));
      setIsAuthenticated(true);
      
      toast({
        title: "Signed in successfully",
        description: `Welcome back, ${userEntry.name}!`,
      });
    } catch (error) {
      console.error('Sign in error:', error);
      toast({
        variant: "destructive",
        title: "Sign in failed",
        description: error instanceof Error ? error.message : "Something went wrong",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign up function
  const signUp = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      
      // Get existing users
      const users = getUsers();
      
      // Check if email already exists
      if (Object.values(users).some(u => u.email === email)) {
        throw new Error('User with this email already exists');
      }
      
      // Create new user (with a simple ID generation)
      const newUser: User = {
        id: `user_${Date.now()}`,
        name,
        email,
        // In a real app, you'd hash the password and store it
        // We're not storing passwords in this simplified version
      };
      
      // Add to users storage
      users[newUser.id] = newUser;
      saveUsers(users);
      
      // Set as current user
      setUser(newUser);
      localStorage.setItem('journal_current_user', JSON.stringify(newUser));
      setIsAuthenticated(true);
      
      // Log for debugging
      console.log("User created successfully:", newUser);
      
      toast({
        title: "Account created",
        description: `Welcome, ${newUser.name}!`,
      });
    } catch (error) {
      console.error('Sign up error:', error);
      toast({
        variant: "destructive",
        title: "Sign up failed",
        description: error instanceof Error ? error.message : "Something went wrong",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      setLoading(true);
      
      // Clear current user
      localStorage.removeItem('journal_current_user');
      setUser(null);
      setIsAuthenticated(false);
      
      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      });
    } catch (error) {
      console.error('Sign out error:', error);
      toast({
        variant: "destructive",
        title: "Sign out failed",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for using auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
