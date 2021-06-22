<template>
  <div class="w-screen h-screen text-white bg-green-100">
    <div
      class="
        text-2xl
        font-bold
        flex
        justify-center
        items-center
        w-full
        text-gray-600
      "
      style="height: 5%"
    >
      Simple Issue Tracker
    </div>

    <!-- Dashboard -->
    <div class="grid grid-cols-12 grid-rows-4 gap-4" style="height: 95%">
      <IssueTrackerComponent
        class="w-full col-span-full xl:col-span-9 row-span-4"
      />

      <!-- Hide in smaller devices -->
      <!--   <div class="hidden sm:block sm:w-1/3 pt-20 pb-20 col-span-1"> -->
      <IssueStateViewerComponent
        class="hidden xl:flex xl:col-span-3 xl:row-span-2"
      />
      <IssueFormComponent class="hidden xl:flex xl:col-span-3 xl:row-span-2" />
      <!--  </div> -->

      <!-- Tools -->
      <button
        class="
          xl:hidden
          absolute
          bottom-3
          right-4
          bg-green-900
          plus
          rounded-full
        "
        @click="openIssueForm"
      ></button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { appStore } from "./store/store";

// Components
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

    // Fetch issues from server
    onMounted(() => {
      appStore.fetchIssues();
    });

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

input[type="text"],
select,
option {
  color: black;
  text-align: center;
}
</style>
