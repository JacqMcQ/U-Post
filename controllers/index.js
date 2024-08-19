const router = require("express").Router();
const userRoutes = require("./api/userRoutes");
const homeRoutes = require("./home-routes");
const dashboardRoutes = require("./dashboard-routes");

router.use("/api/users", userRoutes);
router.use("/", homeRoutes);
router.use("/dashboard", dashboardRoutes);

module.exports = router;
