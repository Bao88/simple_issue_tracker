<template>
  <div class="flex justify-center items-center overflow-hidden">
    <div class="grid grid-cols-3 gap-4" style="height: 92%; width: 90%">
      <div
        id="issue-tracker-grid"
        v-for="(issueComp, issueCompIndex) in computedIssues"
        class="
          bg-blue-500
          shadow-2xl
          rounded-md
          overflow-y-auto
          scroll
          relative
        "
        :key="issueCompIndex"
      >
        <div
          class="
            fixed
            w-32
            border-2
            text-xl
            ml-5
            mt-5
            text-center
            font-bold
            capitalize
            z-10
            bg-blue-500
            rounded-lg
          "
        >
          {{ states[issueCompIndex] }}
        </div>
        <div class="m-10 border-2">
          <IssueComponent
            v-for="(issue, issueIndex) in issueComp.value"
            :issue="issue"
            :key="`${issue.id}-${issueIndex}`"
          />
        </div>
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
/* Hide scrollbar for Chrome, Safari and Opera */
.scroll::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.scroll {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
