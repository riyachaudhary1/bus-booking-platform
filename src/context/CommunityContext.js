// src/context/CommunityContext.js
// Manages all community posts, comments, and interactions

import { createContext, useState, useContext, useEffect } from 'react';

const CommunityContext = createContext();

// Generate unique ID
const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

export const CommunityProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [userProfiles, setUserProfiles] = useState({});

  // Load posts from localStorage when app starts
  useEffect(() => {
    const savedPosts = localStorage.getItem('communityPosts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      // Initialize with sample posts
      initializeSamplePosts();
    }
  }, []);

  // Save posts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('communityPosts', JSON.stringify(posts));
  }, [posts]);

  // Initialize with sample posts for demo
  const initializeSamplePosts = () => {
    const samplePosts = [
      {
        id: generateId(),
        userId: 'user1',
        username: 'Riya Chaudhary',
        userVerified: true,
        title: 'Delhi to Chandigarh Bus Journey',
        content: 'Had an amazing experience on the morning bus from Delhi to Chandigarh. The bus was clean and the staff was very helpful!',
        category: 'route',
        likes: 5,
        likedBy: [],
        comments: 2,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        isVisible: true,
        image: '🚌'
      },
      {
        id: generateId(),
        userId: 'user2',
        username: 'Ajay Kumar',
        userVerified: true,
        title: 'Pro Tips for Long Bus Journeys',
        content: 'Always carry neck pillow, water bottle, and snacks for comfort during long bus journeys. Trust me, it makes a big difference!',
        category: 'tips',
        likes: 12,
        likedBy: [],
        comments: 3,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        isVisible: true,
        image: '💡'
      }
    ];
    setPosts(samplePosts);
  };

  // Create a new post
  const createPost = (postData) => {
    const newPost = {
      id: generateId(),
      userId: postData.userId || 'current_user',
      username: postData.username || 'Anonymous',
      userVerified: postData.userVerified || true,
      title: postData.title,
      content: postData.content,
      category: postData.category || 'general',
      likes: 0,
      likedBy: [],
      comments: 0,
      createdAt: new Date(),
      isVisible: true,
      image: postData.image || '📝'
    };

    setPosts([newPost, ...posts]);
    return newPost;
  };

  // Like a post
  const likePost = (postId, userId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const isLiked = post.likedBy.includes(userId);
        return {
          ...post,
          likes: isLiked ? post.likes - 1 : post.likes + 1,
          likedBy: isLiked 
            ? post.likedBy.filter(id => id !== userId)
            : [...post.likedBy, userId]
        };
      }
      return post;
    }));
  };

  // Add comment to post
  const addComment = (postId, commentData) => {
    const newComment = {
      id: generateId(),
      postId,
      userId: commentData.userId || 'current_user',
      username: commentData.username || 'Anonymous',
      content: commentData.content,
      likes: 0,
      likedBy: [],
      createdAt: new Date(),
      isVisible: true
    };

    setComments([...comments, newComment]);

    // Update post comment count
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { ...post, comments: post.comments + 1 };
      }
      return post;
    }));

    return newComment;
  };

  // Get comments for a post
  const getPostComments = (postId) => {
    return comments.filter(comment => comment.postId === postId && comment.isVisible);
  };

  // Like a comment
  const likeComment = (commentId, userId) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        const isLiked = comment.likedBy.includes(userId);
        return {
          ...comment,
          likes: isLiked ? comment.likes - 1 : comment.likes + 1,
          likedBy: isLiked
            ? comment.likedBy.filter(id => id !== userId)
            : [...comment.likedBy, userId]
        };
      }
      return comment;
    }));
  };

  // Report post (hide if multiple reports)
  const reportPost = (postId) => {
    // In real app, this would track reports
    // For now, just mark as hidden
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { ...post, isVisible: false };
      }
      return post;
    }));
  };

  // Delete post (admin only)
  const deletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  // Get visible posts sorted by newest first
  const getVisiblePosts = () => {
    return posts
      .filter(post => post.isVisible)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  return (
    <CommunityContext.Provider value={{
      posts: getVisiblePosts(),
      comments,
      userProfiles,
      createPost,
      likePost,
      addComment,
      getPostComments,
      likeComment,
      reportPost,
      deletePost
    }}>
      {children}
    </CommunityContext.Provider>
  );
};

// Custom hook to use community context
export const useCommunity = () => {
  const context = useContext(CommunityContext);
  if (!context) {
    throw new Error('useCommunity must be used inside CommunityProvider');
  }
  return context;
};
