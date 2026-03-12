<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Frontend setup

This app is a Vite frontend that should talk to a separate backend API.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Create a local env file from the examples and point it to your backend API.
   Use `.env.development` for local work.
3. Set `VITE_API_BASE_URL` to your backend origin.
   Example: `http://localhost:8000`
4. Optionally set `VITE_DEV_API_PROXY_TARGET` for the Vite dev proxy.
   Example: `http://localhost:8000`
3. Run the app:
   `npm run dev`

## Deployment

For production, provide `VITE_API_BASE_URL` as the public backend origin.

- Frontend example: `https://www.edupath.ai`
- Backend example: `https://api.edupath.ai`

No private API keys or backend secrets should be stored in the frontend env.
