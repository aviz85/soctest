import React from 'react';
import axios from 'axios';

function LikeButton({ postId, isLiked, onLike }) {
  const handleLike = async () => {
    try {
      if (isLiked) {
        await axios.delete(`http://localhost:8000/api/likes/${postId}/`);
      } else {
        await axios.post('http://localhost:8000/api/likes/', { post: postId });
      }
      onLike();
    } catch (error) {
      console.error('Error liking/unliking post:', error);
    }
  };

  return (
    <button onClick={handleLike}>
      {isLiked ? 'Unlike' : 'Like'}
    </button>
  );
}

export default LikeButton;