const router = require("express").Router();
const Issue = require("../../models/Issue");

/* Routes */
// Get all issues
router.get("/issues", (request, response) => {
  Issue.find({}, (error, issues) => {
    if (error) respond.status(400).send(error);
    else respond.send(issues);
  });
});

// Post issue
router.post("/issue", (request, response) => {
  // create an empty issue
  Issue.create({}, (error, issue) => {
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
  /*
  We can also test on the backend
    Test if body is a valid issue
    States can change from.
    - Open -> Pending | Closed.
    - Pending -> Closed
    - Pending cant go back to Open
    - Closed cant go back to Pending nor Open.
    Suggestion:
    const canChangeState = (originalState, newState) => {
    //Edge case if originalState == newState, it means we dont need to update state.
    if (originalState == newState) return true;

    if (originalState == "open") return true;
    else if (originalState == "pending" && newState == "closed") return true;
    else return false;

    or

    return (
      originalState == "open" ||
      (originalState == "pending" && newState == "closed")
    );
  };
    else send back error(invalid data 422 or 400).
  */
  response.send(body);
});

module.exports = router;
