import { readonly } from "vue";

const fetchMedia = async (uri, page, perPage, order, mediaType, cors) => {
  let url = `${uri}/wp-json/wp/v2/media?page=${page}&per_page=${perPage}&order=${order}&media_type=${mediaType}`;

  if (cors) url = "https://cors-anywhere.herokuapp.com/" + url;

  const response = await fetch(url);
  const data = await response.json();

  if (200 !== response.status) {
    return {
      status: "error",
      data: data,
    };
  }
  return {
    status: "success",
    data: data,
  };
};

export const mediaProvider = readonly({ fetchMedia });
