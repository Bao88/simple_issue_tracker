<template>
  <div class="flex justify-center items-center">
    <div
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
    >
      <div class="w-full text-lg text-center mt-2" style="height: 10%">
        Issues
      </div>

      <!-- IssueContainer -->
      <div class="w-full mx-7 flex justify-between" style="height: 70%">
        <div
          v-for="(stateBar, stateIndex) in stateContainer"
          class="w-1/4 text-center"
          :key="stateIndex"
        >
          <div class="h-1/6 flex items-center justify-center">
            {{ stateBar.title }}
          </div>
          <div class="relative h-5/6">
            <div
              :style="`height: ${getPercentage(stateBar.ref)}%`"
              :class="stateBar.class"
              class="flex items-center justify-center rounded-sm"
            >
              {{ getPercentage(stateBar.ref) + "%" }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Issue, IssueState } from "@/store/models";
import { computed, defineComponent, ComputedRef } from "vue";
import { appStore } from "../store/store";

export default defineComponent({
  setup() {
    const issues = computed(() => appStore.getIssues());

    const getPercentage = (list: ComputedRef<Issue[]>) => {
      return Math.round(
        100 * (list.value.length / issues.value.length)
      ).toFixed(2);
    };

    const openIssues = computed(() =>
      appStore.getIssueWithState(IssueState.open)
    );

    const pendingIssues = computed(() =>
      appStore.getIssueWithState(IssueState.pending)
    );

    const closedIssues = computed(() =>
      appStore.getIssueWithState(IssueState.closed)
    );

    const stateContainer = [
      {
        ref: openIssues,
        title: "Open",
        class: "bg-green-500 w-full absolute bottom-0",
      },
      {
        ref: pendingIssues,
        title: "Pending",
        class: "bg-yellow-500 w-full absolute bottom-0",
      },
      {
        ref: closedIssues,
        title: "Closed",
        class: "bg-red-500  w-full absolute bottom-0",
      },
    ];

    return {
      issues,
      stateContainer,
      getPercentage,
    };
  },
});
</script>

<style scoped></style>
