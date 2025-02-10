import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";

const MediaDetailsScreen = ({ fetchDetails, id, navigation, titleKey }) => {
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMediaDetails = async () => {
      const fetchedMedia = await fetchDetails(id);
      if (fetchedMedia) {
        setMedia(fetchedMedia);
        navigation.setOptions({ title: fetchedMedia[titleKey] });
      }
      setLoading(false);
    };

    getMediaDetails();
  }, [id, navigation]);

  if (loading) {
    return <ActivityIndicator size="large" color="#3eafc8" />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{media[titleKey]}</Text>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${media.poster_path}` }}
        style={styles.posterImage}
      />
      <Text style={styles.overview}>{media.overview}</Text>
      <View style={styles.minorContainer}>
        <Text style={styles.minorText}>Popularity: {media.popularity}</Text>
        <Text style={styles.minorText}>
          {" "}
          | Release Date: {media.release_date}
        </Text>
      </View>
    </ScrollView>
  );
};

export default MediaDetailsScreen;

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
    width: "85%",
  },
  minorText: {
    fontWeight: "600",
  },
});
