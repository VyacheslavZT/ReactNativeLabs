import { useColors } from "@/hooks/useThemeColor";
import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { IconBrandSteam, IconSteam } from "tabler-icons-react-native";
import { format } from "date-fns";
import { useEffect, useState } from "react";
export default function ChatScreen() {
  const colors = useColors();
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

  //chatgpt ahh messages
  const chatEntries: IChatEntryProps[] = [
    {
      url: "",
      name: "Alice Johnson",
      date: new Date("2025-05-01T10:15:00"),
      message: "Are we still on for tomorrow?",
      unreadAmount: 6,
    },
    {
      url: "",
      name: "Clara Nguyen",
      date: new Date("2025-04-30T18:45:00"),
      message: "Thanks for the update!",
      unreadAmount: 1,
    },
    {
      url: "",
      name: "Bob Smith",
      date: new Date("2025-05-01T09:30:00"),
      message: "I'll send the documents later.",
      unreadAmount: "you",
    },
    {
      url: "",
      name: "Daniel Kim",
      date: new Date("2025-04-30T17:20:00"),
      message: "See you at the meeting.",
      unreadAmount: "you",
    },
    {
      url: "",
      name: "Ella Martinez",
      date: new Date("2025-04-29T11:10:00"),
      message: "How's everything going?",
      unreadAmount: 0,
    },
    {
      url: "",
      name: "Frank Zhao",
      date: new Date("2025-04-28T20:00:00"),
      message: "I'll be a bit late tonight.",
      unreadAmount: "you",
    },
    {
      url: "",
      name: "Grace Lee",
      date: new Date("2025-04-28T13:05:00"),
      message: "Got it, thanks!",
      unreadAmount: 0,
    },
    {
      url: "",
      name: "Henry Patel",
      date: new Date("2025-04-27T16:30:00"),
      message: "You need help with report?",
      unreadAmount: "you",
    },
    {
      url: "",
      name: "Isla Rivera",
      date: new Date("2025-04-26T08:00:00"),
      message: "Good morning! ☀️",
      unreadAmount: 0,
    },
    {
      url: "",
      name: "Jack Thompson",
      date: undefined,
      message: "Let me know when you're free.",
      unreadAmount: "you",
    },
    {
      name: "Brian Lee",
      date: new Date("2025-05-01T10:20:00"),
      message: "Sure thing, I’ll review it today.",
      unreadAmount: "you",
      url: "",
    },
    {
      name: "Carla Mendes",
      date: new Date("2025-05-02T14:45:00"),
      message: "Are we still on for the meeting at 3?",
      unreadAmount: 0,
      url: "",
    },
    {
      name: "David Kim",
      date: new Date("2025-05-02T16:30:00"),
      message: "Just sent over the documents.",
      unreadAmount: 0,
      url: "",
    },
    {
      name: "Fiona Zhang",
      date: undefined,
      message: "Hi! Ping me when you’re free today.",
      unreadAmount: 0,
      url: "",
    },
    {
      name: "George Smith",
      date: new Date("2025-05-04T11:50:00"),
      message: "Thanks for the help earlier.",
      unreadAmount: 0,
      url: "",
    },
    {
      name: "Hannah Tran",
      date: new Date("2025-05-04T13:05:00"),
      message: "Let’s finalize the design.",
      unreadAmount: "you",
      url: "",
    },
    {
      name: "Isaac Patel",
      date: new Date("2025-05-05T09:30:00"),
      message: "Do we have any updates",
      unreadAmount: 0,
      url: "",
    },
  ];
  chatEntries.forEach((e, i) => {
    e.url = data[i] ?? "";
  });

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
          Chat
        </Text>
      </View>
      <View style={{ margin: 10 }}>
        <View
          style={{
            backgroundColor: colors.backgroundFocus,
            borderRadius: 8,
            height: 30,
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: colors.background,
              margin: 2,
              borderRadius: 6,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: colors.symbolImportant }}>Open chats</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              margin: 2,
              borderRadius: 6,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: colors.symbolUnimportant }}>Open chats</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={chatEntries}
          renderItem={(i) => <ChatEntry key={i.index} {...i.item} />}
          contentContainerStyle={{ paddingBottom:90, paddingRight: 10 }}
        ></FlatList>
      </View>
    </SafeAreaView>
  );
}

interface IChatEntryProps {
  url: string;
  name: string;
  date: Date | undefined;
  message: string;
  unreadAmount: number | "you" | undefined;
}

function ChatEntry(data: IChatEntryProps): JSX.Element {
  const colors = useColors();
  return (
    <View
      style={{
        flexDirection: "row",
        padding: 1,
        alignItems: "center",
        marginVertical: 6,
      }}
    >
      <Image
        src={data.url}
        style={{
          aspectRatio: 1,
          backgroundColor: colors.backgroundFocus,
          height: 60,
          marginRight: 10,
          borderRadius: 1000,
        }}
      ></Image>
      <View style={{ flex: 1 }}>
        <Text
          numberOfLines={1}
          style={{ fontSize: 16, color: colors.symbolImportant }}
        >
          {data.name}
        </Text>
        <View style={{ flexDirection: "row" }}>
          {data.unreadAmount == "you" ? (
            <Text
              numberOfLines={1}
              style={{ fontSize: 14, color: colors.symbolImportant }}
            >
              {"You: "}
            </Text>
          ) : (
            <></>
          )}

          <Text
            numberOfLines={1}
            style={{ fontSize: 14, color: colors.symbolUnimportant }}
          >
            {data.message}
          </Text>
          {data.date ? (
            <>
              <Text
                numberOfLines={1}
                style={{ fontSize: 14, color: colors.symbolUnimportant }}
              >
                {format(data.date, " • dd MMM")}
              </Text>
            </>
          ) : (
            <></>
          )}
        </View>
      </View>
      <View>
        {data.unreadAmount ? (
          data.unreadAmount == "you" ? (
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: 1000,
                backgroundColor: "white",
              }}
            />
          ) : (
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 1000,
                backgroundColor: colors.focus,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>{data.unreadAmount < 10 ? data.unreadAmount : "+"}</Text>
            </View>
          )
        ) : (
          <></>
        )}
      </View>
    </View>
  );
}
