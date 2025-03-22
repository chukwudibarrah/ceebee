// /components/auth/AuthModal.tsx

"use client";

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
}

export default function AuthModal({ isOpen, onClose, initialMode = 'signin' }: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (mode === 'signin') {
        await signIn(email, password);
        onClose();
      } else {
        await signUp(name, email, password);
        onClose();
      }
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-md p-6 bg-neutral-950 border border-neutral-800 rounded-xl shadow-xl"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-sienna transition-colors"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>
        
        <h2 className="text-3xl font-bold text-gray-200 mb-6">
          {mode === 'signin' ? 'Sign in' : 'Sign up'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-[5px] text-gray-200 focus:outline-none focus:ring-2 focus:ring-sienna"
                placeholder="Your name"
              />
            </div>
          )}
          
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-[5px] text-gray-200 focus:outline-none focus:ring-2 focus:ring-sienna"
              placeholder="your.email@example.com"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-[5px] text-gray-200 focus:outline-none focus:ring-2 focus:ring-sienna"
              placeholder="••••••••"
            />
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 mt-2 text-white bg-sienna rounded-[5px] hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting 
                ? 'Processing...' 
                : mode === 'signin' ? 'Sign in' : 'Sign up'}
            </button>
          </div>
        </form>
        
        <div className="mt-7">
          <p className="text-sm text-gray-400">
            {mode === 'signin' ? "Your first time here?" : "Been here before?"}
            <button
              type="button"
              onClick={toggleMode}
              className="ml-1 text-sienna hover:underline focus:outline-none"
            >
              {mode === 'signin' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
        
        <div className="pt-4 mt-4 border-t border-neutral-800">
          <p className="text-xs text-gray-400">
            {mode === 'signup' 
              ? 'By creating an account, you agree to the Terms of Service and Privacy Policy.'
              : 'Your comments will be displayed with your name. Be nice!'}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
