# Petfinder API

A RESTful API for managing animal shelters and the pets that live in them, built with **Node.js**, **Express**, and **MongoDB** (via Mongoose). Demonstrates two related collections with full CRUD, schema validation, and error handling.

## Data Model

The API has two collections with a **"has a"** relationship: a **Shelter has Pets**, and each **Pet belongs to a Shelter**.

### Shelter

| Field    | Type   | Rules                         |
| -------- | ------ | ----------------------------- |
| name     | String | required, max 100, **unique** |
| location | String | required, max 200             |
| phone    | String | max 20                        |

### Pet

| Field   | Type     | Rules                                         |
| ------- | -------- | --------------------------------------------- |
| name    | String   | required, max 50                              |
| type    | String   | required, enum: Dog / Cat / Bird / Other      |
| age     | Number   | required, min 0                               |
| shelter | ObjectId | required, references a Shelter (relationship) |

The `shelter` field is an ObjectId reference to the Shelter model. On GET requests, `populate()` replaces the id with the full shelter document.

**Data types used:** String, Number, ObjectId, plus enum-constrained String.

## Getting Started

### Prerequisites

- Node.js
- MongoDB running locally
- MongoDB Compass (optional, to view data)

### Install

```bash
npm install
```

### Environment

Create a `.env` file in the root:

```
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/petfinder
```

### Run

```bash
npm run dev   # development, with nodemon
npm start     # production
```

On startup you should see `MongoDB Connected` and `Server is running on port 3000`.

## API Endpoints

Base URL: `http://localhost:3000/api/v1`

### Shelters

| Method | Endpoint      | Description      |
| ------ | ------------- | ---------------- |
| GET    | /shelters     | Get all shelters |
| GET    | /shelters/:id | Get one shelter  |
| POST   | /shelters     | Create a shelter |
| PUT    | /shelters/:id | Update a shelter |
| DELETE | /shelters/:id | Delete a shelter |

### Pets

| Method | Endpoint  | Description                        |
| ------ | --------- | ---------------------------------- |
| GET    | /pets     | Get all pets (shelter populated)   |
| GET    | /pets/:id | Get one pet (shelter populated)    |
| POST   | /pets     | Create a pet (requires shelter id) |
| PUT    | /pets/:id | Update a pet                       |
| DELETE | /pets/:id | Delete a pet                       |

## Example Requests

**Create a shelter**

```json
POST /api/v1/shelters
{
  "name": "Happy Tails",
  "location": "Boise",
  "phone": "208-555-0100"
}
```

**Create a pet** (use the `_id` returned from the shelter above)

```json
POST /api/v1/pets
{
  "name": "Luna",
  "type": "Cat",
  "age": 3,
  "shelter": "665f1c2a9b1e4a0012ab34cd"
}
```

A GET on that pet returns the shelter nested in full:

```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "Luna",
    "type": "Cat",
    "age": 3,
    "shelter": {
      "_id": "665f1c2a9b1e4a0012ab34cd",
      "name": "Happy Tails",
      "location": "Boise",
      "phone": "208-555-0100"
    }
  }
}
```

## Status Codes

| Code | Meaning                                |
| ---- | -------------------------------------- |
| 200  | OK — successful read, update, delete   |
| 201  | Created — successful POST              |
| 400  | Bad Request — validation or invalid id |
| 404  | Not Found — no document with that id   |
| 500  | Internal Server Error                  |

## Project Structure

```
app/
  db/config.js              MongoDB connection
  models/                   Mongoose schemas
    Shelters.js
    Pets.js
  controllers/              request logic
    shelterController.js
    petController.js
  routes/                   route definitions
    index.js
    shelterRoutes.js
    petRoutes.js
  messages/messages.js      shared response messages
  index.js                  Express app setup
server.js                   entry point
```

## Tech Stack

Node.js · Express · MongoDB · Mongoose · Morgan · dotenv

---

## AI Disclosure

This README was drafted by Claude (Anthropic) based on the project's file structure and source code, which I shared for reference. The API code itself is my own work.
