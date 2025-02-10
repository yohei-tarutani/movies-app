import { fetchMovies } from "../services/api";
import MediaListScreen from "./MediaListScreen";

const MoviesScreen = ({ navigation }) => {
  return (
    <MediaListScreen
      fetchData={fetchMovies}
      navigation={navigation}
      navigationTarget="MovieDetails"
      idParamName="movieId"
      titleKey="title"
      categoryOptions={[
        { label: "Now Playing", value: "now_playing" },
        { label: "Popular", value: "popular" },
        { label: "Top Rated", value: "top_rated" },
        { label: "Upcoming", value: "upcoming" },
      ]}
    />
  );
};

export default MoviesScreen;
