# ShopMe

ShopMe is a JavaScript MERN e-commerce application with MongoDB, Express, React, Node.js, JWT authentication, Axios, and Gemini shopping assistance.

## Structure

```text
shopai/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ai/ auth/ cart/ checkout/ common/ home/ layout/ orders/ products/
│   │   ├── context/              # AppContext.jsx
│   │   ├── pages/                # Active page components
│   │   ├── routes/               # React Router configuration
│   │   ├── services/             # Axios API services
│   │   ├── styles/               # CSS design tokens and global styles
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── backend/
│   ├── config/                   # MongoDB and Gemini configuration
│   ├── controllers/
│   ├── data/                     # Seed data
│   ├── db/                       # Local store fallback
│   ├── middleware/
│   ├── models/                   # Mongoose models
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── package.json
├── package.json
└── README.md
```

Frontend code lives only in `frontend/`; backend code lives only in `backend/`.

## Development

Install dependencies and run both applications from the project root:

```bash
npm install
npm install --prefix frontend
npm install --prefix backend
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- Health check: http://localhost:3000/api/health

## Environment

Copy the templates into local environment files and provide your own credentials:

- `backend/.env.example` -> `backend/.env`
- `frontend/.env.example` -> `frontend/.env`

Backend variables include `MONGO_URI`, `JWT_SECRET`, `GEMINI_API_KEY`, and `GEMINI_MODEL`. Never commit real credentials.

## Production Build

```bash
npm run build
npm start
```

## Main API Routes

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/health` | GET | Backend, MongoDB, and Gemini status |
| `/api/auth/register` | POST | Register a user |
| `/api/auth/login` | POST | Authenticate a user |
| `/api/products` | GET | Browse products |
| `/api/cart` | GET/POST | Manage cart items |
| `/api/orders` | GET/POST | Manage orders |
| `/api/ai/chat` | POST | Gemini shopping assistant |
| `/api/ai/recommendations` | POST | Catalog recommendations |
| `/api/ai/compare` | POST | Compare products |
