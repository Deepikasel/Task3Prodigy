const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Verify JWT and attach req.user = { id, role }
exports.protect = async (req, res, next) => {
  try {
    const auth = req.headers.authorization || "";
    const token = auth.startsWith("Bearer ") ? auth.split(" ")[1] : null;
    if (!token) return res.status(401).json({ error: "Not authorized, token missing" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // fetch user (without password)
    const user = await User.findById(decoded.id).select("_id role name email");
    if (!user) return res.status(401).json({ error: "User no longer exists" });

    req.user = { id: user._id.toString(), role: user.role };
    next();
  } catch (err) {
    return res.status(401).json({ error: "Not authorized, token invalid" });
  }
};

// Role guard: only allowed roles can pass
exports.allowRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user?.role)) {
      return res.status(403).json({ error: "Forbidden: insufficient role" });
    }
    next();
  };
};

// Owner or Admin guard
exports.ownerOrAdmin = (paramIdField = "id") => {
  return (req, res, next) => {
    const targetId = req.params[paramIdField];
    if (req.user.role === "admin" || req.user.id === targetId) return next();
    return res.status(403).json({ error: "Forbidden: not owner/admin" });
  };
};
