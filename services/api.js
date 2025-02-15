// import { API_ACCESS_TOKEN, BASE_URL, API_KEY } from "../config/apiConfig";
const BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY = "395c41bbfc266119069c831f7604b2fd";

const fetchFromAPI = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}`, {
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

// const api = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     accept: "application/json",
//   },
//   params: {
//     api_key: API_KEY,
//   },
// });

// const api = {
//   get: async (endpoint) => {
//     try {
//       const response = await fetch(
//         `${BASE_URL}${endpoint}?api_key=${API_KEY}`,
//         {
//           headers: {
//             Accept: "application/json",
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       throw error;
//     }
//   },
// };

// export default api;

// export const fetchMovies = async (category) => {
//   try {
//     const response = await fetch(
//       `${BASE_URL}movie/${category}?language=en-US&page=1`,
//       {
//         method: "GET",
//         headers: {
//           accept: "application/json",
//           Authorization: `Bearer ${API_ACCESS_TOKEN}`,
//         },
//       }
//     );
//     const data = await response.json();
//     // setMovies(data.results || []);
//     return data.results;
//     // console.log("Data", data);
//   } catch (error) {
//     console.error("Failed to fetch movies:", error);
//   }
// };
// export const fetchTvs = async (category) => {
//   try {
//     const response = await fetch(
//       `${BASE_URL}tv/${category}?language=en-US&page=1`,
//       {
//         method: "GET",
//         headers: {
//           accept: "application/json",
//           Authorization: `Bearer ${API_ACCESS_TOKEN}`,
//         },
//       }
//     );
//     const data = await response.json();
//     // setMovies(data.results || []);
//     return data.results;
//     // console.log("Data", data);
//   } catch (error) {
//     console.error("Failed to fetch tvs:", error);
//   }
// };

// export const fetchMovieDetails = async (movieId) => {
//   try {
//     const response = await fetch(
//       `${BASE_URL}movie/${movieId}?language=en-US&page=1`,
//       {
//         method: "GET",
//         headers: {
//           accept: "application/json",
//           Authorization: `Bearer ${API_ACCESS_TOKEN}`,
//         },
//       }
//     );
//     const data = await response.json();
//     // setMovies(data.results || []);
//     return data;
//     // console.log("Data", data);
//   } catch (error) {
//     console.error("Failed to fetch movies:", error);
//   }
// };
// export const fetchTvDetails = async (tvId) => {
//   try {
//     const response = await fetch(
//       `${BASE_URL}tv/${tvId}?language=en-US&page=1`,
//       {
//         method: "GET",
//         headers: {
//           accept: "application/json",
//           Authorization: `Bearer ${API_ACCESS_TOKEN}`,
//         },
//       }
//     );
//     const data = await response.json();
//     // setMovies(data.results || []);
//     return data;
//     // console.log("Data", data);
//   } catch (error) {
//     console.error("Failed to fetch tvs:", error);
//   }
// };
