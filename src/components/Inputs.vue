<template>
  <div class="input">
    <button @click="fetchPrev">
      Prev
    </button>
    <input
      v-model.number="state.page"
      type="number"
      @keyup.enter="fetchMedia"
    >
    <button @click="fetchNext">
      Next
    </button>
  </div>
</template>
<script>
import { reactive, inject } from "vue";

export default {
  name: "Inputs",
  inject: ["media"],
  setup() {
    const media = inject("media");
    const state = reactive({
      uri: "https://members.kelbyone.com",
      page: 1,
      perPage: 15,
      order: "asc",
      mediaType: "image",
      cors: false,
    });
    const fetchMedia = async function() {
      const { uri, page, perPage, order, mediaType, cors } = state;
      const response = await media.fetchMedia({
        uri,
        page,
        perPage,
        order,
        mediaType,
        cors,
      });
      if ("error" === response.status) {
        state.error = response.data;
      }
    };
    function fetchNext() {
      state.page++;
      this.fetchMedia();
    }
    function fetchPrev() {
      state.page--;
      state.page = state.page === 0 ? 1 : state.page;
      this.fetchMedia();
    }

    return { state, fetchMedia, fetchNext, fetchPrev };
  },
  created() {
    this.fetchMedia();
  },
};
</script>
<style scoped>
button {
  font-size: 24px;
  line-height: 48px;
  margin: 2em;
}
</style>
