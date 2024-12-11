# User API Documentation

## Overview

This API provides authentication and user management functionality, including user registration, login, profile retrieval, and logout. It uses JWT for authentication and a token blacklist mechanism for secure logout.

---

## Endpoints

### **1. Register User**

- **URL**: `/api/register`
- **Method**: `POST`
- **Description**: Registers a new user with their name, email, and password.
- **Request Body**:
  ```json
  {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "your-password"
  }
  ```
- **Response**:
  - **201 Created**: User is successfully registered.
    ```json
    {
      "user": {
        "_id": "unique-user-id",
        "firstname": "John",
        "lastname": "Doe",
        "email": "john.doe@example.com"
      }
    }
    ```
  - **400 Bad Request**: Validation errors or missing fields.

---

### **2. Login User**

- **URL**: `/api/login`
- **Method**: `POST`
- **Description**: Logs in a user with their email and password.
- **Request Body**:
  ```json
  {
    "email": "john.doe@example.com",
    "password": "your-password"
  }
  ```
- **Response**:
  - **200 OK**: Login successful, returns the user and a JWT token.
  - **401 Unauthorized**: Invalid email or password.

---

### **3. Get User Profile**

- **URL**: `/api/profile`
- **Method**: `GET`
- **Description**: Retrieves the profile of the authenticated user.
- **Headers**:
  - Authorization: `Bearer jwt-token`
- **Response**:
  - **200 OK**: User's profile.

---

### **4. Logout User**

- **URL**: `/api/logout`
- **Method**: `POST`
- **Description**: Logs out the user and blacklists the current token.
- **Headers**:
  - Authorization: `Bearer jwt-token`
- **Response**:
  - **200 OK**: Logout successful.

---

## How to Run

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npm start
   ```
3. Use a tool like **Postman** or **cURL** to test the endpoints.


