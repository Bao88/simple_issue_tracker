<template>
  <div>hello issue</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Issue } from "../store/models";

export default defineComponent({
  props: {
    issue: {
      type: Issue,
    },
  },
  setup(props) {
    console.log(props);
  },
});
</script>
