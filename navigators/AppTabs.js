import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MoviesScreen from "../screens/MoviesScreen";
import SearchResultsScreen from "../screens/SearchResultsScreen";
import TVShowsScreen from "../screens/TVShowsScreen";

const Tab = createMaterialTopTabNavigator();

const AppTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor: "#0a5051",
          borderBottomWidth: 3,
        },
      }}
    >
      <Tab.Screen name="Movies" component={MoviesScreen} />
      <Tab.Screen name="Search Results" component={SearchResultsScreen} />
      <Tab.Screen name="TVShows" component={TVShowsScreen} />
    </Tab.Navigator>
  );
};

export default AppTabs;
