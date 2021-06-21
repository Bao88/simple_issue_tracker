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

      <!--   {{ issues }} -->
      <div
        class="w-full mx-7 flex justify-between border-2"
        style="height: 70%"
      >
        <div class="relative w-1/4 h-full text-center border-2">
          Open
          <div
            :style="`height: ${openIssues}%`"
            class="
              bg-red-500
              flex
              items-center
              justify-center
              absolute
              bottom-0
            "
          >
            {{ openIssues + "%" }}
          </div>
        </div>

        <div class="w-1/4 text-center">
          <div class="h-1/6 flex items-center justify-center">Pending</div>
          <div class="relative h-5/6 border-2">
            <div
              :style="`height: ${50}%`"
              class="
                bg-green-500
                flex
                items-center
                justify-center
                w-full
                absolute
                bottom-0
              "
            >
              {{ pendingIssues + "%" }}
            </div>
          </div>
        </div>

        <div class="w-1/4 h-5/6 text-center">
          Closed
          <div
            :style="`height: ${closedIssues}%`"
            class="bg-yellow-500 flex items-center justify-center"
          >
            {{ closedIssues + "%" }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { IssueState } from "@/store/models";
import { computed, defineComponent } from "vue";
import { appStore } from "../store/store";

export default defineComponent({
  setup() {
    const issues = computed(() => appStore.getIssues());

    const getPercentage = (whole: number, part: number) => {
      return Math.round(100 * (part / whole)).toFixed(2);
    };

    const openIssues = computed(() => {
      const whole = issues.value.length;
      const part = appStore.getIssueWithState(IssueState.open);
      return getPercentage(whole, part.length);
    });

    const pendingIssues = computed(() => {
      const whole = issues.value.length;
      const part = appStore.getIssueWithState(IssueState.pending);
      return getPercentage(whole, part.length);
    });

    const closedIssues = computed(() => {
      const whole = issues.value.length;
      const part = appStore.getIssueWithState(IssueState.closed);
      return getPercentage(whole, part.length);
    });

    return {
      issues,
      openIssues,
      pendingIssues,
      closedIssues,
    };
  },
});
</script>

<style scoped></style>
