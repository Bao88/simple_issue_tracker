const router = require("express").Router();

// Get all issues
router.get("/issues", (request, response) => {
  response.send("issues");
});

// Get all issues
router.post("/issue", (request, response) => {
  response.send(response.locals.user);
});

// Get all issues
router.put("/issue", (request, response) => {
  response.send(response.locals.user);
});

module.exports = router;
