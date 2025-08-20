# Iriscope - Full-Stack Social Movie Platform 🎬

**[Live Demo](https://movie-social-app-fe-57kb.vercel.app/login)** | **[Frontend GitHub](https://github.com/Naidiri1/movie-social-app-fe))** | **[Backend GitHub](https://github.com/Naidiri1/movie-social-app-be)** | **[Video Walkthrough](https://youtu.be/duTqdjZNbug)**

## Overview

Iriscope is a full-stack social platform that transforms how movie enthusiasts discover, track, and share their cinematic journey. Built with modern web technologies, it combines the power of social networking with comprehensive movie database functionality.

## ✨ Key Features

### 🔐 Authentication & User Management



https://github.com/user-attachments/assets/7f82c595-ee7e-4bcb-a592-d032f3f6a3dc



Secure user authentication with personalized profiles and JWT-based session management.



https://github.com/user-attachments/assets/76542ff6-2c40-4f68-9977-310e2b8c10d2



---

### 🎭 Smart Genre Navigation & Discovery

 https://github.com/user-attachments/assets/260fea36-953f-4097-bda5-71054e686dd9

- **Dynamic genre menu** showing real-time movie counts per category
- **Smart pagination** with current page indicator
- **Quick navigation dropdown** for jumping to top/bottom of extensive lists
- Seamless browsing through thousands of movies

---

### 📚 Personalized Movie Collections

https://github.com/user-attachments/assets/b7184c1a-47ad-4832-9639-cb3abd5afb25 

Organize your movie experience with custom lists:
- **Favorites** - Your all-time beloved films
- **Watched** - Track your viewing history
- **Watch Later** - Never forget a recommendation
- **Top 10** - Your personal hall of fame
- Import from Popular & Upcoming sections with one click

---

### ⭐ Interactive Review System

https://github.com/user-attachments/assets/7f55e479-0574-4f8c-9a96-39d8a6898722 

- Write detailed reviews with star ratings
- Edit and delete your reviews anytime
- Manage your movie library with full CRUD operations
- Community-driven ratings and insights

---

### 🏆 Drag & Drop Top 10 Rankings

<video width="100%" controls>
<source src="https://github.com/user-attachments/assets/c50e1289-7278-4c6b-82b7-04386455a545" type="video/mp4">
</video>

**Unique ranking system** where users can:
- Drag and reorder movies to create perfect Top 10 lists
- Add personalized comments to each ranking
- No ratings needed - just pure preference ordering
- Dynamic real-time updates as you reorganize

---

### 🔗 Secure Sharing System

https://github.com/user-attachments/assets/c50e1289-7278-4c6b-82b7-04386455a545 

- **Privacy-first sharing** with toggle on/off functionality
- Generate secure, unique links to share your Top 10
- Non-users can view your rankings and reviews
- Instant link deactivation for complete control
- Share your movie taste without requiring others to sign up

---

### 🔍 Advanced Search Capabilities

https://github.com/user-attachments/assets/8bdb5b94-422e-4317-8bcf-417618778e9d 

- **Global search** across entire movie database
- **Category-specific search** within Favorites, Watched, or Watch Later
- Instant results with smart filtering
- Find any movie in seconds

---

### 👥 Social Engagement Features

https://github.com/user-attachments/assets/99d0b174-d645-4289-a12d-8966a653ede5 

- **Like/dislike** community reviews
- **Explore user profiles** to discover new movies
- **Taste matching** - find users with similar preferences
- Build your movie community

---

## 🛠️ Technical Highlights

### Frontend
- **React** with hooks for dynamic UI
- **TypeScript** for type safety
- **Redux Toolkit** for state management
- **Material Tailwind CSS** for responsive design
- **Real-time updates** without page refresh

### Backend
- **Spring Boot**
-  **Java - RESTful API**
- **PostgreSQL** database with complex relationships
- **JWT authentication** for security
- **Efficient pagination** for large datasets
- **TMDB API integration** for movie data

### Deployment
- **Frontend:** Vercel
- **Backend & Database:** Railway

### Key Features Implementation
- Custom drag-and-drop algorithm for ranking system
- Secure link generation with cryptographic tokens
- Optimistic UI updates for seamless interaction
- Advanced caching strategies for performance

---

## 🚀 Installation

### Prerequisites
- Next.js
- Javascript
- Spring Boot
- Java 17
- PostgreSQL 
- npm or yarn
- TMDB API key ([Get one here](https://www.themoviedb.org/settings/api))

## 🚀 Frontend Setup

### Installation Steps


```bash
 **Clone the frontend repository**

git clone https://github.com/Naidiri1/movie-social-app-fe.git
cd movie-social-app-fe

**Install dependencies**

```bash
npm install

Create a .env file in the root directory:
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_TMDB_API_KEY=your_tmdb_api_key
REACT_APP_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p

npm start

**Configure environment variables**

Create a `.env` file in the root directory and add:

```env
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_TMDB_API_KEY=your_tmdb_api_key
REACT_APP_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p

The application will open at http://localhost:3000



