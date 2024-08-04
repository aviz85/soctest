import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { isLoggedIn, getUser } from '../utils/auth';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newPost, setNewPost] = useState({ title: '', content: '' });

  useEffect(() => {
    if (isLoggedIn()) {
      fetchPosts();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await api.get('/posts/');
      setPosts(response.data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      setError('Failed to load posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/posts/', newPost);
      setPosts([response.data, ...posts]);
      setNewPost({ title: '', content: '' });
    } catch (error) {
      console.error('Failed to create post:', error);
      setError('Failed to create post. Please try again.');
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (!isLoggedIn()) {
    return (
      <div className="text-center mt-8">
        <h1 className="text-3xl font-bold mb-4">Welcome to Social Network</h1>
        <p className="mb-4">Please log in or register to see and create posts.</p>
        <div className="space-x-4">
          <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Login
          </Link>
          <Link to="/register" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Register
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Home Feed</h1>
      
      {/* טופס יצירת פוסט חדש */}
      <form onSubmit={handleCreatePost} className="mb-8 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Enter post title"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
            Content
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="content"
            placeholder="Enter post content"
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create Post
          </button>
        </div>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      {/* רשימת הפו��טים */}
      {posts.length === 0 ? (
        <p>No posts yet. Be the first to post!</p>
      ) : (
        <ul className="space-y-4">
          {posts.map(post => (
            <li key={post.id} className="bg-white shadow rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600">{post.content}</p>
              <p className="text-sm text-gray-500 mt-2">Posted by: {post.user.username}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;