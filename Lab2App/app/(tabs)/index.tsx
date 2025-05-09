import { useColors } from "@/hooks/useThemeColor";
import {
  Image,
  StyleSheet,
  Platform,
  SafeAreaView,
  View,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { IconBrandSteam } from "tabler-icons-react-native";

export default function HomeScreen() {
  const colors = useColors();
  return (
    <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          height: 50,
          alignItems: "center",
          margin: 10,
        }}
      >
        <IconBrandSteam size={40} color={colors.symbolUnimportant} stroke={1} />
        <Text
          style={{
            color: colors.symbolUnimportant,
            fontSize: 40,
            fontWeight: "200",
          }}
        >
          Store
        </Text>
      </View>
    </SafeAreaView>
  );
}
