# 🌐 NodeContacts API

A feature-rich 🚀 RESTful API for managing contacts, built using Node.js, Express.js, MongoDB, and JWT for authentication. The API supports user registration, login, CRUD operations for contacts, and user-based access control.

## 📚 Table of Contents

- [Prerequisites](#📋-Prerequisites)
- [Installation](#⚙️-installation)
- [API Endpoints](#🔗-api-endpoints)
- [Code Structure](#📁-code-structure)
- [Testing with Postman](#🚀-testing-with-postman)

## 📋 Prerequisites

Ensure you have the following installed:

- Node.js (v14.0 or higher)
- MongoDB (local or remote)

## ⚙️ Installation

1. Clone the repository

```bash
git clone https://github.com/username/nodecontacts.git
```

2. Change into the project directory

```bash
cd nodecontacts
```

3. Install the dependencies

```bash
npm install
```

4. Create a .env file in the root directory with the following
   content:

```bash
PORT=3030
ACCESS_TOKEN_SECRET=your_jwt_secret
MONGODB_URI=your_mongodb_connection_string
```

5. Start the development server

```bash
npm run dev
```

## 🔗 API Endpoints

- Register a user: `POST /api/users/register`
- Login a user: `POST /api/users/login`
- Get the current user: `GET /api/users/current`
- Retrieve all contacts: `GET /api/contacts`
- Create a new contact: `POST /api/contacts`
- Get a contact by ID: `GET /api/contacts/:id`
- Update a contact by ID: `PUT /api/contacts/:id`
- Delete a contact by ID: `DELETE /api/contacts/:id`

## 📁 Code Structure

- `server.js`: Main server entry point
- `config/dbConnection.js`: Database connection setup
- `controllers/`: Contains controller logic for each route
- `middleware/`: Contains custom middleware functions
- `models/`: Contains Mongoose schema definitions for database models
- `routes/`: Contains Express route definitions
- `constants.js`: Contains constant values used in the project
- `package.json`: Lists project dependencies and metadata
- `nodeContacts.postman_collection.json`: Postman collection for testing API endpoints

## 🚀 Testing with Postman

To test the API endpoints, import the `nodeContacts.postman_collection.json` file included in the repository into Postman. This file contains a pre-configured collection of requests for all available endpoints.
