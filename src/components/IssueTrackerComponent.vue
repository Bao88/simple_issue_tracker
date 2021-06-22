<template>
  <div class="grid grid-cols-3 w-full">
    <div
      id="issue-tracker-grid"
      v-for="(issueComp, issueCompIndex) in computedIssues"
      class="flex-container border"
      :key="issueCompIndex"
    >
      <div class="m-7 border-2">
        <div class="w-full text-lg text-center mt-2" style="height: 10%">
          {{ states[issueCompIndex] }}
        </div>

        <IssueComponent
          v-for="(issue, issueIndex) in issueComp.value"
          :issue="issue"
          :key="`${issueCompIndex}-${issueIndex}`"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent, computed } from "vue";
import { appStore } from "../store/store";

// constants
const states = ["open", "pending", "closed"];

// Components
import IssueComponent from "./IssueComponent.vue";
import { Issue, IssueState } from "@/store/models";

export default defineComponent({
  name: "IssueTrackerView",
  components: { IssueComponent },
  setup() {
    const issues = ref([]);

    // Methods
    const computedIssues = [
      computed(() => appStore.getIssueWithState(IssueState.open)),
      computed(() => appStore.getIssueWithState(IssueState.pending)),
      computed(() => appStore.getIssueWithState(IssueState.closed)),
    ];

    const openIssues = computed(() =>
      appStore.getIssueWithState(IssueState.open)
    );

    const pendingIssues = computed(() =>
      appStore.getIssueWithState(IssueState.pending)
    );

    const closedIssues = computed(() =>
      appStore.getIssueWithState(IssueState.closed)
    );

    // Check if the state of an issue can be changed.
    // Open can be changed to either Pending or Closed
    // Pending can be changed to Closed but not to Open
    // Closed can't change state.
    /* const canChangeState = (originalState: string, newState: string) => {
      //Edge case if originalState == newState, it means we dont need to update state.
      if (originalState == newState) return true;

      return (
        originalState == "open" ||
        (originalState == "pending" && newState == "closed")
      );
    }; */

    const fetchIssues = () => {
      /* fetch(`${server}issues`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          issues.value = Object.values(data);
        })
        .catch(printError); */
    };

    // Update an issue
    /* const updateIssue = (issue) => {
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
    }; */

    /*  const updateIssueState = (
      issue: { state: string },
      event: HTMLSelectElement
    ) => {
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
    }; */

    // Helper functions for template
    const isSameState = (columnIndex: number, issueState: string) => {
      const columnState = states[columnIndex];
      return columnState == issueState;
    };

    const getIssuesWithState = (columnIndex: number) => {
      return issues.value.filter((issue: Issue) =>
        isSameState(columnIndex, issue.state)
      );
    };

    // Fetch isses when mounted
    onMounted(() => {
      fetchIssues();
    });

    return {
      //constants
      states,
      // computed and refs
      issues,
      openIssues,
      pendingIssues,
      closedIssues,
      computedIssues,
      // Methods

      /* updateIssueState, */
      /*  updateIssue, */
      getIssuesWithState,
    };
  },
});
</script>

<style scoped>
.flex-container {
  display: flex;
  flex-direction: column;
}

.grid-column-header {
  display: flex;
  justify-content: center;
  font-size: 20px;
  font-weight: 800;
  text-transform: capitalize;
}

.issue {
  display: flex;
  flex-wrap: wrap;
  border: 2px solid;
  margin: 2px 0 2px 0;
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
