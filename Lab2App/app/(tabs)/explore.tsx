import { useColors } from "@/hooks/useThemeColor";
import { format } from "date-fns";
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { IconBrandSteam, IconSearch } from "tabler-icons-react-native";

export default function ExploreScreen() {
  const colors = useColors();
  const posts: IPostProps[] = [
    {
      authorName: "PixelWarrior",
      postDate: new Date("2025-05-01"),
      tag: "Minecraft",
      header: "My Nether Base Is Finally Complete!",
      description:
        "After weeks of gathering resources and surviving ghast attacks, my lava-surrounded fortress is done. Thoughts?",
      likeCount: 234,
      commentCount: 45,
    },
    {
      authorName: "FPS_King",
      postDate: new Date("2025-04-28"),
      tag: "Call of Duty",
      header: "Insane 360 No-Scope Montage 🔥",
      description:
        "Compiled my best sniper moments from Warzone. Tell me your favorite clip!",
      likeCount: 582,
      commentCount: 89,
    },
    {
      authorName: "ZeldaFan88",
      postDate: new Date("2025-05-05"),
      tag: "Zelda",
      header: "Tears of the Kingdom Review: Masterpiece?",
      description:
        "I just finished the game and have thoughts on story, world design, and combat improvements.",
      likeCount: 410,
      commentCount: 67,
    },
    {
      authorName: "GameDevNoob",
      postDate: new Date("2025-05-03"),
      tag: "Indie Dev",
      header: "Built My First Unity Game!",
      description:
        "It’s a top-down pixel art shooter inspired by Hotline Miami. Would love some feedback!",
      likeCount: 312,
      commentCount: 54,
    },
  ];

  return (
    <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
      <FlatList
        data={[null, ...posts]}
        contentContainerStyle={{ paddingVertical: 10 }}
        renderItem={(e) =>
          e.item ? (
            <Post {...e.item} />
          ) : (
            <>
              <View
                style={{
                  flexDirection: "row",
                  height: 50,
                  alignItems: "center",
                  margin: 10,
                }}
              >
                <IconBrandSteam
                  size={40}
                  color={colors.symbolUnimportant}
                  stroke={1}
                />
                <Text
                  style={{
                    color: colors.symbolUnimportant,
                    fontSize: 40,
                    fontWeight: "200",
                  }}
                >
                  Community
                </Text>
              </View>
              <View
                style={{
                  marginHorizontal: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: colors.symbolUnimportant,
                  }}
                >
                  Community and official content for all games and software
                </Text>
                <ScrollView
                  horizontal
                  style={{
                    gap: 4,
                    marginHorizontal: -10,
                    marginTop: 20,
                    overflow: "visible",
                  }}
                  showsHorizontalScrollIndicator={false}
                >
                  {[
                    <IconSearch color={colors.symbolImportant} />,
                    ...[
                      "All",
                      "Screenshots",
                      "Artwork",
                      "Workshop",
                      "Mods",
                    ].map((e) => (
                      <Text
                        style={{ fontSize: 18, color: colors.symbolImportant }}
                        children={e}
                      />
                    )),
                  ].map((e, i) => (
                    <TouchableOpacity
                      key={i}
                      style={{
                        padding: 12,
                        paddingHorizontal: 16,
                        marginHorizontal: 4,
                        borderRadius: 8,
                        backgroundColor: colors.backgroundFocus,
                      }}
                    >
                      {e}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </>
          )
        }
      ></FlatList>
    </SafeAreaView>
  );
}

interface IPostProps {
  authorName: string;
  postDate: Date;
  tag: string;
  header: string;
  description: string;
  likeCount: number;
  commentCount: number;
}
function Post(data: IPostProps): JSX.Element {
  const colors = useColors();
  return (
    <>
      <View
        style={{
          height: 5,
          backgroundColor: colors.tabBackground,
          marginTop: 10,

          width: "200%",
        }}
      />
      <View
        style={{ backgroundColor: colors.background, marginHorizontal: 20 }}
      >
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              flexDirection: "row",
              padding: 1,
              alignItems: "center",
              marginVertical: 6,
            }}
          >
            <Image
              src={"https://picsum.photos/200"}
              style={{
                aspectRatio: 1,
                backgroundColor: colors.backgroundFocus,
                height: 40,
                marginRight: 10,
                borderRadius: 1000,
              }}
            ></Image>
            <View style={{}}>
              <View style={{ flexDirection: "row" }}>
                <Text
                  numberOfLines={1}
                  style={{ fontSize: 16, color: colors.symbolImportant }}
                >
                  {data.authorName}{" "}
                </Text>
                <View
                  style={{
                    borderRadius: 8,
                    backgroundColor: colors.backgroundFocus,
                    paddingHorizontal: 8,
                    paddingTop: 1,
                  }}
                >
                  <Text style={{ color: colors.symbolUnimportant }}>
                    {data.tag}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  numberOfLines={1}
                  style={{ fontSize: 14, color: colors.symbolUnimportant }}
                >
                  {format(data.postDate, "dd MMM • h:mm a")}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          <Image
            src={"https://picsum.photos/300/600"}
            style={{
              aspectRatio: 2,
              backgroundColor: colors.backgroundFocus,
              borderRadius: 8,
            }}
          ></Image>
        </View>
        <View style={{ gap: 10, marginHorizontal: 5, marginVertical: 10 }}>
          <Text style={{ fontSize: 16, color: colors.symbolImportant }}>
            {data.header}
          </Text>
          <Text style={{ fontSize: 16, color: colors.symbolUnimportant }}>
            {data.description}
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            backgroundColor: colors.backgroundFocus,
            height: 2,
          }}
        />
        <View></View>
      </View>
    </>
  );
}
