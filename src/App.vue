<template>
  <div class="bg-green-400 w-screen h-screen text-white flex flex-wrap">
    <!--  <div v-if="showFormOverlay">
      <IssueFormComponent
        @submitForm="closeIssueForm"
        :isOverlay="true"
        class="h-1/2 border-2"
      />
    </div> -->
    <div class="absolute text-lg flex justify-center items-center w-full h-20">
      Simple Issue Tracker
    </div>

    <IssueTrackerComponent class="w-full sm:w-2/3 pt-20" />

    <!-- Hide in smaller devices -->
    <div class="hidden sm:block sm:w-1/3 pt-20">
      <IssueStateViewerComponent class="h-1/2 border-2" />
      <IssueFormComponent class="h-1/2 border-2" />
    </div>

    <!-- Tools -->
    <button
      class="sm:hidden absolute bottom-3 right-4 bg-green-900 plus rounded-full"
      @click="openIssueForm"
    ></button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import IssueTrackerComponent from "./components/IssueTrackerComponent.vue";
import IssueStateViewerComponent from "./components/IssueStateViewerComponent.vue";
import IssueFormComponent from "./components/IssueFormComponent.vue";

export default defineComponent({
  name: "App",
  components: {
    IssueTrackerComponent,
    IssueStateViewerComponent,
    IssueFormComponent,
  },
  setup() {
    const showFormOverlay = ref(false);

    const openIssueForm = () => {
      showFormOverlay.value = true;
    };

    const closeIssueForm = () => {
      showFormOverlay.value = false;
    };

    return {
      openIssueForm,
      showFormOverlay,
      closeIssueForm,
    };
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

/* source: https://stackoverflow.com/questions/55281672/make-plus-symbol-in-css */
.plus {
  display: inline-block;
  width: 50px;
  height: 50px;

  background: linear-gradient(#fff, #fff), linear-gradient(#fff, #fff), #000;
  background-position: center;
  background-size: 50% 2px, 2px 50%; /*thickness = 2px, length = 50% (25px)*/
  background-repeat: no-repeat;
}
</style>
