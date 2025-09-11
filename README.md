# Food-Recpies

A full-stack web application for discovering, sharing, and managing food recipes. Users can sign up, log in (including Google login), add/edit/delete their own recipes, view public recipes, and maintain a personal wishlist.

## Features

- User authentication (email/password & Google)
- Add, edit, delete your recipes
- Mark recipes as public/private
- Community feed for public recipes
- Personal wishlist for favorite recipes
- Calorie statistics dashboard

## Project Structure

```
Food-Recpies-main/
├── Backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── firebaseAdmin.js
│   ├── server.js
│   └── ...
├── Frontend/
│   ├── src/
│   │   ├── Components/
│   │   ├── Pages/
│   │   ├── firebase/
│   │   └── ...
│   ├── public/
│   ├── App.jsx
│   └── ...
└── README.md
```

## Getting Started

### Backend

1. Install dependencies:
   ```sh
   cd Backend
   npm install
   ```
2. Set up environment variables in `.env` (see `.env.example` if available).
3. Start the backend server:
   ```sh
   npm run dev
   ```
   The backend runs on port `5000` by default.

### Frontend

1. Install dependencies:
   ```sh
   cd Frontend
   npm install
   ```
2. Start the frontend development server:
   ```sh
   npm run dev
   ```
   The frontend runs on port `5173` by default.

## Usage

- Visit the frontend URL in your browser.
- Sign up or log in.
- Add, edit, or delete your recipes.
- Browse public recipes in the community feed.
- Add recipes to your wishlist.

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB, Firebase Admin (for Google login)
- **Authentication:** JWT, Firebase

## Contributing

1. Pull the latest changes:
   ```sh
   git pull origin main
   ```
2. Create a new branch:
   ```sh
   git checkout -b your-feature-branch
   ```
3. Commit and push your changes:
   ```sh
   git commit -m "Describe your changes"
   git push origin your-feature-branch
   ```

## License

MIT

---

For any questions or issues, please open an issue or
