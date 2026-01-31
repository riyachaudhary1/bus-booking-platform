// src/context/RouteContext.js
// Manages all route planning and navigation

import { createContext, useState, useContext, useCallback } from 'react';

const RouteContext = createContext();

const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

export const RouteProvider = ({ children }) => {
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [savedRoutes, setSavedRoutes] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);

  // Search for routes
  const searchRoutes = useCallback((startLocation, endLocation) => {
    // Simulate route data (in real app, would call Google Maps API)
    const simulatedRoutes = [
      {
        id: generateId(),
        startLocation,
        endLocation,
        distance: 250, // km
        duration: 5, // hours
        cost: 750, // rupees
        busType: 'AC Sleeper',
        departureTime: '10:00 PM',
        arrivalTime: '03:00 AM',
        rating: 4.5,
        reviews: 128,
        seatsAvailable: 12,
        waypoints: ['Intermediate Stop 1', 'Intermediate Stop 2'],
        congestionLevel: 'Low',
        eta: 'On Time',
        operator: 'SafeJourney Travels'
      },
      {
        id: generateId(),
        startLocation,
        endLocation,
        distance: 250,
        duration: 6,
        cost: 550,
        busType: 'AC Sitting',
        departureTime: '11:00 AM',
        arrivalTime: '05:00 PM',
        rating: 4.2,
        reviews: 95,
        seatsAvailable: 8,
        waypoints: ['Intermediate Stop 1'],
        congestionLevel: 'Medium',
        eta: '15 min delay',
        operator: 'RedBus Express'
      },
      {
        id: generateId(),
        startLocation,
        endLocation,
        distance: 245,
        duration: 5.5,
        cost: 650,
        busType: 'AC Semi Sleeper',
        departureTime: '03:00 PM',
        arrivalTime: '08:30 PM',
        rating: 4.7,
        reviews: 156,
        seatsAvailable: 5,
        waypoints: ['Intermediate Stop 1', 'Intermediate Stop 2', 'Intermediate Stop 3'],
        congestionLevel: 'Medium',
        eta: 'On Time',
        operator: 'Comfort Travels'
      }
    ];

    setRoutes(simulatedRoutes);
    return simulatedRoutes;
  }, []);

  // Select a route
  const selectRoute = useCallback((route) => {
    setSelectedRoute(route);
  }, []);

  // Save route for later
  const saveRoute = useCallback((route) => {
    if (!savedRoutes.find(r => r.id === route.id)) {
      setSavedRoutes(prev => [route, ...prev]);
    }
  }, [savedRoutes]);

  // Remove saved route
  const removeSavedRoute = useCallback((routeId) => {
    setSavedRoutes(prev => prev.filter(r => r.id !== routeId));
  }, []);

  // Add to search history
  const addSearchHistory = useCallback((search) => {
    const newSearch = {
      id: generateId(),
      from: search.from,
      to: search.to,
      timestamp: new Date(),
      isFavorite: false
    };

    setSearchHistory(prev => [newSearch, ...prev].slice(0, 10)); // Keep last 10
  }, []);

  // Toggle favorite search
  const toggleFavoriteSearch = useCallback((searchId) => {
    setSearchHistory(prev =>
      prev.map(search =>
        search.id === searchId ? { ...search, isFavorite: !search.isFavorite } : search
      )
    );
  }, []);

  // Calculate fare estimate
  const calculateFare = useCallback((distance) => {
    const baseFare = 100;
    const perKmFare = 2.5;
    return Math.round(baseFare + distance * perKmFare);
  }, []);

  // Compare routes
  const compareRoutes = useCallback((routeIds) => {
    return routes.filter(r => routeIds.includes(r.id));
  }, [routes]);

  // Get route recommendations based on search history
  const getRecommendations = useCallback(() => {
    const recentSearches = searchHistory.slice(0, 3);
    return recentSearches.map(search => ({
      from: search.from,
      to: search.to,
      isFavorite: search.isFavorite
    }));
  }, [searchHistory]);

  return (
    <RouteContext.Provider value={{
      routes,
      selectedRoute,
      savedRoutes,
      searchHistory,
      searchRoutes,
      selectRoute,
      saveRoute,
      removeSavedRoute,
      addSearchHistory,
      toggleFavoriteSearch,
      calculateFare,
      compareRoutes,
      getRecommendations
    }}>
      {children}
    </RouteContext.Provider>
  );
};

export const useRoute = () => {
  const context = useContext(RouteContext);
  if (!context) {
    throw new Error('useRoute must be used inside RouteProvider');
  }
  return context;
};
