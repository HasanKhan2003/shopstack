# ShopStack

ShopStack is a small shopping app with a React frontend and an Express backend. The backend uses SQLite for data storage and serves product images from the `backend/public` folder.

## Project Structure

- `backend/` - Express API and SQLite database
- `frontend/` - React app built with Vite

## Requirements

- Node.js
- npm

## Setup

Install dependencies in both folders:

```bash
cd backend
npm install

cd ../frontend
npm install
```

## Run the app

Start the backend:

```bash
cd backend
npm run dev
```

The backend runs on `http://localhost:5000` by default.

Start the frontend in another terminal:

```bash
cd frontend
npm run dev
```

The frontend runs on the Vite dev server, usually `http://localhost:5173`.

## Notes

- The SQLite database file is in `backend/database/shopstack.db`.
- If needed, the frontend API base URL can be set with `VITE_API_BASE_URL`.
