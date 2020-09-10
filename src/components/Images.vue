<template>
  <div>
    <div class="images">
      <div
        v-for="image in images"
        :key="image.id"
        class="image"
      >
        <a
          :href="image.link"
          target="_blank"
        >
          <span v-if="hasThumbnail(image)">
            <img :src="image.media_details.sizes.medium.source_url">
          </span>
          <span v-else>
            <img
              :src="image.source_url"
              style="max-width:150px;max-height:150px;"
            >
          </span>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
// import { ref } from 'vue'
export default {
  name: "Images",
  setup() {
    function hasThumbnail(thumb) {
      return typeof thumb.media_details.sizes !== "undefined" && typeof thumb.media_details.sizes.medium !== "undefined";
    }

    return { hasThumbnail };
  },
  data() {
    return {
      data: [],
      page: 1,
    };
  },
  computed: {
    images() {
      return this.data;
    },
  },
};
</script>
<style scoped>
.images {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  max-width:100%;
  max-height:200px;
}
.image img {
  height: 230px;
}
</style>