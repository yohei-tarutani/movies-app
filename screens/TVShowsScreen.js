import { fetchTvs } from "../services/api";
import MediaListScreen from "./MediaListScreen";

// import api from "../services/api";

// const fetchTvs = async (category) => {
//   try {
//     const response = await api.get(`/tv/${category}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching tvs:", error);
//     return null;
//   }
// };

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

// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   Modal,
//   StyleSheet,
// } from "react-native";
// // import api from "../services/api";
// import Ionicons from "react-native-vector-icons/Ionicons";

// const TVShowsScreen = ({ navigation }) => {
//   const [selectedCategory, setSelectedCategory] = useState("airing_today");
//   const [tvShows, setTvShows] = useState([]);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [showNextPage, setShowNextPage] = useState(false);

//   const categories = [
//     { label: "Airing Today", value: "airing_today" },
//     { label: "On the Air", value: "on_the_air" },
//     { label: "Popular", value: "popular" },
//     { label: "Top Rated", value: "top_rated" },
//   ];

//   useEffect(() => {
//     if (selectedCategory) {
//       fetchAndSetTvShows(selectedCategory);
//     }
//   }, [selectedCategory]);

//   const fetchAndSetTvShows = async (category) => {
//     try {
//       const response = await fetchTvs(category);
//       // console.log("TVs Data:", response.results);
//       setTvShows(response.results);
//     } catch (error) {
//       console.error("Error fetching TV shows:", error);
//     }
//   };

//   const handleCategorySelect = (category) => {
//     setSelectedCategory(category);
//     setShowNextPage(false);
//     setIsModalVisible(false);
//   };

//   const handlePageToggle = () => setShowNextPage((prev) => !prev);

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity
//         style={styles.dropdown}
//         onPress={() => setIsModalVisible(true)}
//       >
//         <Text>{selectedCategory.replace("_", " ").toUpperCase()}</Text>
//         <Ionicons name="chevron-down" size={24} color="black" />
//       </TouchableOpacity>

//       <FlatList
//         data={showNextPage ? tvShows.slice(10) : tvShows.slice(0, 10)}
//         keyExtractor={(item) => item.id + Math.random()}
//         renderItem={({ item }) => (
//           <View style={styles.mediaItem}>
//             <Image
//               source={{
//                 uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
//               }}
//               style={styles.posterImage}
//             />
//             <View style={styles.mediaInfo}>
//               <Text style={styles.titleText}>{item.name}</Text>
//               <Text>Popularity: {item.popularity}</Text>
//               <Text>Release Date: {item.release_date}</Text>
//               <TouchableOpacity
//                 style={styles.detailButton}
//                 onPress={() =>
//                   navigation.navigate("TVDetails", { tvId: item.id })
//                 }
//               >
//                 <Text style={styles.detailText}>More Details</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         )}
//         contentContainerStyle={{ paddingBottom: 80 }}
//         ListFooterComponent={
//           tvShows.length > 10 && (
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
//             {categories.map((item) => (
//               <TouchableOpacity
//                 key={item.value}
//                 style={[
//                   styles.modalItem,
//                   selectedCategory === item.value && styles.selectedItem,
//                 ]}
//                 onPress={() => handleCategorySelect(item.value)}
//               >
//                 <Text
//                   style={[
//                     styles.modalItemText,
//                     selectedCategory === item.value && styles.selectedText,
//                   ]}
//                 >
//                   {item.label}
//                 </Text>
//                 {selectedCategory === item.value && (
//                   <Ionicons name="checkmark-sharp" size={24} color="white" />
//                 )}
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

export default TVShowsScreen;

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
