import { format } from "date-fns";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

type Article = {
  header: string;
  shortText: string;
  date: Date;
  imageUrl?: string;
};

export default function HomeScreen() {
  const [data, setData] = useState<Article[]>([
    {
      header: "Mysterious Cat Uprising",
      shortText: "Local cats demand more treats and daily belly rubs.",
      date: new Date("2024-12-01"),
    },
    {
      header: "Whisker Festival Announced",
      shortText:
        "City hosts first annual celebration of fabulous feline whiskers.",
      date: new Date("2025-01-15"),
    },
    {
      header: "Invisible Cat Spotted",
      shortText: "Residents claim ghostly paws appear during midnight hours.",
      date: new Date("2025-02-20"),
    },
    {
      header: "Cat Cafe Opens",
      shortText: "Guests enjoy coffee alongside playful rescue kittens daily.",
      date: new Date("2025-03-05"),
    },
    {
      header: "Mayor Declares Cat Day",
      shortText: "Citizens celebrate with parades and free tuna snacks.",
      date: new Date("2025-04-01"),
    },
    {
      header: "Cat Learns Coding",
      shortText: "Tabby successfully builds website to sell catnip online.",
      date: new Date("2025-04-18"),
    },
    {
      header: "Feline Fashion Show",
      shortText: "Stylish cats strut tiny hats and glittering bowties.",
      date: new Date("2025-05-12"),
    },
    {
      header: "World's Loudest Purr",
      shortText: "Orange cat sets new record at 67 decibels.",
      date: new Date("2025-06-30"),
    },
  ]);

  useEffect(() => {
    fetch(
      `https://api.thecatapi.com/v1/images/search?limit=${data.length}`
    ).then(async (response) => {
      response.json().then((json) => {
        const mappeddata = data.map((i, id) => {
          i.imageUrl = json[id].url;
          return i;
        });
        setData(mappeddata);
      });
    });
  }, []);

  return (
    <>
      <FlatList
        data={data}
        renderItem={(info) => {
          return (
            <View style={{ flexDirection: "row", padding: 5, gap: 5 }}>
              {info.item.imageUrl ? (
                <Image
                  src={info.item.imageUrl}
                  style={{ width: 160, height: 120 }}
                />
              ) : (
                <View
                  style={{
                    width: 160,
                    height: 120,
                    backgroundColor: "#aaaaaa",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ActivityIndicator />
                </View>
              )}

              <View style={{ flex: 1 }}>
                <Text>{info.item.header}</Text>
                <Text>{format(info.item.date, "dd-MM-yy, hh:mm")}</Text>
                <Text>{info.item.shortText}</Text>
              </View>
            </View>
          );
        }}
      />
    </>
  );
}
