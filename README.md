🚀 Prodigy Internship – Task 03: JWT-Based Authentication & Authorization
💡 Project Overview

As part of my ProDigy Infotech internship, I enhanced my REST API by implementing secure authentication and authorization, ensuring that user data and API access are protected using modern security standards.

This upgrade makes the API production-ready, with role-based access and secure endpoints.

✨ Key Implementations
✅ User Registration & Login: Added endpoints for secure onboarding of users.

✅ Password Security: Stored passwords safely using bcrypt hashing.

✅ JWT Authentication: Generated JSON Web Tokens upon successful login to authenticate users.

✅ Protected Routes: Secured sensitive endpoints like /users and /profile to allow access only for authenticated users.

✅ Role-Based Access Control (RBAC): Implemented roles such as Admin, User, Owner to restrict access to specific endpoints.

✅ Production-Ready Security: Strengthened the API with modern security practices for scalability and reliability.

🛠 Features & Endpoints
Method	Endpoint	Description
POST	/register	Register a new user
POST	/login	Authenticate a user and return a JWT token
GET	/users	Protected: Get all users
GET	/profile	Protected: Get logged-in user profile
PUT	/users/:id	Protected: Update user details (role-based)
DELETE	/users/:id	Protected: Delete user (role-based)

⚡ Technologies & Tools
Node.js & Express.js – Backend server & routing

MongoDB / MySQL – Database storage

bcrypt – Secure password hashing

jsonwebtoken (JWT) – Authentication & token management

Role-Based Access Control (RBAC) – User authorization

🚀 Skills & Learnings
Implemented secure authentication for backend APIs

Learned JWT token generation and verification

Applied RBAC to restrict access for different user roles

Strengthened overall API security

Best practices for production-ready applications

👩‍💻 Author

Deepika S. – Prodigy Internship Participant
