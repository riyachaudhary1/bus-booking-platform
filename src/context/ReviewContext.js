// src/context/ReviewContext.js
// Manages all reviews and ratings

import { createContext, useState, useContext, useEffect, useCallback } from 'react';

const ReviewContext = createContext();

const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

export const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);
  const [routeRatings, setRouteRatings] = useState({});

  // Load reviews from localStorage
  useEffect(() => {
    const savedReviews = localStorage.getItem('reviews');
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
      calculateRatings(JSON.parse(savedReviews));
    } else {
      initializeSampleReviews();
    }
  }, []);

  // Save reviews to localStorage
  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(reviews));
    calculateRatings(reviews);
  }, [reviews]);

  // Initialize with sample reviews
  const initializeSampleReviews = () => {
    const samples = [
      {
        id: generateId(),
        routeId: 'delhi-chandigarh',
        routeName: 'Delhi to Chandigarh',
        userId: 'user1',
        username: 'Riya Chaudhary',
        userVerified: true,
        rating: 5,
        title: 'Amazing Journey!',
        content: 'The bus was very clean, staff was courteous, and the ride was smooth. Highly recommended!',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        updatedAt: null,
        helpful: 12,
        reported: false,
        isVisible: true,
        isTrusted: true
      },
      {
        id: generateId(),
        routeId: 'delhi-chandigarh',
        routeName: 'Delhi to Chandigarh',
        userId: 'user2',
        username: 'Ajay Kumar',
        userVerified: true,
        rating: 4,
        title: 'Good Experience',
        content: 'Overall good service. Minor delay but made up for it. Would ride again.',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        updatedAt: null,
        helpful: 8,
        reported: false,
        isVisible: true,
        isTrusted: false
      },
      {
        id: generateId(),
        routeId: 'delhi-chandigarh',
        routeName: 'Delhi to Chandigarh',
        userId: 'user3',
        username: 'Priya Singh',
        userVerified: true,
        rating: 3,
        title: 'Average',
        content: 'The bus was okay. AC could be better. Food service was slow.',
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        updatedAt: null,
        helpful: 3,
        reported: false,
        isVisible: true,
        isTrusted: false
      }
    ];

    setReviews(samples);
  };

  // Calculate ratings for routes
  const calculateRatings = useCallback((allReviews) => {
    const ratings = {};

    allReviews
      .filter(r => r.isVisible)
      .forEach(review => {
        if (!ratings[review.routeId]) {
          ratings[review.routeId] = {
            routeId: review.routeId,
            routeName: review.routeName,
            totalReviews: 0,
            averageRating: 0,
            distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
          };
        }

        ratings[review.routeId].totalReviews += 1;
        ratings[review.routeId].distribution[review.rating] += 1;
      });

    // Calculate averages
    Object.keys(ratings).forEach(routeId => {
      const route = ratings[routeId];
      if (route.totalReviews > 0) {
        const sum = Object.keys(route.distribution).reduce(
          (total, star) => total + (parseInt(star) * route.distribution[star]),
          0
        );
        route.averageRating = (sum / route.totalReviews).toFixed(1);
      }
    });

    setRouteRatings(ratings);
  }, []);

  // Create review
  const createReview = useCallback((reviewData) => {
    const newReview = {
      id: generateId(),
      routeId: reviewData.routeId,
      routeName: reviewData.routeName,
      userId: reviewData.userId || 'current_user',
      username: reviewData.username || 'Anonymous',
      userVerified: reviewData.userVerified || true,
      rating: reviewData.rating,
      title: reviewData.title,
      content: reviewData.content,
      createdAt: new Date(),
      updatedAt: null,
      helpful: 0,
      reported: false,
      isVisible: true,
      isTrusted: false
    };

    setReviews(prev => [newReview, ...prev]);
    return newReview;
  }, []);

  // Edit review (only within 24 hours)
  const editReview = useCallback((reviewId, newData) => {
    setReviews(prev =>
      prev.map(review => {
        if (review.id === reviewId) {
          const createdTime = new Date(review.createdAt).getTime();
          const now = new Date().getTime();
          const hoursPassed = (now - createdTime) / (1000 * 60 * 60);

          // Only allow edit within 24 hours
          if (hoursPassed <= 24) {
            return {
              ...review,
              title: newData.title,
              content: newData.content,
              rating: newData.rating,
              updatedAt: new Date()
            };
          }
        }
        return review;
      })
    );
  }, []);

  // Delete review
  const deleteReview = useCallback((reviewId) => {
    setReviews(prev => prev.filter(r => r.id !== reviewId));
  }, []);

  // Mark helpful
  const markHelpful = useCallback((reviewId) => {
    setReviews(prev =>
      prev.map(r =>
        r.id === reviewId ? { ...r, helpful: r.helpful + 1 } : r
      )
    );
  }, []);

  // Report review
  const reportReview = useCallback((reviewId) => {
    setReviews(prev =>
      prev.map(r => {
        if (r.id === reviewId) {
          const updated = { ...r, reported: true };
          // Hide if too many reports (simulate with 1 report for demo)
          if (r.reported) {
            updated.isVisible = false;
          }
          return updated;
        }
        return r;
      })
    );
  }, []);

  // Get reviews for route
  const getRouteReviews = useCallback((routeId) => {
    return reviews
      .filter(r => r.routeId === routeId && r.isVisible)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [reviews]);

  // Check if can edit
  const canEditReview = useCallback((reviewId) => {
    const review = reviews.find(r => r.id === reviewId);
    if (!review) return false;

    const createdTime = new Date(review.createdAt).getTime();
    const now = new Date().getTime();
    const hoursPassed = (now - createdTime) / (1000 * 60 * 60);

    return hoursPassed <= 24;
  }, [reviews]);

  // Get route rating
  const getRouteRating = useCallback((routeId) => {
    return routeRatings[routeId] || null;
  }, [routeRatings]);

  return (
    <ReviewContext.Provider value={{
      reviews,
      routeRatings,
      createReview,
      editReview,
      deleteReview,
      markHelpful,
      reportReview,
      getRouteReviews,
      canEditReview,
      getRouteRating
    }}>
      {children}
    </ReviewContext.Provider>
  );
};

export const useReview = () => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error('useReview must be used inside ReviewProvider');
  }
  return context;
};
