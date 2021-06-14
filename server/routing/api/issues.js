const router = require("express").Router();

/* We use a dictionary to act as our database in this simple project.
   We also initialize it with some data.
*/

let id = 0; //
class Issue {
  constructor(issue) {
    this.id = id++;
    this.title = issue.title || "";
    this.description = issue.description || "";
    this.state = issue.state || "open";
  }
}

const issues = new Map();

// Create test data
const issue1 = new Issue({
  title: "Create Simple Issue Tracker",
  description: "Implement viewer and interactions",
  state: "open",
});

const issue2 = new Issue({
  title: "Create Server",
  description: "Implement the routes",
  state: "pending",
});

// Add test data
issues.set(issue1.id, issue1);
issues.set(issue2.id, issue2);

/* Routes */
// Get all issues
router.get("/issues", (request, response) => {
  const issuesJSON = Object.fromEntries(issues); // Convert Map to JSON
  response.send(issuesJSON);
});

// Post issue
router.post("/issue", (request, response) => {
  // create an empty issue
  const issue = new Issue();
  issues.set(issue.id, issue);
  /*
    Test if body is a valid issue
    Newly created issues should always have state as 'open" ?
    if valid create an Issue with new Issue (request.body) and use "set"
    else send back error(invalid data 422 or 400).
  */
  response.send(issue);
});

// Put/Update an issue
router.put("/issue", (request, response) => {
  const body = request.body;

  // Update the issue
  issues.set(body.id, body);

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
