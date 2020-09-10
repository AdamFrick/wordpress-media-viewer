<template>
  <suspense>
    <template #default>
      <Inputs />
      <Images />
    </template>
    <template #fallback>
      Loading Images...
    </template>
  </suspense>
</template>

<script>
import { provide } from "vue";

import Images from "./components/Images.vue";
import Inputs from "./components/Inputs.vue";
import { mediaStore } from "@/store/_index.js";

export default {
  name: "App",
  components: {
    Images,
    Inputs
  },
  setup() {
    provide("media", mediaStore);
  }
};
</script>
