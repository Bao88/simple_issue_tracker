const router = require("express").Router();
const Issue = require("../../models/Issue");

/* Routes */
// Get all issues
router.get("/issues", (request, response) => {
  Issue.find({}, (error, issues) => {
    if (error) response.status(400).send(error);
    else response.send(issues);
  });
});

// Post issue
router.post("/issue", (request, response) => {
  const body = request.body;

  // create an issue
  Issue.create(body, (error, issue) => {
    if (error) response.status(400).send(error);
    else response.send(issue);
  });
});

// Put/Update an issue
router.put("/issue", (request, response) => {
  const canChangeState = (originalState, newState) => {
    //Edge case if originalState == newState, it means we dont need to update state.
    if (originalState == newState) return true;

    return (
      originalState == "open" ||
      (originalState == "pending" && newState == "closed")
    );
  };

  const body = request.body;
  Issue.find({ _id: body.id }, (error, issue) => {
    if (error) response.status(400).send(error);
    else {
      // Test if the state can be changed
      if (canChangeState(issue.state, body.state)) {
        // Update the issue
        Object.assign(issue, body);
        issue.save((saveError, savedIssue) => {
          if (saveError) response.status(400).send(saveError);
          else response.send(savedIssue);
        });
      } else {
        response.status(422).send(new Error("State can't be changed"));
      }
    }
  });
});

module.exports = router;
