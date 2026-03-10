# Grocery Frontend

This React app is the frontend for the Grocery Bud DRF backend.

## Local Run

1. Create a `.env` file from `.env.example`.
2. Set your backend URL:

```env
REACT_APP_API_BASE_URL=http://127.0.0.1:8000/api/grocery
```

3. Install and run:

```bash
npm install
npm start
```

## Vercel Deployment

1. Import this folder (`grocery-frontend`) as a Vercel project.
2. Framework preset: `Create React App`.
3. Add environment variable in Vercel:

```env
REACT_APP_API_BASE_URL=https://your-backend-domain/api/grocery
```

4. Deploy.

`vercel.json` is included for SPA routing support.