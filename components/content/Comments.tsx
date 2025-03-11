// /components/content/Comments.tsx

"use client";

import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';

type Comment = {
  _id: string;
  name: string;
  text: string;
  createdAt: string;
};

export default function Comments({ journalId }: { journalId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/comments?journalId=${journalId}`);
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setLoading(false);
      }
    };

    if (journalId) {
      fetchComments();
    }
  }, [journalId]);

  // Function to format the date
  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (e) {
      return 'some time ago';
    }
  };

  if (loading) {
    return <div className="text-gray-400 mt-4">Loading comments...</div>;
  }

  if (comments.length === 0) {
    return <div className="text-gray-400 mt-4">No comments yet. Be the first to comment!</div>;
  }

  return (
    <div className="mt-10">
      <h3 className="text-2xl font-bold text-gray-200 mb-6">Comments ({comments.length})</h3>
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment._id} className="p-4 border border-neutral-800 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-sienna">{comment.name}</h4>
              <span className="text-sm text-gray-400">{formatDate(comment.createdAt)}</span>
            </div>
            <p className="text-gray-200">{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
