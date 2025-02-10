import { fetchMovieDetails } from "../services/api";
import MediaDetailsScreen from "./MediaDetailsScreen";

const MovieDetailsScreen = ({ route, navigation }) => {
  const { movieId } = route.params;

  return (
    <MediaDetailsScreen
      fetchDetails={fetchMovieDetails}
      id={movieId}
      navigation={navigation}
      titleKey="title"
    />
  );
};

export default MovieDetailsScreen;
