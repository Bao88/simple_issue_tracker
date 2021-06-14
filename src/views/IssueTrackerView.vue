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
        <!-- Add the issue if it is in the correct column -->
        <div>{{ issue.title }}</div>
        <div>{{ issue.description }}</div>
        <select
          name="state"
          id="state"
          @change="updateIssueState(issue.id, $event)"
        >
          <option value="open" :selected="'open' == issue.state">open</option>
          <option value="pending" :selected="'pending' == issue.state">
            pending
          </option>
          <option value="closed" :selected="'closed' == issue.state">
            closed
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";

// constants
const server = "http://localhost:8080/api/";
const states = ["open", "pending", "closed"];

export default {
  name: "IssueTrackerView",
  components: {},
  setup() {
    const issues = ref([]);

    const b = computed(() => 1 + 2);

    // Methods
    const printError = (error) => {
      console.log(error);
    };

    const getIssue = (id) => {
      return issues.value.find((issue) => issue.id == id);
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

    const updateIssueState = (issueId, event) => {
      const state = event.target.value;
      const issue = getIssue(issueId);

      // If issue exists
      if (issue) {
        // Test if the state can be changed
        if (canChangeState(issue.state, state)) {
          // Modify the issue before sending
          issue.state = state;

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
        } else {
          // Reset the selected value
          event.target.value = issue.state;
        }
      } else {
        console.log("Issue not found");
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
      // Computed
      b,

      // Methods
      createIssue,
      updateIssueState,
      isSameState,
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
  flex-wrap: nowrap;
  justify-content: normal;
  align-items: stretch;
  align-content: stretch;
}

.issue {
  display: block;
  flex-grow: 0;
  flex-shrink: 1;
  flex-basis: auto;
  align-self: auto;
  order: 0;
  border: 2px solid;
}

.create-issue-button {
  position: absolute;
  width: 100px;
  top: 20px;
  left: 50%;
  margin-left: -50px;
}
</style>
