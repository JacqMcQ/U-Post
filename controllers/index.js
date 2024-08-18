const router = require("express").Router();
const userRoutes = require("./api/userRoutes");
const homeRoutes = require("./home-routes");

router.use("/api/users", userRoutes);
router.use("/", homeRoutes);

module.exports = router;
