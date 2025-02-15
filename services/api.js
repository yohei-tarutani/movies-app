import { API_KEY, BASE_URL } from "../config/apiConfig";

const fetchFromAPI = async (endpoint) => {
  try {
    const url = endpoint.includes("?")
      ? `${BASE_URL}${endpoint}&api_key=${API_KEY}`
      : `${BASE_URL}${endpoint}?api_key=${API_KEY}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Failed with status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return [];
  }
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
  fetchFromAPI(`search/${selectedType}/${id}`);
