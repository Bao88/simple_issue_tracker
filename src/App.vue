<template>
  <div class="container">
    <div class="logo"></div>
    <IssueTrackerView class="view" />
  </div>
</template>

<script>
import IssueTrackerView from "./views/IssueTrackerView.vue";

export default {
  name: "App",
  components: {
    IssueTrackerView,
  },
};
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

.logo {
  grid-area: 1 / 1 / 3 / 3;
}

.view {
  grid-area: 2 / 2 / 3 / 3;
}

.border {
  border: 2px solid black;
}
</style>
