const router = require("express").Router();

const db = require("../utils/database");
const asynCatch = require("../utils/asynCatch");
const { ErrorHandler } = require("../utils/error");

// GET /api/users
router.get(
  "/",
  asynCatch(async (req, res, next) => {
    const { rows } = await db.query("SELECT * FROM person LIMIT 50;");

    if (!rows.length) return next(new ErrorHandler(`Rows not found in table!`, 404));

    res.status(200).json({
      status: "success",
      data: { rows },
    });
  })
);

// GET /api/users/:id
router.get(
  "/:id",
  asynCatch(async (req, res, next) => {
    const { id } = req.params;
    const { rows } = await db.query(
      "SELECT * FROM person WHERE first_name=$1;",
      [id]
    );

    if (!rows.length)
      return next(new ErrorHandler("Rows not found with given ID!", 404));

    res.status(200).json({
      status: "success",
      data: { rows },
    });
  })
);

module.exports = router;
