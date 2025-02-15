import { fetchTvs } from "../services/api";
import MediaListScreen from "./MediaListScreen";

const TVShowsScreen = ({ navigation }) => {
  return (
    <MediaListScreen
      fetchData={fetchTvs}
      navigation={navigation}
      navigationTarget="TVDetails"
      idParamName="tvId"
      titleKey="name"
      categoryOptions={[
        { label: "Airing Today", value: "airing_today" },
        { label: "On the Air", value: "on_the_air" },
        { label: "Popular", value: "popular" },
        { label: "Top Rated", value: "top_rated" },
      ]}
    />
  );
};

export default TVShowsScreen;
