import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { fetchSearchDetails } from "../services/api";

const SearchDetailsScreen = ({ route, navigation }) => {
  const { movieId, tvId } = route.params;
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDetails = async () => {
      setLoading(true);

      const id = movieId || tvId;
      const type = movieId ? "movie" : "tv";
      if (!id) return;

      const data = await fetchSearchDetails(type, id);
      if (data) {
        setDetails(data);
        navigation.setOptions({ title: data.title || data.name });
      }
      setLoading(false);
    };

    getDetails();
  }, [movieId, tvId, navigation]);

  if (loading) {
    return <ActivityIndicator size="large" color="#3eafc8" />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {details ? (
        <>
          <Text style={styles.title}>{details.title || details.name}</Text>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${details.poster_path}`,
            }}
            style={styles.posterImage}
          />
          <Text style={styles.overview}>{details.overview}</Text>
          <View style={styles.minorContainer}>
            <Text>Popularity: {details.popularity}</Text>
            <Text> | Release Date: {details.release_date}</Text>
          </View>
        </>
      ) : (
        <Text>No details available.</Text>
      )}
    </ScrollView>
  );
};

export default SearchDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 25,
    alignItems: "center",
  },
  posterImage: {
    width: "70%",
    height: "40%",
    borderRadius: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 16,
  },
  overview: {
    fontSize: 16,
    marginTop: 8,
    width: "85%",
  },
  minorContainer: {
    flexDirection: "row",
  },
});
