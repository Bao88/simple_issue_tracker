<template>
  <div class="container">
    <div class="title">Simple Issue Tracker</div>
    <IssueTrackerView class="view" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import IssueTrackerView from "./views/IssueTrackerView.vue";

export default defineComponent({
  name: "App",
  components: {
    IssueTrackerView,
  },
});
</script>

<style>
html,
body {
  padding: 0;
  margin: 0;
  height: 100vh;
  width: 100vw;
}

.container {
  height: 100vh;
  width: inherit;
  display: grid;
  grid-template-columns: 0.7fr 3fr 0.7fr;
  grid-template-rows: 0.5fr 4.5fr 0.5fr;
  gap: 0px 0px;
  grid-auto-flow: row;
}

.title {
  grid-area: 1 / 1 / 3 / 3;
  margin: 20px 0 0 20px;
}

.view {
  grid-area: 2 / 2 / 3 / 3;
  overflow-y: auto;
}

.border {
  border: 2px solid black;
}
</style>
