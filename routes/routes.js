const express = require("express");
const router = express.Router();
const dataController = require("../controllers/controllers");
const userController = require("../controllers/usercontroller");
const auth = require("../auth");

// GET /
router.get("/", (req, res) => {
  res.send("Hello, World!");
});

// GET /api
router.get("/api", auth, async (req, res) => {
  try {
    const data = await dataController.getAllData();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET /api/:id
router.get("/api/:id", verifyCustomHeader, async (req, res) => {
  try {
    const data = await dataController.getDataById(req.params.id);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST /api
router.post("/api", async (req, res) => {
  try {
    console.log(req.body);
    const newData = await dataController.createData(req.body);
    console.log(newData);
    res.json(newData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT /api/:id
router.put("/api/:id", async (req, res) => {
  try {
    const updatedData = await dataController.updateData(
      req.params.id,
      req.body
    );
    res.json(updatedData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE /api/:id
router.delete("/api/:id", async (req, res) => {
  try {
    const deletedData = await dataController.deleteData(req.params.id);
    res.json(deletedData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Register
router.post("/register", async (req, res) => {
  try {
    const data = await userController.register(req.body);
    // res.json(data);
    res.redirect("/login");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const token = await userController.login(req.body);
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true, // Set the "Secure" flag
    });
    res.redirect("/api");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/login", async (req, res) => {
  res.render("login");
});

function verifyCustomHeader(req, res, next) {
  const expectedHeaderValue = "xyz";
  const requestHeaderValue = req.headers["filmaccess"];
  console.log(requestHeaderValue);
  console.dir(req.headers);
  if (requestHeaderValue !== expectedHeaderValue) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
}

module.exports = router;
