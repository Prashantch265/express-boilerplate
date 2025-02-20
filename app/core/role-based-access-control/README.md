# Role-Based Access Control (RBAC) Implementation

This document explains the implementation of Role-Based Access Control (RBAC) in the system. The RBAC system is designed to provide granular control over resources, ensuring that users can only access the screens and perform actions they are authorized for.

---

## **Overview**

The RBAC system is built around the following entities:

1. **Modules**: Represent major sections of the application (e.g., `UserManagement`, `Billing`, `Reports`).
2. **Screens**: Represent individual pages or views within a module (e.g., `UserList`, `UserDetails`, `CreateUser`).
3. **Permissions**: Define actions that can be performed on a screen or module (e.g., `read`, `create`, `update`, `delete`).
4. **Roles**: Group permissions together and assign them to users.
5. **Users**: Interact with the system and are assigned roles to determine their access levels.

---

## **Entities and Relationships**

### **Entities**
1. **Modules**
   - `id`: Primary key.
   - `name`: Name of the module (e.g., `UserManagement`).
   - `code`: Unique code for the module.
   - `description`: Description of the module.

2. **Screens**
   - `id`: Primary key.
   - `name`: Name of the screen (e.g., `UserList`).
   - `description`: Description of the screen.
   - `moduleId`: Foreign key to the `Modules` table.

3. **Permissions**
   - `id`: Primary key.
   - `name`: Name of the permission (e.g., `read`, `create`, `update`, `delete`).
   - `code`: Unique code for the permission.
   - `description`: Description of the permission.

4. **Roles**
   - `id`: Primary key.
   - `name`: Name of the role (e.g., `Admin`, `Corporate`, `Normal`).
   - `code`: Unique code for the role.
   - `description`: Description of the role.

5. **RolesPermissions**
   - `roleId`: Foreign key to the `Roles` table.
   - `screenId`: Foreign key to the `Screens` table.
   - `permissionId`: Foreign key to the `Permissions` table.

6. **UserRoles**
   - `userId`: Foreign key to the `Users` table.
   - `roleId`: Foreign key to the `Roles` table.

---

### **Relationships**
- A **Module** can have multiple **Screens**.
- A **Screen** can have multiple **Permissions**.
- A **Role** can have multiple **Permissions** through the **RolesPermissions** table.
- A **User** can have multiple **Roles** through the **UserRoles** table.

---

## **ER Diagram**

Below is the Entity-Relationship Diagram (ERD) for the RBAC system:

![ERD Placeholder](/assets/images/role_based_access_control_erd.png)

---

## **How It Works**

1. **Define Modules and Screens**:
   - Modules represent major sections of the application (e.g., `UserManagement`).
   - Screens represent individual pages or views within a module (e.g., `UserList`).

2. **Define Permissions**:
   - Permissions define actions that can be performed on a screen (e.g., `read`, `create`, `update`, `delete`).

3. **Create Roles**:
   - Roles group permissions together (e.g., `Admin` role with `read`, `create`, `update`, `delete` permissions for the `UserList` screen).

4. **Assign Roles to Users**:
   - Users are assigned roles to determine their access levels.

5. **Validate Permissions**:
   - When a user attempts to access a screen or perform an action, the system checks if the user has the required permission.

---

## **API Endpoint Validation**

The system validates API requests by checking if the user has the required permission for the requested screen and action. This is done using middleware.

### **Middleware Example**

```javascript
const checkPermission = (screenName, permissionName) => {
    return async (req, res, next) => {
        const userId = req.user.id; // Assuming user is authenticated
        const screen = await Screen.findOne({ where: { name: screenName } });
        const permission = await Permission.findOne({
            where: { name: permissionName, screenId: screen.id },
        });
        const userPermission = await UserRole.findOne({
            include: [
                {
                    model: Role,
                    include: [
                        {
                            model: Permission,
                            where: { id: permission.id },
                        },
                    ],
                },
            ],
            where: { userId },
        });

        if (!userPermission) {
            return res.status(403).json({ message: "Forbidden" });
        }
        next();
    };
};
```

### **Protecting an Endpoint**

```javascript
app.delete(
    "/users/:id",
    checkPermission("UserList", "delete"),
    async (req, res) => {
        // Delete user logic
    }
);
```

---

## **Frontend Integration**

1. **Fetch User Permissions**:
   - Fetch the user’s permissions when they log in and store them in the frontend state (e.g., Redux or Context API).

   ```javascript
   const permissions = await api.get("/user/permissions");
   ```

2. **Conditional Rendering**:
   - Use the permissions to conditionally render UI elements.

   ```javascript
   const canDeleteUser = permissions.some(
       (p) => p.screen === "UserList" && p.name === "delete"
   );

   return (
       <button disabled={!canDeleteUser} onClick={deleteUser}>
           Delete User
       </button>
   );
   ```

---

## **Conclusion**

This RBAC implementation provides a flexible and scalable way to manage user permissions and access control. By defining modules, screens, permissions, and roles, the system ensures that users can only access the resources they are authorized for.

---