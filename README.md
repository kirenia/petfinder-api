# Petfinder — Full Stack (React + Node)

A full-stack application for managing animal shelters and the pets that live in them. The **React** frontend (client) talks to the **Node/Express/MongoDB** backend (server) over HTTP using Axios, with full CRUD on both collections.

Built for SSL Assignment 4.6.

## what it does

- Loads all shelters and pets from the backend on page load (`useEffect`)
- Add, edit, and delete pets
- Add and delete shelters
- Each pet is assigned to a shelter, and the shelter shows up populated on the pet
- All data lives in MongoDB and is served by the Node API

## structure

```
petfinder/
  server/          Node + Express + MongoDB API (the backend)
    app/           routes, controllers, models, services
    server.js      entry point
  client/          React app built with Vite (the frontend)
    src/
      App.jsx      main component — state, effects, CRUD handlers
      api.js       axios service — all backend calls live here
```

## prerequisites

- Node.js
- MongoDB running locally

## running the app

You need **both** the server and the client running at the same time, in two terminals.

### 1. start the backend (server)

```bash
cd server
npm install
npm run dev
```

Runs on `http://localhost:3000`. You should see `MongoDB Connected` and `Server is running on port 3000`.

The backend has CORS enabled so the client can call it from a different port.

### 2. start the frontend (client)

```bash
cd client
npm install
npm run dev
```

Runs on `http://localhost:5173` (Vite's default). Open that URL in your browser.

## how it works

- **`api.js`** — an Axios instance pointed at `http://localhost:3000/api/v1`, with one function per endpoint (`getPets`, `createPet`, `updatePet`, `deletePet`, and the same for shelters). Keeping all calls in one file keeps the components clean.
- **`App.jsx`** — holds pets and shelters in `useState`. On mount, `useEffect` fetches both. Each create/update/delete calls the API, then refetches so the UI stays in sync with the database.
- The backend responses are shaped `{ success, data }`, so the client reads the array from `res.data.data`.

## tech

React · Vite · Axios · Node.js · Express · MongoDB · Mongoose

Styling uses the Catppuccin Latte palette.

---

## AI Disclosure

Claude (Anthropic) helped organize and format this README professionally based on my project's structure and code, which I shared for reference. The application code is my own work.
