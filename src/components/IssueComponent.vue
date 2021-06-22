<template>
  <div class="h-60 w-full rounded-lg p-2">
    <div class="flex mt-3">
      <label class="w-1/4 text-center" :for="`issue-title-${issue.id}`"
        >Title:
      </label>
      <input
        :id="`issue-title-${issue.id}`"
        type="text"
        class="w-3/4"
        v-model="issueTitle"
        @blur="updateIssue"
      />
    </div>

    <div class="flex py-2">
      <label class="w-1/4 text-center" :for="`issue-state-${issue.id}`"
        >State:
      </label>
      <select
        :id="`issue-state-${issue.id}`"
        v-model="selectedState"
        class="capitalize"
        name="state"
        @change="updateIssueState"
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

    <div class="flex flex-wrap">
      <label class="w-full" :for="`issue-description-${issue.id}`"
        >Description:
      </label>
      <textarea
        :id="`issue-description-${issue.id}`"
        type="text"
        v-model="issueDescription"
        rows="5"
        class="text-black w-full flex resize-none rounded-lg"
        @blur="updateIssue"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Issue } from "../store/models";
import { appStore } from "../store/store";

export default defineComponent({
  props: {
    issue: {
      type: Issue,
      required: true,
    },
  },
  setup(props) {
    const selectedState = ref(props.issue.state);
    const issueTitle = ref(props.issue.title);
    const issueDescription = ref(props.issue.description);

    // Helper function
    const canChangeState = (originalState: string, newState: string) => {
      //Edge case if originalState == newState, it means we dont need to update state.
      if (originalState == newState) return true;

      return (
        originalState == "open" ||
        (originalState == "pending" && newState == "closed")
      );
    };

    const textHasChanged = () => {
      return (
        props.issue.title !== issueTitle.value ||
        props.issue.description !== issueDescription.value
      );
    };

    const modifyIssue = (issue: Issue) => {
      appStore.updateIssue(issue).catch((error) => console.log(error));
    };

    const updateIssueState = () => {
      const issue = { ...props.issue };
      // Test if the state can be changed
      if (canChangeState(issue.state, selectedState.value)) {
        // Modify the issue before sending
        issue.state = selectedState.value;
        modifyIssue(issue);
      } else {
        // Reset the selected value
        selectedState.value = issue.state;
      }
    };

    const updateIssue = () => {
      // Only update if title or description has been changed
      if (textHasChanged()) {
        const issue = { ...props.issue };
        issue.title = issueTitle.value;
        issue.description = issueDescription.value;

        modifyIssue(issue);
      }
    };

    return {
      modifyIssue,
      updateIssueState,
      updateIssue,

      // Refs
      selectedState,
      issueTitle,
      issueDescription,
    };
  },
});
</script>

<style scoped>
select,
option {
  color: black;
  text-align: center;
}
</style>
