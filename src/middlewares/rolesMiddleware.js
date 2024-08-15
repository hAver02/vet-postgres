const verifyRole = (allowedRoles) => {
    return (req, res, next) => {
      const userRole = req.user.role_id; 
    //   console.log(req.user);
    //   console.log(userRole);
      if(!userRole) return res.status(403).json({ok : false,  message: 'Access denied1' }); 
      if (allowedRoles.includes(userRole)) {
        next(); 
      } else {
        res.status(403).json({ok : false,  message: 'Access denied' }); 
      }
    };
  };

module.exports = verifyRole;