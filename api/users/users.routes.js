const router = require("express").Router();
const User = require("./users.model");
const asyncCatch = require("../../utils/asynCatch");
const { ErrorHandler } = require("../../utils/error");
const logger = require("../../utils/logger");

// GET all users
router.get(
  "/",
  asyncCatch(async (req, res, next) => {
    const users = await User.query();
    if (!users.length)
      return next(new ErrorHandler("rows not found in table!", 404));
    res.json({
      message: "success",
      data: users,
    });
  })
);

// GET specific user with ID
router.get(
  "/:id",
  asyncCatch(async (req, res, next) => {
    const { id } = req.params;
    const users = await User.query().findById(id);
    if (!users) return next(new ErrorHandler("rows not found in table!", 404));
    res.json({
      message: "success",
      data: users,
    });
  })
);

// POST new user
router.post(
  "/",
  asyncCatch(async (req, res, next) => {
    const newUser = await User.query().insert(req.body);
    if (!Object.keys(newUser).length)
      return next(new ErrorHandler("user not inserted in table!", 403));
    res.json({
      message: "success",
      data: newUser,
    });
  })
);

// PUT existing user
router.put(
  "/:id",
  asyncCatch(async (req, res, next) => {
    const { id } = req.params;
    const users = await User.query()
      .patch(req.body)
      .where("id", id)
      .returning("*");
    if (!users.length) return next(new ErrorHandler("user not updated!", 403));
    res.json({
      message: "success",
      data: users,
    });
  })
);

// DELETE specific user
router.delete(
  "/:id",
  asyncCatch(async (req, res, next) => {
    const { id } = req.params;
    const users = await User.query().delete().where("id", id).returning("*");
    if (!users.length) return next(new ErrorHandler("no user deleted!", 403));
    res.json({
      message: "success",
      data: users,
    });
  })
);

module.exports = router;
