# User Management System

This document provides an overview of the **User Management System** implemented in the application. The system is designed to handle different types of users: **Admin**, **Corporate Users**, and **Normal Users**. Each user type has its own specific attributes and functionalities, and the system ensures proper segregation and management of these users.

---

## **Overview**

The User Management System is built around the following entities:

1. **Users**: A base entity that defines common attributes for all user types.
2. **Admins**: Users who can manage the system. They can be either regular admins or superadmins.
3. **Corporate Users**: Users who belong to an organization and have access to organization-specific features.
4. **Normal Users**: Regular users who can access the system for personal use.

---

## **Entities and Relationships**

### **Entities**
1. **Users**
   - `userId`: Primary key (UUID).
   - `userType`: Enum (`admin`, `corporate`, `normal`).
   - `created_at`: Timestamp for creation.
   - `updated_at`: Timestamp for updates.

2. **Admins**
   - `id`: Primary key (auto-increment).
   - `name`: Name of the admin.
   - `email`: Unique email address.
   - `password`: Hashed password.
   - `superAdmin`: Boolean flag to indicate if the admin is a superadmin.
   - `userId`: Foreign key to the `Users` table.

3. **Corporate Users**
   - `id`: Primary key (auto-increment).
   - `organizationId`: Foreign key to the `Organizations` table.
   - `normalUserId`: Foreign key to the `NormalUsers` table.
   - `userId`: Foreign key to the `Users` table.

4. **Normal Users**
   - `id`: Primary key (auto-increment).
   - `firstName`: First name of the user.
   - `lastName`: Last name of the user.
   - `email`: Unique email address.
   - `password`: Hashed password.
   - `isEmailVerified`: Boolean flag to indicate if the email is verified.
   - `phone`: Phone number of the user.
   - `profilePicture`: URL or path to the profile picture.
   - `lastLogin`: Timestamp of the last login.
   - `oAuthProvider`: OAuth provider (e.g., Google, Facebook).
   - `oAuthId`: OAuth ID.
   - `userId`: Foreign key to the `Users` table.

---

### **Relationships**
- **Users** is the base entity, and **Admins**, **Corporate Users**, and **Normal Users** extend it.
- **Admins** can be regular admins or superadmins.
- **Corporate Users** belong to an organization and are linked to **Normal Users**.
- **Normal Users** represent individual users with personal accounts.

---

## **ER Diagram**

Below is the Entity-Relationship Diagram (ERD) for the User Management System:

![ERD Placeholder](/assets/images/users_erd.png)

*(Replace the `#` in the image tag with the actual path to your ERD image.)*

---

## **Functionality**

### **Admin Management**
1. **Create Admin**:
   - Admins can be created by providing their name, email, and password.
   - The password is hashed before being stored in the database.
   - A corresponding entry is created in the `Users` table with `userType` set to `admin`.

2. **Update Admin**:
   - Admins can update their profile information, including their name, email, and password.
   - If the password is updated, it is hashed before being stored.

3. **Get All Admins**:
   - Retrieves a paginated list of all admins.
   - Supports sorting and filtering.

4. **Get Admin by ID**:
   - Retrieves the details of a specific admin by their `userId`.

5. **Delete Admin**:
   - Admins can be deleted by their `userId`.
   - Superadmins cannot be deleted.

---

### **Corporate User Management**
1. **Create Corporate User**:
   - Corporate users are created by linking them to an organization and a normal user.

2. **Update Corporate User**:
   - Corporate user details can be updated.

3. **Get All Corporate Users**:
   - Retrieves a paginated list of all corporate users.

4. **Get Corporate User by ID**:
   - Retrieves the details of a specific corporate user by their `userId`.

5. **Delete Corporate User**:
   - Corporate users can be deleted by their `userId`.

---

### **Normal User Management**
1. **Create Normal User**:
   - Normal users are created by providing their personal details (e.g., name, email, password).
   - The password is hashed before being stored.

2. **Update Normal User**:
   - Normal users can update their profile information, including their name, email, and password.
   - If the password is updated, it is hashed before being stored.

3. **Get All Normal Users**:
   - Retrieves a paginated list of all normal users.

4. **Get Normal User by ID**:
   - Retrieves the details of a specific normal user by their `userId`.

5. **Delete Normal User**:
   - Normal users can be deleted by their `userId`.

---

## **Folder Structure**

The user management system is organized into the following folder structure:

```
users/
├── admin/                # Admin-related controllers, services, and repositories
├── corporate-users/      # Corporate user-related controllers, services, and repositories
├── normal-users/         # Normal user-related controllers, services, and repositories
├── organizations/        # Organization-related controllers, services, and repositories
├── users.model.js        # Base User model
├── users.repository.js   # Base User repository
```

---

## **API Endpoints**

### **Admin Endpoints**
- `GET /admins`: Get all admins.
- `POST /admins`: Create a new admin.
- `GET /admins/:userId`: Get admin by ID.
- `PUT /admins/:userId`: Update admin by ID.
- `DELETE /admins/:userId`: Delete admin by ID.

### **Corporate User Endpoints**

### **Normal User Endpoints**

---

## **Conclusion**

The User Management System provides a robust and scalable way to manage different types of users in the application. By separating users into **Admins**, **Corporate Users**, and **Normal Users**, the system ensures proper access control and functionality for each user type.
