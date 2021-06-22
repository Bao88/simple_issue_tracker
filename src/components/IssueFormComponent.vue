<template>
  <div class="flex justify-center items-center">
    <form
      action="/api/issue"
      method="post"
      class="
        flex flex-wrap
        items-start
        shadow-2xl
        rounded-md
        h-5/6
        w-5/6
        bg-blue-500
        justify-center
      "
      @submit.prevent="submitIssue"
      id="IssueForm"
    >
      <div class="w-full text-center mt-2 text-xl font-bold">Create Issue</div>
      <div class="w-5/6">
        <label class="w-1/4 text-center" for="formTitle">Title: </label>
        <input
          v-model="titleText"
          class="w-3/4 rounded-full"
          id="formTitle"
          type="text"
          required
        />
      </div>

      <div class="w-5/6">
        <label for="formSelect">State: </label>
        <select
          v-model="selectedState"
          name="formSelect"
          id="formSelect"
          class="rounded-full capitalize"
        >
          <option
            v-for="(state, stateIndex) in validStates"
            :value="state"
            :key="stateIndex"
            :selected="state == 'open'"
          >
            {{ state }}
          </option>
        </select>
      </div>
      <div class="w-5/6">
        <label class="w-full" for="formDescription">Description: </label>
        <textarea
          v-model="descriptionText"
          rows="4"
          class="w-full rounded-sm h-3/6"
          id="formDescription"
          type="text"
          required
        />
      </div>

      <input
        class="w-1/2 py-2 bg-green-500 text-white rounded-full"
        type="submit"
        value="Create"
      />
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from "vue";
import { IssueState, Issue } from "../store/models";
import { appStore } from "../store/store";

export default defineComponent({
  setup() {
    const validStates = Object.values(IssueState);

    // Form values
    const selectedState: Ref<IssueState> = ref(IssueState.open);
    const titleText = ref("");
    const descriptionText = ref("");

    const clearForm = () => {
      titleText.value = "";
      descriptionText.value = "";
      selectedState.value = IssueState.open;
    };

    //Method
    const submitIssue = () => {
      let form = document.getElementById("IssueForm");
      if (form) form = form as HTMLFormElement;

      const issue = new Issue({
        title: titleText.value,
        description: descriptionText.value,
        state: selectedState.value,
      });

      if (issue) {
        appStore.createIssue(issue);
        clearForm();
      } else {
        console.log("Issue is invalid");
      }
    };

    return {
      // Form values
      selectedState,
      titleText,
      descriptionText,

      // List
      validStates,

      // Methods
      submitIssue,
    };
  },
});
</script>

<style scoped>
input[type="text"],
select,
option {
  color: black;
  text-align: center;
}

textarea {
  color: black;
  resize: none;
  height: 50%;
}
</style>
