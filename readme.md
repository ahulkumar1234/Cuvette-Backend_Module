# 📚 Book Store API (Node.js + Express + MongoDB)
A REST API for managing users and books with authentication and authorization.


# 🚀 Features

- User Register & Login (JWT)
- Protected Routes using Auth Middleware
- Book CRUD (Create, Update, Delete)
- Ownership Security (Only owner can update/delete)
- MongoDB + Mongoose
- Proper status codes & validation

# 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcrypt (password hashing)
- cookie-parser
- doten

# 📂 Project Structure

```
src/
 ├── config/
 |    └── envVariable.js
 │    └── connectDB.js
 ├── controllers/
 │    ├── user.controller.js
 │    └── book.controller.js
 ├── middleware/
 │    └── auth.middleware.js
 ├── models/
 │    ├── user.model.js
 │    └── book.model.js
 ├── routes/
 │    ├── user.routes.js
 │    └── book.routes.js
 ├── app.js
 └── server.js
 ```
 # ⚙️ Installation

 ## 1) Clone the repository

 ```
 git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

## 2) Install dependencies
```
npm install
```
## 3) Setup environment variables

#### Create a ```.env``` file in the root folder:
```
PORT=5000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

# ▶️ Run Project
## Development mode
```
npm run dev
```
## Production mode
```
npm start
```
## 🔐 Authentication Flow

- User logs in and gets a JWT token.
- Token is stored in cookies or sent in Authorization header.
- Protected routes require valid token.

# 📌 API Endpoints
## ✅ User Routes
### Register

```POST /api/v1/users/register```

Body:
```json
{
  "name": "Rahul",
  "email": "rahul@gmail.com",
  "password": "123456"
}
```
### Login

```POST /api/v1/users/login```

# 📚 Book Routes
### Create Book (Protected)

```POST /api/v1/books/create```

Body:
```json
{
  "title": "Rich Dad Poor Dad",
  "author": "Robert Kiyosaki",
  "price": 999,
  "category": "Finance",
  "stock": 10,
  "description": "Best finance book"
}
```
### Update Book (Protected)

```PUT /api/v1/books/update/:bookId```

Body:
```json
{
  "price": 499,
  "stock": 20
}
```
### Delete Book (Protected)

```DELETE /api/v1/books/delete/:bookId```

### Get All Books

```GET /api/v1/books```

# 🔒 Authorization (Ownership)

### Only the user who created the book can update or delete it.

Example check:

```
if (findBook.userId.toString() !== req.user.id) {
  return res.status(403).json({ message: "Not allowed" });
}
```

# ✅ Status Codes Used

- 200 → Success
- 201 → Created
- 400 → Bad Request (empty/invalid fields)
- 401 → Unauthorized (token missing/invalid)
- 403 → Forbidden (not allowed)
- 404 → Not Found (user/book not found)
- 409 → Conflict (already exists)
- 500 → Server error

---
# 👨‍💻 Author

### Rahul Kumar

- GitHub: https://github.com/ahulkumar1234
- LinkedIn: https://www.linkedin.com/in/rahul-kumar-3990b618b

---
# ⭐ Support

## If you found this project helpful, please consider giving it a ⭐ on GitHub!