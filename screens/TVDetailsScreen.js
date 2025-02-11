import { fetchTvDetails } from "../services/api";
import MediaDetailsScreen from "./MediaDetailsScreen";

const TVDetailsScreen = ({ route, navigation }) => {
  const { tvId } = route.params;

  return (
    <MediaDetailsScreen
      fetchDetails={fetchTvDetails}
      id={tvId}
      navigation={navigation}
      titleKey="name"
    />
  );
};

export default TVDetailsScreen;
