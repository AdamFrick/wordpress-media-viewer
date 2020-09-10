import { reactive, readonly, ref } from "vue";

import { mediaProvider } from "@/providers/media.js";

const state = reactive({
  settings: ref(null),
  images: ref(null),
});

const fetchMedia = async (settings) => {
  const { uri, page, perPage, order, mediaType, cors } = settings;
  const response = await mediaProvider.fetchMedia(uri, page, perPage, order, mediaType, cors);
  if ("error" === response.status) {
    state.images = null;
    return response;
  }
  state.images = await response.data;
  return response;
};

export const authStore = readonly({
  state,
  fetchMedia
});
