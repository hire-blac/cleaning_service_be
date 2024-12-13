export const authorizePermissions = (...permissions) => {
    return (req, res, next) => {
      const adminPermissions = req.admin.role.permissions;  // Assuming `permissions` is an array on the `admin` object
      if (!permissions.every(permission => adminPermissions.includes(permission))) {
        return res.status(403).json({ message: 'Forbidden, insufficient permissions' });
      }
      next();
    };
  };
  