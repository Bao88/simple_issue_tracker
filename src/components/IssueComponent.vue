<template>
  <div class="h-60 border-2">
    <div>{{ issue.title }}</div>
    <select v-model="selectedState" name="state">
      <option value="open" :selected="'open' == issue.state">open</option>
      <option value="pending" :selected="'pending' == issue.state">
        pending
      </option>
      <option value="closed" :selected="'closed' == issue.state">closed</option>
    </select>
    <!-- Add the issue if it is in the correct column and create unique id for each issue -->
    <!--     <label :for="`issue-title-${columnIndex}-${issueIndex}`">Title: </label>
     <input
          :id="`issue-title${columnIndex}-${issueIndex}`"
          type="text"
          class="full-width"
          v-model="issue.title"
          @blur="updateIssue(issue)"
        />

    <label :for="`issue-state-${columnIndex}-${issueIndex}`"
      >IssueState:
    </label>

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
    /> -->
    <!--  <select
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
        </select> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
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

    // Update an issue
    const modifyIssue = (issue: Issue) => {
      console.log(issue);
      appStore.updateIssue(issue);
    };

    const canChangeState = (originalState: string, newState: string) => {
      //Edge case if originalState == newState, it means we dont need to update state.
      if (originalState == newState) return true;

      return (
        originalState == "open" ||
        (originalState == "pending" && newState == "closed")
      );
    };

    /* const updateIssueState = (issue: Issue) => {
      // Test if the state can be changed
      if (canChangeState(issue.state, selectedState.value)) {
        // Modify the issue before sending
        issue.state = selectedState.value;
        modifyIssue(issue);
      } else {
        // Reset the selected value
        selectedState.value = issue.state;
      }
    }; */

    watch(
      () => selectedState.value,
      (newValue, oldValue) => {
        if (canChangeState(oldValue, newValue)) {
          const newIssue = { ...props.issue };
          newIssue.state = newValue;
          modifyIssue(newIssue);
        } else {
          selectedState.value = oldValue;
        }
      }
    );

    return {
      modifyIssue,
      selectedState,
    };
  },
});
</script>
