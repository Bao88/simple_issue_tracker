<template>
  <div class="flex justify-center items-center overflow-hidden">
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
      style="height: 92%; width: 90%"
    >
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
        <div class="m-10">
          <IssueComponent
            v-for="(issue, issueIndex) in issueComp.value"
            :issue="issue"
            :key="`${issue.id}-${issueIndex}`"
            class="my-3 border-2"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed } from "vue";
import { appStore } from "../store/store";

// constants
const states = ["open", "pending", "closed"];

// Components
import IssueComponent from "./IssueComponent.vue";
import { IssueState } from "@/store/models";

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

    return {
      //constants
      states,
      // computed and refs
      issues,
      openIssues,
      pendingIssues,
      closedIssues,
      computedIssues,
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
