const router = require("express").Router();
const validator = require("validator");
const User = require("../models/User");
const { protect, allowRoles, ownerOrAdmin } = require("../middleware/auth");

// All routes below require authentication
router.use(protect);

/**
 * GET /users  (admin only)
 */
router.get("/", allowRoles("admin"), async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

/**
 * GET /users/:id  (owner or admin)
 */
router.get("/:id", ownerOrAdmin("id"), async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

/**
 * PUT /users/:id  (owner or admin)
 * Allows updating name, email, age, role (role only by admin)
 */
router.put("/:id", ownerOrAdmin("id"), async (req, res) => {
  try {
    const { name, email, age, role } = req.body;

    if (email && !validator.isEmail(email))
      return res.status(400).json({ error: "Invalid email" });
    if (age !== undefined && (Number.isNaN(Number(age)) || Number(age) <= 0))
      return res.status(400).json({ error: "Age must be a positive number" });

    // Only admin can change roles
    const update = { };
    if (name !== undefined) update.name = name;
    if (email !== undefined) update.email = email;
    if (age !== undefined) update.age = age;
    if (role !== undefined) {
      if (req.user.role !== "admin")
        return res.status(403).json({ error: "Only admin can change role" });
      update.role = role;
    }

    const user = await User.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
      select: "-password"
    });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * DELETE /users/:id  (admin or owner)
 */
router.delete("/:id", ownerOrAdmin("id"), async (req, res) => {
  const deleted = await User.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ error: "User not found" });
  res.status(204).send();
});

module.exports = router;
