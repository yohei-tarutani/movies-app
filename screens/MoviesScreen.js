import { fetchMovies } from "../services/api";
import MediaListScreen from "./MediaListScreen";

// import api from "../services/api";

// const fetchMovies = async (category) => {
//   try {
//     const response = await api.get(`/movie/${category}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching movies:", error);
//     return null;
//   }
// };

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

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   Modal,
//   StyleSheet,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// // import api from "../services/api";

// const MoviesScreen = ({ navigation }) => {
//   const [selectedItem, setSelectedItem] = useState("now_playing");
//   const [mediaItems, setMediaItems] = useState([]);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [showNextPage, setShowNextPage] = useState(false);

//   const categoryOptions = [
//     { label: "Now Playing", value: "now_playing" },
//     { label: "Popular", value: "popular" },
//     { label: "Top Rated", value: "top_rated" },
//     { label: "Upcoming", value: "upcoming" },
//   ];

//   useEffect(() => {
//     if (selectedItem) {
//       fetchAndSetMovies(selectedItem);
//     }
//   }, [selectedItem]);

//   const fetchAndSetMovies = async (category) => {
//     try {
//       const response = await fetchMovies(category);
//       // console.log("Movies Data:", response.results);
//       setMediaItems(response.results);
//     } catch (error) {
//       console.error("Error fetching movies:", error);
//     }
//   };

//   const handleItemSelect = (category) => {
//     setSelectedItem(category);
//     setShowNextPage(false);
//     setIsModalVisible(false);
//   };

//   const handlePageToggle = () => setShowNextPage(!showNextPage);

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity
//         style={styles.dropdown}
//         onPress={() => setIsModalVisible(true)}
//       >
//         <Text>{selectedItem.replace("_", " ").toUpperCase()}</Text>
//         <Ionicons name="chevron-down" size={24} color="black" />
//       </TouchableOpacity>

//       <FlatList
//         data={showNextPage ? mediaItems.slice(10) : mediaItems.slice(0, 10)}
//         keyExtractor={(item) => {
//           // console.log("Movie:", item);
//           item.id + Math.random();
//         }}
//         renderItem={({ item }) => (
//           <View style={styles.mediaItem}>
//             <Image
//               source={{
//                 uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
//               }}
//               style={styles.posterImage}
//             />
//             <View style={styles.mediaInfo}>
//               <Text style={styles.titleText}>{item.title}</Text>
//               <Text>Popularity: {item.popularity}</Text>
//               <Text>Release Date: {item.release_date}</Text>
//               <TouchableOpacity
//                 style={styles.detailButton}
//                 onPress={() =>
//                   navigation.navigate("MovieDetails", { movieId: item.id })
//                 }
//               >
//                 <Text style={styles.detailText}>More Details</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         )}
//         contentContainerStyle={{ paddingBottom: 80 }}
//         ListFooterComponent={
//           mediaItems.length > 10 && (
//             <TouchableOpacity
//               style={styles.toggleButton}
//               onPress={handlePageToggle}
//             >
//               <Text style={styles.toggleButtonText}>
//                 {showNextPage ? "First Page" : "Next Page"}
//               </Text>
//             </TouchableOpacity>
//           )
//         }
//       />

//       <Modal visible={isModalVisible} animationType="slide" transparent={true}>
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             {categoryOptions.map((item) => (
//               <TouchableOpacity
//                 key={item.value}
//                 style={styles.modalItem}
//                 onPress={() => handleItemSelect(item.value)}
//               >
//                 <Text>{item.label}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

export default MoviesScreen;

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#fff",
//   },
//   dropdown: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "center",
//     width: "90%",
//     marginLeft: 20,
//     marginTop: 20,
//     marginBottom: 10,
//     padding: 10,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 5,
//     backgroundColor: "#eee",
//   },
//   mediaItem: {
//     flexDirection: "row",
//     padding: 10,
//     paddingLeft: 20,
//     borderBottomWidth: 1,
//     borderColor: "#ddd",
//   },
//   posterImage: {
//     marginHorizontal: 10,
//     width: 100,
//     height: 105,
//   },
//   mediaInfo: {
//     rowGap: 4,
//     width: "65%",
//   },
//   titleText: {
//     fontWeight: "bold",
//     fontSize: 15,
//     flexWrap: "wrap",
//   },
//   detailButton: {
//     backgroundColor: "#3eafc8",
//     width: 230,
//     padding: 10,
//     alignItems: "center",
//     borderRadius: 3,
//   },
//   detailText: {
//     color: "white",
//     fontWeight: "bold",
//   },
//   toggleButton: {
//     backgroundColor: "#bbb",
//     width: "85%",
//     padding: 10,
//     marginVertical: 20,
//     alignSelf: "center",
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 4,
//   },
//   toggleButtonText: {
//     fontWeight: "bold",
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "flex-end",
//     backgroundColor: "rgba(0,0,0,0.5)",
//   },
//   modalContent: {
//     backgroundColor: "#fff",
//     padding: 20,
//     borderTopLeftRadius: 10,
//     borderTopRightRadius: 10,
//   },
//   modalItem: {
//     padding: 15,
//     borderBottomWidth: 1,
//     borderColor: "#ddd",
//   },
//   modalItemText: {
//     fontSize: 18,
//   },
//   selectedItem: {
//     backgroundColor: "#42977b",
//     borderRadius: 4,
//     flexDirection: "row",
//     columnGap: 8,
//   },
//   selectedText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
// });
