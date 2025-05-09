import { useColors } from "@/hooks/useThemeColor";
import {
  Image,
  StyleSheet,
  Platform,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { IconBrandSteam, IconChevronRight } from "tabler-icons-react-native";

export default function ProfileScreen() {
  const colors = useColors();
  return (
    <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
      <View
        style={{
          alignItems: "center",
          margin: 20,
          gap: 5,
        }}
      >
        <Image
          src="https://cdn2.thecatapi.com/images/i9HsL15nJ.jpg"
          style={{ width: 150, height: 150, borderRadius: 150 }}
        />
        <Text style={{ color: colors.symbolImportant, fontSize: 20 }}>
          Username
        </Text>
        <View
          style={{
            width: "100%",
            marginTop: 20,
            borderRadius: 8,
            gap: 3,
            overflow: "hidden",
          }}
        >
          {["Settings", "Logout"].map((e, i) => {
            return (
              <TouchableOpacity
                style={{
                  backgroundColor: colors.backgroundFocus,
                  padding: 15,
                  flexDirection: "row",
                }}
                key={i}
              >
                <Text style={{ color: colors.symbolImportant, fontSize: 20 }}>
                  {e}
                </Text>
                <View style={{ flex: 1 }}></View>
                <IconChevronRight
                  color={colors.symbolUnimportant}
                ></IconChevronRight>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}
