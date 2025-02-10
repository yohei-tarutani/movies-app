import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const MediaListScreen = ({
  fetchData,
  navigation,
  navigationTarget,
  idParamName,
  titleKey,
  categoryOptions,
}) => {
  const [selectedItem, setSelectedItem] = useState(categoryOptions[0].value);
  const [mediaItems, setMediaItems] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showNextPage, setShowNextPage] = useState(false);

  useEffect(() => {
    if (selectedItem) {
      fetchAndSetMediaItems(selectedItem);
    }
  }, [selectedItem]);

  const fetchAndSetMediaItems = async (category) => {
    const fetchedItems = await fetchData(category);
    if (fetchedItems.results) {
      setMediaItems(fetchedItems.results);
      console.log("Fetched Media Items:", fetchedItems.results);
    } else {
      console.log("No results found");
    }
  };

  const handleItemSelect = (categoryValue) => {
    setSelectedItem(categoryValue);
    setShowNextPage(false); // reset to the first page
    setIsModalVisible(false);
  };

  const handlePageToggle = () => {
    setShowNextPage((prevState) => !prevState);
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setIsModalVisible(true)}
        >
          <Text>{selectedItem.replace("_", " ").toUpperCase()}</Text>
          <Ionicons name="chevron-down" size={24} color="black" />
        </TouchableOpacity>

        <FlatList
          data={showNextPage ? mediaItems.slice(10) : mediaItems.slice(0, 10)}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.mediaItem}>
              <View style={styles.poster}>
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                  }}
                  style={styles.posterImage}
                />
              </View>
              <View style={styles.mediaInfo}>
                <Text style={styles.titleText} numberOfLines={0}>
                  {item.titleKey}
                </Text>
                <Text>Popularity: {item.popularity}</Text>
                <Text>Release Date: {item.release_date}</Text>
                <TouchableOpacity
                  style={styles.detailButton}
                  onPress={() =>
                    navigation.navigate(navigationTarget, {
                      [idParamName]: item.id,
                    })
                  }
                >
                  <Text style={styles.detailText}>More Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 80 }}
          ListFooterComponent={
            mediaItems.length > 10 && (
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

        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {categoryOptions.map((item) => (
                <TouchableOpacity
                  key={item.value}
                  style={[
                    styles.modalItem,
                    selectedItem === item.value && styles.selectedItem,
                  ]}
                  onPress={() => handleItemSelect(item.value)}
                >
                  <Text
                    style={[
                      styles.modalItemText,
                      selectedItem === item.value && styles.selectedText,
                    ]}
                  >
                    {item.label}
                  </Text>
                  {selectedItem === item.value && (
                    <Ionicons name="checkmark-sharp" size={24} color="white" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

export default MediaListScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "90%",
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    backgroundColor: "#eee",
  },
  mediaItem: {
    flexDirection: "row",
    padding: 10,
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  poster: {
    marginHorizontal: 10,
  },
  posterImage: {
    width: 100,
    height: 105,
  },
  mediaInfo: {
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
    width: 230,
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
    width: "85%",
    padding: 10,
    marginVertical: 20,
    alignSelf: "center",
    justifyContent: "center",
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
  selectedItem: {
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
