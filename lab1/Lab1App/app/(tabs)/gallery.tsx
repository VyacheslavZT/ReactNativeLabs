import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

export default function GalleryScreen() {
  const [data, setData] = useState<(string | undefined)[]>(
    [...Array(50).keys()].map(() => undefined)
  );

  const dimensions = useWindowDimensions();

  useEffect(() => {
    async function loadCats() {
      if (!data.includes(undefined)) {
        return;
      }
      for (let index = 0; index < data.length; index++) {
        try {
          const response = await fetch(
            `https://api.thecatapi.com/v1/images/search`
          );
          const json = await response.json();

          setData((origData) => {
            origData[index] = json[0].url;
            return [...origData];
          });
        } catch (error) {
          console.log("Fetch error:", error);
        }
      }
    }
    loadCats();
  }, []);

  return (
    <>
      <FlatList
        data={data}
        numColumns={2}
        contentContainerStyle={{ padding: 5, backgroundColor: "white" }}
        renderItem={(info) => {
          return (
            <View
              style={{
                flexDirection: "row",
                padding: 8,
                gap: 5,
                flex: 1,
                backgroundColor: "white",
              }}
            >
              <View
                style={{
                  flex: 1,
                  aspectRatio: 4 / 3,
                  borderRadius: 4,
                  overflow: "hidden",
                  //https://ethercreative.github.io/react-native-shadow-generator/
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 3,
                    height: 1,
                  },
                  shadowOpacity: 0.22,
                  shadowRadius: 2.22,

                  elevation: 3,
                  backgroundColor: "#AAA",
                }}
              >
                {info.item ? (
                  <Image
                    src={info.item}
                    style={{
                      flex: 1,
                    }}
                  />
                ) : (
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: "#AAA",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ActivityIndicator />
                  </View>
                )}
              </View>
            </View>
          );
        }}
      />
    </>
  );
}
