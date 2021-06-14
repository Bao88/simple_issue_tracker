<template>
  <div class="issue-tracker-grid">
    <button class="create-issue-button" @click="createIssue">
      Create issue
    </button>

    <div
      v-for="columnIndex in 3"
      class="flex-container border"
      :key="'issue column' + columnIndex"
    >
      <div
        v-for="(issue, issueIndex) in getIssuesWithState(columnIndex - 1)"
        :key="`column-${columnIndex}-issue-${issueIndex}`"
        class="issue"
      >
        <!-- Add the issue if it is in the correct column and create unique id for each issue -->
        <label :for="`issue-title-${columnIndex}-${issueIndex}`">Title: </label>
        <input
          :id="`issue-title${columnIndex}-${issueIndex}`"
          type="text"
          class="full-width"
          v-model="issue.title"
          @blur="updateIssue(issue)"
        />

        <label :for="`issue-state-${columnIndex}-${issueIndex}`">State: </label>
        <select
          name="state"
          :id="`issue-state-${columnIndex}-${issueIndex}`"
          @change="updateIssueState(issue, $event)"
        >
          <option value="open" :selected="'open' == issue.state">open</option>
          <option value="pending" :selected="'pending' == issue.state">
            pending
          </option>
          <option value="closed" :selected="'closed' == issue.state">
            closed
          </option>
        </select>

        <label
          class="full-width"
          :for="`issue-description-${columnIndex}-${issueIndex}`"
          >Description:
        </label>
        <textarea
          :id="`issue-description-${columnIndex}-${issueIndex}`"
          type="text"
          v-model="issue.description"
          @blur="updateIssue(issue)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

// constants
const server = "http://localhost:8080/api/";
const states = ["open", "pending", "closed"];

export default {
  name: "IssueTrackerView",
  components: {},
  setup() {
    const issues = ref([]);

    // Methods
    const printError = (error) => {
      console.log(error);
    };

    const canChangeState = (originalState, newState) => {
      //Edge case if originalState == newState, it means we dont need to update state.
      if (originalState == newState) return true;
      /*
    if (originalState == "open") return true;
    else if (originalState == "pending" && newState == "closed") return true;
    else return false;

    or */

      return (
        originalState == "open" ||
        (originalState == "pending" && newState == "closed")
      );
    };
    // Fetch issues from server
    const fetchIssues = () => {
      fetch(`${server}issues`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          issues.value = Object.values(data);
        })
        .catch(printError);
    };

    const createIssue = () => {
      fetch(`${server}issue`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Add to list
          issues.value.push(data);
        })
        .catch(printError);
    };

    const updateIssue = (issue) => {
      fetch(`${server}issue`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(issue),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch(printError);
    };

    const updateIssueState = (issue, event) => {
      const state = event.target.value;
      // Test if the state can be changed
      if (canChangeState(issue.state, state)) {
        // Modify the issue before sending
        issue.state = state;
        updateIssue(issue);
      } else {
        // Reset the selected value
        event.target.value = issue.state;
      }
    };

    // Helper functions for template
    const isSameState = (columnIndex, issueState) => {
      const columnState = states[columnIndex];
      return columnState == issueState;
    };

    const getIssuesWithState = (columnIndex) => {
      return issues.value.filter((issue) =>
        isSameState(columnIndex, issue.state)
      );
    };

    // Fetch isses when mounted
    onMounted(() => {
      fetchIssues();
    });

    return {
      // ref
      issues,
      // Methods
      createIssue,
      updateIssueState,
      updateIssue,
      getIssuesWithState,
    };
  },
};
</script>

<style scoped>
.issue-tracker-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 5px 5px;
  grid-auto-flow: row;
}

.flex-container {
  display: flex;
  flex-direction: column;
}

.issue {
  display: flex;
  flex-wrap: wrap;
  border: 2px solid;
  justify-content: space-between;
}

.full-width {
  width: 100%;
}

.create-issue-button {
  position: absolute;
  width: 100px;
  top: 20px;
  left: 50%;
  margin-left: -50px;
}

/* Styling for issue's children */
textarea {
  height: 100px;
  width: 100%;
  resize: vertical;
}
</style>
