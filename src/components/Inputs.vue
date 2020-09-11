<template>
  <div class="input">
    <div class="prev-button">
      <button
        @click="fetchPrev"
        @keyup.left="fetchPrev"
      >
        Prev
      </button>
    </div>
    <div class="input-fields">
      <label for="uri">URI:</label><br>
      <input
        id="uri"
        v-model="state.uri"
        @keyup.enter="fetchMedia"
      ><br><br>
      <label for="uri">Page:</label><br>
      <input
        id="page"
        v-model.number="state.page"
        type="number"
        @keyup.enter="fetchMedia"
      ><br>
      <input
        id="cors"
        v-model="state.cors"
        type="checkbox"
        @change="fetchMedia"
      >
      <label for="cors">Add CORS</label>
    </div>
    <div class="next-button">
      <button
        @click="fetchNext"
        @keyup.right="fetchNext"
      >
        Next
      </button>
    </div>
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
      order: "desc",
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
  margin: 2em;
}
.prev-button,
.next-button,
.input-fields {

}
.input {
  display: flex;
  justify-content: center;
}
</style>
