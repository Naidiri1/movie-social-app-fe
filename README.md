# Iriscope - Full-Stack Social Movie Platform 🎬

**[Live Demo](https://movie-social-app-fe-57kb.vercel.app/login)** | **[Frontend GitHub](https://github.com/Naidiri1/movie-social-app-fe)** | **[Backend GitHub](https://github.com/Naidiri1/movie-social-app-be)** | **[Video Walkthrough](https://youtu.be/duTqdjZNbug)**

## 🌟 Project Overview  

Iriscope is a full-stack web application that combines **social networking** with a **personal movie library**, it helps to organize, reflect, and share  users to:  
- Track watched, favorite, and “watch later” movies  
- Rank their Top 10 with a custom drag-and-drop system  
- Write and share reviews securely with the community
- Populate their libraries based on popular and upcoming films
- Search users'profiles and like/dislike comments motivating user to engage to the community

Built with **React + TypeScript + Redux (frontend)** and **Spring Boot + PostgreSQL (backend)**, Iriscope demonstrates production-ready engineering patterns, authentication, performance optimization, and deployment.  

---

## ✨ Key Features

### 🔐 Authentication & User Management



https://github.com/user-attachments/assets/7f82c595-ee7e-4bcb-a592-d032f3f6a3dc



Secure user authentication with personalized profiles and JWT-based session management.



https://github.com/user-attachments/assets/76542ff6-2c40-4f68-9977-310e2b8c10d2



---

https://github.com/user-attachments/assets/7a496db6-46e1-4990-984b-bf1db4f4b9b2

## 🔐 Password Reset (Email Link)

Iriscope supports a secure, single-use, **30-minute** password-reset flow.

### How it works
1) **Request** — User enters their **email or username** on `/forgot-password`.  
2) **Token issued** — Backend generates a random token, stores **only its SHA-256 hash** with **expiresAt = now + 30 minutes**, and emails the **raw token** in a reset link.  
3) **Reset** — User opens `/reset-password?token=...`, submits a new password.  
4) **Verify & finalize** — Backend checks the token is **unused** and **not expired**, updates the user’s password (**BCrypt**), and marks the token **used**.

> Privacy: The `/forgot-password` endpoint always returns success to avoid leaking whether an email/username exists.

### API Endpoints
| Method | Path                    | Body (JSON)                                      | Notes |
|------: |-------------------------|--------------------------------------------------|------|
| POST   | `/auth/forgot-password` | `{ "email": "user@x.com" }` or `{ "username": "name" }` | Always responds **200 OK** (no enumeration). |
| POST   | `/auth/reset-password`  | `{ "token": "<raw>", "newPassword": "…" }`       | **400** if token invalid/expired/used; **200** on success. |

### Frontend UX
- Pages: **`/forgot-password`** (request link) and **`/reset-password?token=...`** (set new password).  
- Validations: min password length, confirm password, redirect to **`/login`** after success.  
- Messaging: “If an account exists, we sent a reset link.”

### Security
- **Single-use**, **time-limited (30 min)** tokens.  
- Store **token hashes** only; send the **raw token** in the URL.  
- **BCrypt** for password storage.  
- Consider rate-limiting `/auth/forgot-password` and logging attempts.

### Configuration
- **Frontend base URL** used in emails (backend):  
  ```properties
  app.frontend.base-url=https://YOUR-VERCEL-DOMAIN.vercel.app

  
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
- **React (Hooks + TS)** – dynamic UI with type safety  
- **Redux Toolkit** – state across multiple complex views  
- **Material Tailwind** – responsive, accessible styling  
- **Optimistic UI updates** – smooth UX without reloads  

### Backend  
- **Spring Boot (Java 17)** – modular service layer architecture  
- **PostgreSQL** – relational DB with indexes for fast search  
- **DTO + Repository pattern** – separation of concerns, maintainability  
- **REST API design** – consistent, versioned endpoints  
- **TMDb API integration** – external data ingestion  

### DevOps & Deployment  
- **Frontend:** Vercel (Next.js build)  
- **Backend & DB:** Railway (Spring Boot + PostgreSQL)  
- **Environment configs:** `.env` setup with API keys and secrets
  
---


### Key Features Implementation
- Custom drag-and-drop movies for ranking system
- Secure link generation with cryptographic tokens
- Optimistic UI updates for seamless interaction

---
## ⚡ Engineering Challenges & Lessons Learned  

- **Scalability:** Implemented server-side pagination to handle >1,000 movies with stable performance.  
- **Security:** Designed JWT flow with refresh tokens, preventing session hijacking.  
- **Data Modeling:** Normalized DB schema for Favorites, Watched, and Top 10 without duplication.  
- **Algorithms:** Built custom drag-and-drop ranking system leveraging arrays and React state reconciliation.  
- **Team Practices:** Used GitHub Projects for task tracking, pull requests for code reviews, and issue templates for bug triage.
- **Deployment Debugging:** Faced repeated failed builds (~100 redeploys on Vercel) due to Material Tailwind incompatibility with Next.js 14. Resolved by downgrading to a stable release, documenting the fix, and validating successful production deployment.
---
## 📊 Impact  

- Reduced movie search latency from **1.5s → 300ms** with SQL indexing + caching  
- Delivered a production-ready platform with **end-to-end auth, CRUD, and sharing**  

---

### Performance Metrics
- **Initial Bundle:** 89.7 KB gzipped (code-split across 6 routes)
- **Lighthouse Scores:** Performance: 92 | Accessibility: 96 | Best Practices: 100 | SEO: 100
- **Core Web Vitals:** LCP: 1.8s | FID: 45ms | CLS: 0.02
- **Time to Interactive:** 2.1s on 3G networks

## ⚙️ Installation & Setup  

### Prerequisites  
- Node.js + npm/yarn  
- Java 17  
- PostgreSQL  
- Spring Boot  
- TMDB API key ([Get one here](https://www.themoviedb.org/settings/api))  

### Frontend Setup  
```bash
# Clone repo
git clone https://github.com/Naidiri1/movie-social-app-fe.git
cd movie-social-app-fe

# Install dependencies
npm install

# Configure environment
echo "REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_TMDB_API_KEY=your_tmdb_api_key
REACT_APP_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p" > .env

# Start dev server
npm start


