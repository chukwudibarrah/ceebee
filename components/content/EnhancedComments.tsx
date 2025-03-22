// /components/content/EnhancedComments.tsx

"use client";

import { useState, useEffect, useCallback } from "react";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@/context/AuthContext";
import AuthModal from "@/components/auth/AuthModal";
import { useToast } from "@/components/ui/use-toast";
import { MessageSquare, ThumbsUp, Flag, Reply } from "lucide-react";

type Comment = {
  _id: string;
  name: string;
  text: string;
  createdAt: string;
  userId?: string;
  likes?: number;
};

export default function EnhancedComments({ journalId }: { journalId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");

  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();

  // Define fetchComments first, before it's used in useEffect
  const fetchComments = useCallback(async () => {
    try {
      setLoading(true);
      console.log("Fetching comments for journal:", journalId);

      const response = await fetch(`/api/comments?journalId=${journalId}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched comments:", data);
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load comments. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }, [journalId, toast]);

  // Now use fetchComments in useEffect
  useEffect(() => {
    fetchComments();
  }, [journalId, isAuthenticated, fetchComments]);

  // Format date
  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (e) {
      return "some time ago";
    }
  };

  // Handle comment submission
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated || !user) {
      setShowAuthModal(true);
      setAuthMode("signin");
      return;
    }

    if (!newComment.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Comment cannot be empty.",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      console.log("Submitting comment:", {
        journalId,
        text: newComment,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });

      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          journalId,
          text: newComment,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        }),
      });

      const responseData = await response.json();
      console.log("Comment submission response:", responseData);

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to submit comment");
      }

      // Reset form
      setNewComment("");

      // Show success message
      toast({
        title: "Comment submitted",
        description: "Your comment was successfully submitted.",
      });

      // Refresh comments to show the new one
      fetchComments();
    } catch (error) {
      console.error("Error submitting comment:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit your comment. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle the like action
  const handleLikeComment = async (commentId: string) => {
    if (!isAuthenticated || !user) {
      setShowAuthModal(true);
      setAuthMode("signin");
      return;
    }

    try {
      // Call the like API endpoint
      const response = await fetch("/api/comments/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ commentId }),
      });

      if (!response.ok) {
        throw new Error("Failed to like comment");
      }

      const data = await response.json();

      // Update the comments locally with the returned likes count
      const updatedComments = comments.map((comment) => {
        if (comment._id === commentId) {
          return {
            ...comment,
            likes: data.likes,
          };
        }
        return comment;
      });

      setComments(updatedComments);

      toast({
        title: "Comment liked",
        description: "Thanks for your feedback!",
      });
    } catch (error) {
      console.error("Error liking comment:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to like the comment. Please try again.",
      });
    }
  };

  // Handle the report action
  const handleReportComment = async (commentId: string) => {
    if (!isAuthenticated || !user) {
      setShowAuthModal(true);
      setAuthMode("signin");
      return;
    }

    toast({
      title: "Comment reported",
      description:
        "Thank you for reporting this comment. We'll review it ASAP.",
    });
  };

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-200">
          Discussion {comments.length > 0 && `(${comments.length})`}
        </h3>
      </div>

      {/* Comment form */}
      <div className="mb-10 border border-neutral-800 rounded-[5px] p-4">
        <h4 className="text-xl font-semibold text-gray-200 mb-4">
          Leave a comment
        </h4>
        {isAuthenticated && user ? (
          <form onSubmit={handleSubmitComment} className="space-y-4">
            <div>
              <label
                htmlFor="comment"
                className="block text-sm text-gray-400 mb-2"
              >
                Commenting as {user.name}
              </label>
              <textarea
                id="comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full p-3 bg-neutral-900 border border-neutral-700 rounded-[5px] text-gray-200 focus:ring-2 focus:ring-sienna focus:border-transparent resize-none min-h-32"
                placeholder="Share your thoughts..."
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-sienna text-gray-200 rounded-[5px] hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Add comment"}
              </button>
            </div>
            <p className="text-sm text-gray-400">
              Your comment will be displayed with your name. Comments are
              moderated and will appear after approval.
            </p>
          </form>
        ) : (
          <div className="text-center p-6 border border-dashed border-neutral-700 rounded-[5px]">
            <p className="text-gray-300 mb-4">
              Sign in to join the conversation
            </p>
            <div className="space-x-4">
              <button
                onClick={() => {
                  setAuthMode("signin");
                  setShowAuthModal(true);
                }}
                className="px-6 py-2 bg-sienna text-white rounded-[5px] hover:bg-opacity-90 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setAuthMode("signup");
                  setShowAuthModal(true);
                }}
                className="px-6 py-2 bg-neutral-800 text-gray-200 rounded-[5px] hover:bg-neutral-700 transition-colors"
              >
                Create account
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Comments list */}
      {loading ? (
        <div className="text-gray-400 mt-4">Loading comments...</div>
      ) : comments.length === 0 ? (
        <div className="text-gray-400 mt-4 p-6 border border-dashed border-neutral-700 rounded-[5px] text-center">
          <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>No comments yet. Be the first to comment!</p>
        </div>
      ) : (
        <div className="space-y-6 ">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="p-4 border border-neutral-800 rounded-[5px] bg-neutral-900/50"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-sienna">{comment.name}</h4>
                <span className="text-sm text-gray-400">
                  {formatDate(comment.createdAt)}
                </span>
              </div>
              <p className="text-gray-200 mb-4">{comment.text}</p>

              {/* Comment actions */}
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <button
                  onClick={() => handleLikeComment(comment._id)}
                  className="flex items-center space-x-1 hover:text-sienna transition-colors"
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>{comment.likes || 0}</span>
                </button>
                <button
                  onClick={() => handleReportComment(comment._id)}
                  className="flex items-center space-x-1 hover:text-red-500 transition-colors"
                >
                  <Flag className="w-4 h-4" />
                  <span>Report</span>
                </button>
                {isAuthenticated && (
                  <button
                    className="flex items-center space-x-1 hover:text-sienna transition-colors"
                    onClick={() => {
                      setNewComment(`@${comment.name} `);
                      document.getElementById("comment")?.focus();
                    }}
                  >
                    <Reply className="w-4 h-4" />
                    <span>Reply</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </div>
  );
}
