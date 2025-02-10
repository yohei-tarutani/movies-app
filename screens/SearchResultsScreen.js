import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { fetchSearchResults } from "../services/api";

const SearchResultsScreen = ({ navigation }) => {
  const [selectedType, setSelectedType] = useState("movie");
  const [items, setItems] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showNextPage, setShowNextPage] = useState(false);

  const handleSearch = async () => {
    if (!searchKeyword.trim()) return;

    setLoading(true);
    const data = await fetchSearchResults(selectedType, searchKeyword);
    setItems(data.results);
    setLoading(false);
  };

  const handleItemSelect = (categoryValue) => {
    setSelectedType(categoryValue);
    setShowNextPage(false); // reset to the first page
    setIsModalVisible(false);
  };

  const handlePageToggle = () => {
    setShowNextPage((prevState) => !prevState);
  };

  let pageContent;

  if (loading) {
    pageContent = <ActivityIndicator size="large" color="#3eafc8" />;
  } else if (items.length) {
    pageContent = (
      <FlatList
        data={showNextPage ? items.slice(10) : items.slice(0, 10)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.poster}>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                }}
                style={styles.posterImage}
              />
            </View>
            <View style={styles.itemInfo}>
              <Text style={styles.titleText} numberOfLines={0}>
                {item.title ? item.title : item.name}
              </Text>
              <Text>Popularity: {item.popularity}</Text>
              <Text>Release Date: {item.release_date}</Text>
              <TouchableOpacity
                style={styles.detailButton}
                onPress={() => {
                  if (selectedType === "movie") {
                    navigation.navigate("MovieDetails", {
                      movieId: item.id,
                    });
                  } else if (selectedType === "tv") {
                    navigation.navigate("TVDetails", {
                      tvId: item.id,
                    });
                  } else {
                    navigation.navigate("SearchDetails", {
                      movieId: item.id,
                    });
                  }
                }}
              >
                <Text style={styles.detailText}>More Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 10 }}
        ListFooterComponent={
          items.length > 10 && (
            <TouchableOpacity
              style={styles.toggleButton}
              onPress={handlePageToggle}
            >
              <Text style={styles.toggleButtonText}>
                {showNextPage ? "First Page" : "Next Page"}
              </Text>
            </TouchableOpacity>
          )
        }
        ListFooterComponentStyle={{
          paddingVertical: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    );
  } else {
    pageContent = (
      <View style={styles.initialTextContainer}>
        <Text style={styles.initialText}>Please Initiate a search</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.searchTitleText}>Search Movie/TV Show Name*</Text>
        <View style={styles.searchIconInput}>
          <Ionicons name="search" size={24} color="black" />
          <TextInput
            style={styles.textInput}
            placeholder="e.g. James Bond, CSI"
            value={searchKeyword}
            onChangeText={setSearchKeyword}
          />
        </View>
      </View>

      <Text style={styles.searchTitleText}>Choose Search Type*</Text>
      <View style={styles.searchTypeButton}>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setIsModalVisible(true)}
        >
          <Text>{selectedType.replace("_", " ").toUpperCase()}</Text>
          <Ionicons name="chevron-down" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Ionicons name="search" size={24} color="white" />
          <Text style={styles.searchText}>Search</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.lastSmallText}>Please select a search type</Text>

      {pageContent}

      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {[
              { label: "Movie", value: "movie" },
              { label: "Multi", value: "multi" },
              { label: "TV", value: "tv" },
            ].map((item) => (
              <TouchableOpacity
                key={item.value}
                style={[
                  styles.modalItem,
                  selectedType === item.value && styles.selectedType,
                ]}
                onPress={() => handleItemSelect(item.value)}
              >
                <Text
                  style={[
                    styles.modalItemText,
                    selectedType === item.value && styles.selectedText,
                  ]}
                >
                  {item.label}
                </Text>
                {selectedType === item.value && (
                  <Ionicons name="checkmark-sharp" size={24} color="white" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SearchResultsScreen;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 30,
    paddingTop: 10,
    backgroundColor: "#fff",
    flex: 1,
  },
  searchTitleText: {
    fontSize: 18,
    marginTop: 14,
  },
  searchIconInput: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "gray",
    borderWidth: 1.5,
    borderRadius: 4,
    backgroundColor: "#eee",
    marginTop: 6,
    padding: 4,
    width: "90%",
  },
  textInput: {
    padding: 6,
    fontSize: 16,
    width: "100%",
  },
  searchTypeButton: {
    flexDirection: "row",
    columnGap: 20,
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "50%",
    marginLeft: 0,
    marginTop: 6,
    marginBottom: 10,
    padding: 6,
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 5,
    backgroundColor: "#eee",
  },
  searchButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 6,
    width: "35%",
    backgroundColor: "#3eafc8",
    borderRadius: 4,
  },
  searchText: {
    color: "#fff",
    fontSize: 18,
  },
  lastSmallText: {
    marginBottom: 15,
  },
  item: {
    flexDirection: "row",
    paddingVertical: 10,
    width: "90%",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  poster: {
    marginRight: 10,
  },
  posterImage: {
    width: 100,
    height: 105,
  },
  itemInfo: {
    rowGap: 4,
    width: "65%",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 15,
    flexWrap: "wrap",
  },
  detailButton: {
    backgroundColor: "#3eafc8",
    width: 228,
    padding: 10,
    alignItems: "center",
    borderRadius: 3,
  },
  detailText: {
    color: "white",
    fontWeight: "bold",
  },
  toggleButton: {
    backgroundColor: "#bbb",
    width: "92%",
    padding: 10,
    marginVertical: 20,
    marginRight: 36,
    alignItems: "center",
    borderRadius: 4,
  },
  toggleButtonText: {
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  modalItemText: {
    fontSize: 18,
  },
  initialTextContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.5,
    marginRight: 30,
  },
  initialText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  selectedType: {
    backgroundColor: "#42977b",
    borderRadius: 4,
    flexDirection: "row",
    columnGap: 8,
  },
  selectedText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
