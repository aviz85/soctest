import React, { useState } from 'react';
import axios from 'axios';

function CreatePost() {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/posts/', { content });
      console.log('Post created:', response.data);
      setContent('');
      // Optionally, update the post list or redirect
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
      <button type="submit">Create Post</button>
    </form>
  );
}

export default CreatePost;