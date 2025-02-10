import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import AppTabs from "./AppTabs";
import MovieDetailsScreen from "../screens/MovieDetailsScreen";
import TVDetailsScreen from "../screens/TVDetailsScreen";
import SearchDetailsScreen from "../screens/SearchDetailsScreen";

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="AppTabs"
          component={AppTabs}
          options={{
            headerShown: true,
            headerTitle: "Movies App",
            headerStyle: { backgroundColor: "#0a5051" },
            headerTitleStyle: {
              color: "#fff",
              fontSize: 18,
            },
          }}
        />
        <Stack.Screen
          name="MovieDetails"
          component={MovieDetailsScreen}
          options={{
            headerBackTitle: "Back to List",
          }}
        />
        <Stack.Screen
          name="SearchDetails"
          component={SearchDetailsScreen}
          options={{
            headerBackTitle: "Back to List",
          }}
        />
        <Stack.Screen
          name="TVDetails"
          component={TVDetailsScreen}
          options={{
            headerBackTitle: "Back to List",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
