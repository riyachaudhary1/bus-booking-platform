# 🚌 BusBooker - Full Stack Web Application

<div align="center">

[![React](https://img.shields.io/badge/React-18.0-blue?logo=react)](https://reactjs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/CSS3-Responsive-green?logo=css3)](https://www.w3schools.com/css/)
[![Netlify](https://img.shields.io/badge/Deployed-Netlify-00C7B7?logo=netlify)](https://bus-booking-platform.netlify.app)

**A comprehensive full-stack web application for bus booking with integrated community features, real-time notifications, advanced route planning, and user engagement tools.**

[Live Demo](https://bus-booking-platform.netlify.app) • [GitHub Repo](https://github.com/riyachaudhary1/bus-booking-platform) • [Report Bug](https://github.com/riyachaudhary1/bus-booking-platform/issues)

</div>

---

## 🎯 Overview

BusBooker is a modern, feature-rich web application designed to revolutionize the bus booking experience. Built as a full-stack internship project at ElevanceSkills, it demonstrates professional React development practices, advanced state management, responsive design, and user-centric features.

**Project Duration:** 59 Days (Jan 27 - Mar 27, 2026)  
**Status:** ✅ Completed (6/6 Tasks - 100%)  
**Internship:** ElevanceSkills Full Stack Web Development

---

## ✨ Key Features

### 1. 🎭 Community System
- **Create Posts:** Users can share their travel experiences with detailed descriptions
- **Comments & Engagement:** Reply to posts and build conversations
- **Like System:** Quick appreciation for helpful posts
- **User Profiles:** Verification badges for trusted members
- **Content Moderation:** Report and hide inappropriate content
- **Forum Structure:** Organized categories for easy navigation

### 2. 🔔 Real-time Notifications
- **Toast Notifications:** Auto-dismissing alerts for important events
- **Notification Center:** Persistent notification dashboard
- **Smart Preferences:** Customize notification types (Email, Push, Promotional)
- **Event Triggers:** Automatic alerts for bookings, comments, and likes
- **Unread Counter:** Badge showing pending notifications
- **Mark as Read:** Organize and manage notifications

### 3. 🗺️ Advanced Route Planning
- **Smart Search:** Find routes by origin and destination
- **Intelligent Filtering:** Filter by bus type, price, duration, and ratings
- **Dynamic Sorting:** Sort by cost, duration, departure time, or rating
- **Detailed Information:** Complete route details including:
  - Distance and estimated duration
  - Operator information and bus type
  - Real-time seat availability
  - Traffic level indicators
  - ETA and delay predictions
- **Save Routes:** Mark favorite routes for quick access
- **Search History:** Track previous searches for convenience

### 4. 🌍 Multi-Language Support (i18n)
- **3 Languages:** English 🇬🇧, Hindi 🇮🇳, Spanish 🇪🇸
- **Dynamic Switching:** Change language in real-time
- **Persistent Selection:** Language preference saved locally
- **Complete Translation:** All UI elements translated
- **Easy Extensibility:** Simple structure for adding more languages

### 5. 🌙 Dark Mode Implementation
- **Theme Toggle:** Seamless light/dark mode switching
- **Smooth Transitions:** Elegant color transitions
- **CSS Variables System:** Modern theming approach
- **Persistent Setting:** Theme preference remembered
- **Complete Coverage:** All pages and components themed
- **WCAG Compliant:** Accessible color contrasts

### 6. ⭐ Rating & Review System
- **5-Star Rating:** Intuitive rating interface
- **Detailed Reviews:** Write comprehensive feedback
- **Edit Window:** Edit reviews within 24 hours
- **Rating Analytics:** Visual distribution of ratings
- **Helpful Voting:** Community feedback system
- **Moderation:** Report inappropriate reviews
- **Trusted Badges:** Recognition for quality reviewers

---

## 🛠️ Technology Stack

### Frontend Framework
- **React 18** - Latest React with Hooks
- **JavaScript (ES6+)** - Modern JavaScript
- **HTML5** - Semantic markup
- **CSS3** - Advanced styling with animations

### State Management
- **Context API** - Global state management
- **useContext Hook** - Context consumption
- **useCallback** - Performance optimization
- **Custom Hooks** - Reusable logic

### Styling & Design
- **CSS3 Variables** - Dynamic theming
- **Flexbox & Grid** - Responsive layouts
- **CSS Animations** - Smooth transitions
- **Mobile-First Design** - Responsive at all sizes

### Storage & Persistence
- **localStorage** - Client-side data persistence
- **JSON Serialization** - Data format for storage

### Deployment
- **Netlify** - Cloud hosting platform
- **Git** - Version control
- **GitHub** - Repository hosting

---

## 📊 Project Structure
```
bus-booking-platform/
├── public/
│   ├── index.html          # Main HTML file
│   ├── favicon.ico         # App icon
│   └── manifest.json       # PWA manifest
│
├── src/
│   ├── components/         # React Components (20+)
│   │   ├── Navbar.js              # Navigation bar with theme/language
│   │   ├── CommunityPage.js       # Community posts section
│   │   ├── CreatePost.js          # Post creation form
│   │   ├── PostCard.js            # Individual post display
│   │   ├── NotificationCenter.js  # Notification dashboard
│   │   ├── Toast.js               # Toast notification
│   │   ├── ToastContainer.js      # Toast container
│   │   ├── RoutePlannerPage.js    # Route planning page
│   │   ├── RouteSearch.js         # Route search form
│   │   ├── RouteCard.js           # Route card display
│   │   ├── RouteResults.js        # Search results
│   │   ├── RoutesPage.js          # Reviews & routes page
│   │   ├── ReviewForm.js          # Review submission
│   │   ├── ReviewCard.js          # Review display
│   │   ├── RatingOverview.js      # Rating statistics
│   │   └── More components...
│   │
│   ├── context/            # Context Providers (6)
│   │   ├── ThemeContext.js        # Dark mode state
│   │   ├── LanguageContext.js     # i18n state
│   │   ├── NotificationContext.js # Notification state
│   │   ├── CommunityContext.js    # Community state
│   │   ├── ReviewContext.js       # Review state
│   │   └── RouteContext.js        # Route state
│   │
│   ├── styles/             # CSS Files (15+)
│   │   ├── App.css
│   │   ├── Navbar.css
│   │   ├── Toast.css
│   │   ├── NotificationCenter.css
│   │   ├── ReviewCard.css
│   │   ├── RouteCard.css
│   │   └── More stylesheets...
│   │
│   ├── locales/            # Translation Files
│   │   ├── en.json         # English translations
│   │   ├── hi.json         # Hindi translations
│   │   └── es.json         # Spanish translations
│   │
│   ├── App.js              # Main app component
│   ├── App.css             # App styles
│   └── index.js            # React entry point
│
├── .env                    # Environment variables
├── .gitignore             # Git ignore rules
├── package.json           # Project dependencies
├── package-lock.json      # Dependency lock file
├── INTERNSHIP_REPORT.md   # Detailed project report
└── README.md              # This file
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- Modern web browser

### Installation
```bash
# 1. Clone the repository
git clone https://github.com/riyachaudhary1/bus-booking-platform.git

# 2. Navigate to project directory
cd bus-booking-platform

# 3. Install dependencies
npm install

# 4. Create .env file (for Google Maps API)
echo "REACT_APP_GOOGLE_MAPS_API_KEY=your_api_key_here" > .env

# 5. Start development server
npm start
```

### Building for Production
```bash
# Build optimized production version
npm run build

# Serve production build locally
npm install -g serve
serve -s build
```

---

## 🌐 Live Demo

**Visit the live application:** [https://bus-booking-platform.netlify.app](https://bus-booking-platform.netlify.app)

**Test the features:**
- 🎭 Create a community post
- 🔔 Trigger notifications
- 🗺️ Search for routes
- 🌍 Switch languages (EN, HI, ES)
- 🌙 Toggle dark mode
- ⭐ Write and rate reviews

---

## 📱 Features in Detail

### Community Features
```javascript
// Create a post
{
  title: "Amazing bus journey to Jaipur!",
  description: "The AC was perfect and staff was very helpful.",
  category: "Travel Stories",
  timestamp: "2026-02-01"
}

// Comment on posts
{
  author: "John Doe",
  content: "I agree! Great experience.",
  timestamp: "2026-02-01"
}
```

### Notifications
- **Booking Confirmed** - When you complete a booking
- **New Comment** - Someone comments on your post
- **New Like** - Someone likes your post
- **Schedule Change** - Route schedule updates
- **Promotions** - Special offers and deals

### Route Planning
- Search by origin/destination
- Filter by bus type, price, duration
- Sort by best ratings
- View operator details
- Check real-time seat availability
- See traffic conditions

### Languages Supported
- **English** - Full English translation
- **Hindi** - हिन्दी - Full Hindi translation
- **Spanish** - Español - Full Spanish translation

---

## 🎓 Learning Outcomes

### React & JavaScript
- ✅ React 18 Hooks (useState, useContext, useCallback, useEffect)
- ✅ Context API for state management
- ✅ Custom hooks development
- ✅ Component composition & reusability
- ✅ Performance optimization

### Frontend Development
- ✅ Responsive design patterns
- ✅ CSS variables for theming
- ✅ Mobile-first approach
- ✅ Accessibility best practices
- ✅ Animation & transitions

### Project Management
- ✅ Git & GitHub workflows
- ✅ Feature branching
- ✅ Commit best practices
- ✅ Code organization
- ✅ Documentation

### User Experience
- ✅ Form handling & validation
- ✅ Error handling
- ✅ Loading states
- ✅ User feedback (notifications)
- ✅ Intuitive navigation

---

## 📊 Statistics

| Metric | Count |
|--------|-------|
| Total Files | 50+ |
| React Components | 20+ |
| Context Providers | 6 |
| CSS Files | 15+ |
| Lines of Code | 10,000+ |
| Features | 6 Major |
| Languages | 3 |
| Mobile Responsive | ✅ Yes |
| Dark Mode | ✅ Yes |

---

## 🔐 Security Features

- ✅ Environment variables for API keys (.env)
- ✅ .gitignore for sensitive data
- ✅ Input validation on forms
- ✅ XSS protection
- ✅ CSRF token handling (if backend added)
- ✅ Secure localStorage usage

---

## 🚀 Future Enhancements

### Phase 1: Backend Integration
- [ ] Node.js/Express backend
- [ ] MongoDB database
- [ ] User authentication (JWT)
- [ ] Real API integration

### Phase 2: Advanced Features
- [ ] Google Maps integration
- [ ] Payment gateway (Stripe/Razorpay)
- [ ] Real-time chat
- [ ] Email notifications
- [ ] SMS alerts

### Phase 3: Mobile & PWA
- [ ] React Native mobile app
- [ ] Progressive Web App (PWA)
- [ ] Offline functionality
- [ ] Push notifications

### Phase 4: Advanced Analytics
- [ ] User analytics dashboard
- [ ] Business intelligence
- [ ] Performance metrics
- [ ] User behavior tracking

---

## 🤝 Contributing

Contributions are welcome! Here's how:
```bash
# 1. Fork the repository
# 2. Create a feature branch
git checkout -b feature/your-feature-name

# 3. Make your changes
# 4. Commit with descriptive message
git commit -m "Add: description of your feature"

# 5. Push to your fork
git push origin feature/your-feature-name

# 6. Open a Pull Request
```

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```
MIT License

Copyright (c) 2026 Riya Chaudhary

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## 👩‍💻 Author

**Riya Chaudhary**

- 📧 Email: [riasangam0@gmail.com](mailto:riasangam0@gmail.com)
- 🔗 GitHub: [@riyachaudhary1](https://github.com/riyachaudhary1)
  
---

## 🙏 Acknowledgments

- **ElevanceSkills** - For the amazing internship opportunity
- **React Community** - For excellent documentation
- **Netlify** - For seamless deployment
- **All Contributors** - For support and feedback

---

## 📞 Support

For support, email [riasangam0@gmail.com](mailto:riasangam0@gmail.com) or open an issue on GitHub.

---

## 🎉 Thank You!

Thank you for visiting this project! If you find it useful, please consider:
- ⭐ Starring the repository
- 📤 Sharing with others
- 💬 Providing feedback
- 🐛 Reporting bugs
- ✨ Contributing features

**Made with ❤️ by Riya Chaudhary**
