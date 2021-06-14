<template>
  <div class="issue-tracker-grid">
    <div
      v-for="columnIndex in 3"
      class="flex-container border"
      :key="'issue column' + columnIndex"
    >
      <div
        v-for="(issue, issueIndex) in issues"
        :key="`column-${columnIndex}-issue-${issueIndex}`"
        class="issue"
      >
        <div>{{ issue.title }}</div>
        <div>{{ issue.description }}</div>
        <div>{{ issue.state }}</div>
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
    const createIssue = () => {};
    const updateIssue = () => {};

    // Helper functions for template
    const getIssuesOfState = (state) => {
      states;
      return state;
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
      updateIssue,
      getIssuesOfState,
    };
  },
};
</script>

<style scoped>
.issue-tracker-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0px 0px;
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
  border: 1px solid;
}
</style>
