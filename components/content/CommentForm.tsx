// /components/content/CommentForm.tsx

"use client";

import { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useToast } from '@/components/ui/use-toast';

export default function CommentForm({ journalId }: { journalId: string }) {
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session } = useSession();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session) {
      toast({
        title: "Authentication required",
        description: "You need to sign in to leave a comment.",
        variant: "destructive"
      });
      return;
    }
    
    if (!comment.trim()) {
      toast({
        title: "Empty comment",
        description: "Please enter a comment before submitting.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          journalId,
          text: comment,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }
      
      toast({
        title: "Comment submitted",
        description: "Your comment has been submitted and is awaiting approval.",
      });
      
      setComment('');
    } catch (error) {
      console.error('Error submitting comment:', error);
      toast({
        title: "Error",
        description: "Failed to submit your comment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-10 border-t border-neutral-800 pt-10">
      <h3 className="text-2xl font-bold text-gray-200 mb-6">Leave a comment</h3>
      
      {!session ? (
        <div className="text-center p-6 border border-dashed border-neutral-700 rounded-lg">
          <p className="text-gray-300 mb-4">Sign in to leave a comment</p>
          <button
            onClick={() => signIn()}
            className="px-6 py-2 bg-sienna text-white rounded-md hover:bg-opacity-90 transition-colors"
          >
            Sign In
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="comment" className="block text-sm text-gray-400 mb-2">
              Comment as {session.user?.name}
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-3 bg-neutral-900 border border-neutral-700 rounded-md text-gray-200 focus:ring-2 focus:ring-sienna focus:border-transparent resize-none min-h-32"
              placeholder="Write your comment here..."
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-sienna text-white rounded-md hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Comment'}
            </button>
          </div>
          <p className="text-sm text-gray-400">
            Note: Comments are moderated and will appear after approval.
          </p>
        </form>
      )}
    </div>
  );
}
