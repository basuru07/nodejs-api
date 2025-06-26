# Node.js REST API with MySQL

This project is a RESTful API built with Node.js, Express, and MySQL, providing user authentication and product management functionalities. It includes secure user registration/login with JWT authentication and CRUD operations for managing products.

## Features

- **User Authentication**:
  - Register new users with username, email, and password
  - Login with email and password to receive a JWT token
  - Password hashing using bcryptjs
  - JWT-based authentication for protected routes
- **Product Management**:
  - Create, read, update, and delete (CRUD) products
  - Input validation for product data
- **Security**:
  - Parameterized SQL queries to prevent SQL injection
  - CORS configuration
  - Consistent error handling
- **API Response Format**:
  - Standardized JSON responses with `success`, `message`, and `data` fields

## Prerequisites

- Node.js (v14 or higher)
- MySQL Server
- A code editor (e.g., VS Code)
- Postman or similar API testing tool

## Installation

1. **Clone the Repository** (if applicable):
   ```bash
   git clone https://github.com/basuru07/nodejs-api.git
   cd nodejs-api
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up MySQL Database**:
   - Create a MySQL database and tables by running the following SQL commands:
     ```sql
     CREATE DATABASE nodejs_api;
     USE nodejs_api;

     CREATE TABLE users (
         id INT AUTO_INCREMENT PRIMARY KEY,
         username VARCHAR(50) UNIQUE NOT NULL,
         email VARCHAR(100) UNIQUE NOT NULL,
         password VARCHAR(255) NOT NULL,
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     );

     CREATE TABLE products (
         id INT AUTO_INCREMENT PRIMARY KEY,
         name VARCHAR(100) NOT NULL,
         price DECIMAL(10, 2) NOT NULL,
         quantity INT NOT NULL DEFAULT 0,
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
     );
     ```

4. **Configure Environment Variables**:
   - Create a `.env` file in the project root and add the following:
     ```env
     PORT=3000
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=your_mysql_password
     DB_NAME=nodejs_api
     JWT_SECRET=your_jwt_secret_key_here
     ```

5. **Run the Application**:
   - For development (with auto-restart):
     ```bash
     npm run dev
     ```
   - For production:
     ```bash
     npm start
     ```

## Project Structure

```
nodejs-api/
├── config/
│   └── database.js          # MySQL connection configuration
├── controllers/
│   ├── authController.js    # User authentication logic
│   └── productController.js # Product CRUD logic
├── middleware/
│   └── auth.js             # JWT authentication middleware
├── models/
│   ├── User.js             # User model for database operations
│   └── Product.js          # Product model for database operations
├── routes/
│   ├── auth.js            # Authentication routes
│   └── products.js        # Product routes
├── .env                   # Environment variables
├── server.js              # Main server file
├── package.json           # Project metadata and scripts
└── README.md              # Project documentation
```

## API Endpoints

### Authentication
- **Register User**:
  - `POST /api/auth/register`
  - Body: `{ "username": "john_doe", "email": "john@example.com", "password": "password123" }`
- **Login User**:
  - `POST /api/auth/login`
  - Body: `{ "email": "john@example.com", "password": "password123" }`

### Products
- **Get All Products**:
  - `GET /api/products`
- **Get Product by ID**:
  - `GET /api/products/:id`
- **Create Product**:
  - `POST /api/products`
  - Body: `{ "name": "iPhone 15", "price": 999.99, "quantity": 50 }`
- **Update Product**:
  - `PUT /api/products/:id`
  - Body: `{ "name": "iPhone 15 Pro", "price": 1199.99, "quantity": 30 }`
- **Delete Product**:
  - `DELETE /api/products/:id`

**Note**: Product routes (POST, PUT, DELETE) require a valid JWT token in the `Authorization` header as `Bearer <token>`.

## Example API Response

```json
{
    "success": true,
    "message": "Operation successful",
    "data": {
        // Response data
    }
}
```

## Error Handling

The API handles:
- Validation errors (400)
- Authentication errors (401)
- Not found errors (404)
- Server errors (500)
