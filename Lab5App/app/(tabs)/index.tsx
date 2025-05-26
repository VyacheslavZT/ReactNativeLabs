import { SText } from "@/components/SText";
import { useQuery } from "@tanstack/react-query";
import * as FileSystem from "expo-file-system";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["storage-stats"],
    queryFn: async () => {
      const info = await FileSystem.getFreeDiskStorageAsync();
      const total = await FileSystem.getTotalDiskCapacityAsync();
      return {
        total,
        free: info,
        used: total - info,
      };
    },
  });

  if (isLoading) return <SText>Завантаження...</SText>;
  if (error) return <SText>Помилка при завантаженні</SText>;

  return (
    <SafeAreaView>
      <View style={{ padding: 20, gap: 10 }}>
        <SText style={{ textAlign: "center", alignSelf: "stretch" }}>
          Загальний обсяг: {formatBytes(data!.total)}
        </SText>
        <View
          style={{
            flexDirection: "row",
            height: 50,
            backgroundColor: "#C1DBB3",
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          <View
            style={{
              flex: data!.used,
              backgroundColor: "#FE5D26",
              borderRadius: 8,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SText style={{ color: "#FAEDCA" }}>
              Used: {formatBytes(data!.used)}
            </SText>
          </View>
          <View
            style={{
              flex: data!.free,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SText style={{ color: "#526E48" }}>
              Free: {formatBytes(data!.free)}
            </SText>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
const formatBytes = (bytes: number): string => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};
