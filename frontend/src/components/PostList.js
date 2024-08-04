import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/posts/');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <h2>Posts</h2>
      {posts.map(post => (
        <div key={post.id}>
          <h3>{post.user.username}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}

export default PostList;