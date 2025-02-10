import { API_ACCESS_TOKEN, BASE_URL, API_KEY } from "../config/apiConfig";

const fetchFromAPI = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}`);
    const data = await response.json();
    console.log(data.results);
    return data;
  } catch (error) {
    console.error("Failed to fetch movies:", error);
    return [];
  }
  // const url = `${BASE_URL}${endpoint}?language=en-US&page=1`;
  // const options = {
  //   method: "GET",
  //   headers: {
  //     accept: "application/json",
  //     Authorization: `Bearer ${API_ACCESS_TOKEN}`,
  //   },
  // };
  // try {
  //   const response = await fetch(url, options);
  //   if (!response.ok) {
  //     throw new Error("Failed to fetch movies");
  //   }
  //   const data = await response.json();
  //   return data;
  // } catch (error) {
  //   console.error("Failed to fetch movies:", error);
  //   return [];
  // }
};

export const fetchMovies = (category) => fetchFromAPI(`movie/${category}`);
export const fetchMovieDetails = (movieId) => fetchFromAPI(`movie/${movieId}`);
export const fetchTvs = (category) => fetchFromAPI(`tv/${category}`);
export const fetchTvDetails = (tvId) => fetchFromAPI(`tv/${tvId}`);
export const fetchSearchResults = (selectedType, searchKeyword) =>
  fetchFromAPI(
    `search/${selectedType}?query=${encodeURIComponent(
      searchKeyword
    )}&include_adult=false`
  );
export const fetchSearchDetails = (selectedType, id) =>
  fetchFromAPI(`${selectedType}/${id}`);
