import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MainNavigator from "./navigators/MainNavigator";

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <MainNavigator />
    </SafeAreaProvider>
  );
}
