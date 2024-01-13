# RBAC Authentication API with Node.js, MongoDB, and JWT

This project is a Role-Based Access Control (RBAC) authentication API built using Node.js, MongoDB as the database, and JSON Web Tokens (JWT) for authentication.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Postman Collection](#postman-collection)
- [Packages and Modules Used](#packages-and-modules-used)

## Overview

This API provides RBAC authentication with user management capabilities. It includes endpoints for user registration, login, and CRUD operations for managing users. Access to certain routes is restricted based on the user's role.

## Features

- User registration with hashed password storage
- JWT-based authentication
- Role-based access control (RBAC)
- CRUD operations for user management
- Sample routes for dashboard, settings, and statistics with access control

## Installation

1. **Clone the repository:**

- git clone https://github.com/your-username/rbac-auth-api.git

2. **Navigate to the project directory:**

- cd rbac_api_stack

3. **Install dependencies:**

- npm install

4. **Set up MongoDB**

- Make sure you have MongoDB installed and running on your local machine.
- Create a .env file in the root of your project and add the following details:
  - PORT
  - MONGODB_URI
  - ACCESS_TOKEN_SECRET
  - ACCESS_TOKEN_EXPIRY

5. **Start the server**

npm run dev

## Usage

- To test the API, you can use tools like Postman. Make sure to check the Postman Collection section for a set of example requests.

## API Endpoints

- POST /api/v1/login: User login with email and password.
- POST /api/v1/users: Create a new user (admin access required).
- GET /api/v1/users: Get all users (admin access required).
- GET /api/v1/users/:userId: Get a specific user by ID (admin access required).
- PUT /api/v1/users/:userId: Update a user by ID (admin access required).
- DELETE /api/v1/users/:userId: Delete a user by ID (admin access required).
- GET /api/v1/dashboard: Access the dashboard (admin access required).
- GET /api/v1/settings: Access user settings (user access required).
- GET /api/v1/statistics: Access statistics (admin access required).

## Environment Variables
- PORT: The port on which the server will run.
- MONGODB_URI: The MongoDB connection URI.
- ACCESS_TOKEN_SECRET: Secret key for JWT token generation.
- ACCESS_TOKEN_EXPIRY: Access token expiry 

## Postman Collection

- https://universal-trinity-860635.postman.co/workspace/New-Team-Workspace~528179e8-54b3-4883-b926-efb196ba0401/collection/17641742-f3a58b94-b070-4077-af4d-c3f4695e9275?action=share&creator=17641742&active-environment=17641742-7e02cab2-9804-4c4b-a44e-5a9f0285def2

## Packages and Modules Used

- Express: Fast, unopinionated, minimalist web framework for Node.js.
- Mongoose: MongoDB object modeling tool.
- Jsonwebtoken: JSON Web Token implementation for Node.js.
- Bcrypt: Password hashing library.
- cookie-parser: sending cookies
