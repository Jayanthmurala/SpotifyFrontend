# 🎵 Full Stack Music App Documentation (Microservice Architecture)

**Author:** Jayanth Murala  
**Contact:**  
📧 [jayanthmurala1@gmail.com](mailto:jayanthmurala1@gmail.com)  
📞 +91 9392971945  
🔗 [LinkedIn](https://www.linkedin.com/in/jayanth-murala-0045b2281)

---

## 🧱 Architecture Overview

This project is a full-stack **music streaming platform** built with a **microservice architecture**. It consists of the following services:

- **User Server**: Handles authentication, user profiles, and playlists using **MongoDB**, **JWT**, and **Redis**.
  - **Git**: https://github.com/Jayanthmurala/SpotifyUserBackend
- **Songs Server**: Manages albums and songs with **PostgreSQL**.
  - **Git**: https://github.com/Jayanthmurala/SpotifySongBackend
- **Admin Server**: Provides admin panel APIs for content management using **PostgreSQL**.
  - **Git**: https://github.com/Jayanthmurala/SpotifyAdminBackend
- **Frontend**: Built with **React + TypeScript**, featuring role-based authentication (User/Admin).
  - **Git**: https://github.com/Jayanthmurala/SpotifyFrontend 

![System Architecture](https://ik.imagekit.io/jayanthmurala05/ChatGPT%20Image%20Jul%206,%202025,%2004_17_19%20PM.png?updatedAt=1751798915788)

---

## 🌐 Base URLs

| Service      | Description               | Base URL                       | Database   |
| ------------ | ------------------------- | ------------------------------ | ---------- |
| User Server  | Authentication, Playlists | `http://localhost:5000/api/v1` | MongoDB    |
| Songs Server | Albums, Songs             | `http://localhost:9000/api/v1` | PostgreSQL |
| Admin Server | Admin Panel APIs          | `http://localhost:7000/api/v1` | PostgreSQL |

---

## 🔐 Login Credentials

| Role  | Email             | Password  |
| ----- | ----------------- | --------- |
| User  | userv1@gmail.com  | 123456789 |
| Admin | adminv1@gmail.com | 123456789 |

> **Note**: These credentials are for demo purposes only. Use environment variables or a secure vault for production.

---

## 🚀 Frontend Overview

- **Framework**: React + TypeScript
- **Styling**: Tailwind CSS with Vite for fast builds
- **Authentication**: Role-based (User/Admin) with JWT
- **Features**:
  - Song and album management
  - Playlist creation and management
  - File upload forms for songs and cover images
- **State Management**: Redux (for complex state) or Context API (for simpler cases)
- **UI Screens**:
  - Admin Dashboard: Manage songs, albums, and users
  - User Playlist: View and manage personal playlists

## HOME

![Home](https://ik.imagekit.io/jayanthmurala05/Screenshot%202025-07-06%20154706.png?updatedAt=1751797798523)

## Admin Dashboard

## ![Admin Dashboard](https://ik.imagekit.io/jayanthmurala05/Screenshot%202025-07-06%20160333.png?updatedAt=1751798099433)

## 🧑‍💻 User Server (Port: 5000)

### Base URL: `http://localhost:5000/api/v1`

| Endpoint          | Method | Description                    | Authentication |
| ----------------- | ------ | ------------------------------ | -------------- |
| `/album/new`      | POST   | Create a new album (form-data) | Admin          |
| `/album/:id`      | DELETE | Delete an album by ID          | Admin          |
| `/song/new`       | POST   | Upload a new song (form-data)  | Admin          |
| `/song/cover/:id` | POST   | Upload cover image for a song  | Admin          |
| `/song/:id`       | DELETE | Delete a song by ID            | Admin          |

#### Example Request: Create Album (`/album/new`)

**Request**:

```bash
POST http://localhost:5000/api/v1/album/new
Content-Type: multipart/form-data
Authorization: Bearer <JWT_TOKEN>

title: "Summer Hits"
artist: "Various Artists"
releaseYear: 2023
coverImage: <file>
```

**Response**:

```json
{
  "status": "success",
  "data": {
    "albumId": "12345",
    "title": "Summer Hits",
    "artist": "Various Artists",
    "releaseYear": 2023,
    "coverImageUrl": "https://cloudinary.com/..."
  }
}
```

#### Error Response (Example):

```json
{
  "status": "error",
  "message": "Invalid token",
  "code": 401
}
```

---

## 📦 Tech Stack

| Layer         | Technologies                              |
| ------------- | ----------------------------------------- |
| **Frontend**  | React, TypeScript, Tailwind CSS, Vite     |
| **Backend**   | Node.js, Express, JWT, Redis              |
| **Databases** | MongoDB (Users), PostgreSQL (Songs/Admin) |
| **Auth**      | JWT with role-based access control        |
| **Uploads**   | Cloudinary (images and audio)             |
| **State**     | Redux or Context API (frontend)           |

---

## 📂 Folder Structure

### Frontend

```
/src
├── /components    # Reusable UI components
├── /pages         # Admin and User routes
├── /api           # Axios HTTP client and endpoint configurations
├── /assets        # Placeholder images and static files
├── App.tsx        # Main app component
└── main.tsx       # Entry point
```

### Backend (Users, Songs, Admin)

```
/src
├── /routes        # API route definitions
├── /controllers   # Request handlers
├── /models        # Database schemas/models
├── /middlewares   # Authentication, validation, etc.
├── /config        # Database and environment configs
└── index.js       # Server entry point
```

---

## 🧪 Testing

- **Postman Collections**: Available for testing all API endpoints.
- **Dummy Data**: Auto-seeded for demo purposes.
  
---

## 🛡️ Security Notes

- **Authentication**: JWT-based with role checks enforced on the backend.
- **Rate Limiting**: Implemented to prevent abuse.
- **Caching**: Redis used for performance optimization.

---

## 📥 Future Enhancements

- **Search & Filters**: Add genre/artist-based search using Elasticsearch or PostgreSQL full-text search.
- **Realtime Analytics**: Implement streaming analytics with WebSocket or Kafka.
- **Lyrics & Comments**: Integrate a lyrics API (e.g., Musixmatch) or store lyrics in PostgreSQL; add a comment system for user interaction.

---

## 🙋 Contact

For questions, feature requests, or collaboration:

👤 **Jayanth Murala**  
📧 [jayanthmurala1@gmail.com](mailto:jayanthmurala1@gmail.com)  
📞 +91 9392971945  
🔗 [LinkedIn](https://www.linkedin.com/in/jayanth-murala-0045b2281)

---

> _"Code is like music; the better you orchestrate, the more people enjoy."_
