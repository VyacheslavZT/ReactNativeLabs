import { useColors } from "@/hooks/useThemeColor";
import { LinearGradient } from "expo-linear-gradient";
import {
  Image,
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import {
  IconBrandSteam,
  IconSearch,
  IconBrandWindows,
  IconBrandFinder,
  IconBrandUbuntu,
  TablerIcon,
  IconBrandApple,
  IconVector,
} from "tabler-icons-react-native";

export default function HomeScreen() {
  const colors = useColors();
  const games: Game[] = [
    {
      name: "Skybound Odyssey",
      platforms: new Set(["Windows", "Linux"]),
      fullPrice: 29.99,
      discountPercent: 20,
      suggestReason: "Recommended by your friend, Alex",
    },
    {
      name: "Ironclad Tactics",
      platforms: new Set(["Windows"]),
      fullPrice: 49.99,
      discountPercent: 30,
      suggestReason: "You enjoyed similar strategy games",
    },
    {
      name: "Mystic Horizon",
      platforms: new Set(["Windows", "Mac"]),
      fullPrice: 39.99,
      suggestReason: "Top-rated in the fantasy RPG category",
    },
    {
      name: "Neon Drift",
      platforms: new Set(["Windows"]),
      fullPrice: 59.99,
      discountPercent: 15,
      suggestReason: "Players who liked SpeedRush also liked this",
    },
    {
      name: "Echoes of Solaris",
      platforms: new Set(["Mac", "Linux"]),
      fullPrice: 19.99,
      discountPercent: 40,
      suggestReason: "Sci-fi fans are raving about it",
    },
    {
      name: "Pixel Raiders",
      platforms: new Set(["Windows", "Linux"]),
      fullPrice: 24.99,
      suggestReason: "Highly rated indie platformer",
    },
    {
      name: "The Forgotten Realms",
      platforms: new Set(["Windows", "Mac"]),
      fullPrice: 44.99,
      discountPercent: 10,
      suggestReason: "Based on your interest in narrative-driven games",
    },
    {
      name: "Aetherstorm",
      platforms: new Set(["Windows"]),
      fullPrice: 34.99,
      suggestReason: "Recently trending in your region",
    },
    {
      name: "Codebreaker X",
      platforms: new Set(["Windows", "Linux", "Mac"]),
      fullPrice: 14.99,
      discountPercent: 50,
      suggestReason: "Part of the weekly puzzle picks",
    },
    {
      name: "Starlight Rally",
      platforms: new Set(["Windows"]),
      fullPrice: 39.99,
      discountPercent: 35,
      suggestReason: "You played Galactic Racers 2",
    },
  ];

  return (
    <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
      <ScrollView>
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
            Store
          </Text>
          <View style={{ flex: 1 }} />
          <IconSearch color={colors.symbolUnimportant} />
        </View>
        <View style={{ margin: 20 }}>
          <FlatList
            contentContainerStyle={{
              gap: 20,
            }}
            style={{
              overflow: "visible",
            }}
            data={games}
            renderItem={(g) => <BigGame {...g.item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
          <ScrollView
            horizontal
            style={{
              gap: 4,
              marginVertical: 20,
              overflow: "visible",
            }}
            showsHorizontalScrollIndicator={false}
          >
            {[
              "Top Sellers",
              "Free to play",
              "Early Access",
              "Mods",
              "Discounts",
              "Classic",
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
                <Text
                  style={{ fontSize: 18, color: colors.symbolImportant }}
                  children={e}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
          {games.map((g, i) => (
            <SmallGame key={i} {...g} />
          ))}
        </View>
      </ScrollView>{" "}
    </SafeAreaView>
  );
}

type GamePlatform = "Windows" | "Mac" | "Linux";

interface Game {
  name: string;
  platforms: Set<GamePlatform>;
  fullPrice: number; //current price with discount
  discountPercent?: number;
  suggestReason: string;
}

const PlatformIcon: Record<GamePlatform, TablerIcon> = {
  Windows: IconBrandWindows,
  Mac: IconBrandApple,
  Linux: IconBrandUbuntu,
};

function BigGame(props: Game): JSX.Element {
  const dimensions = useWindowDimensions();
  const colors = useColors();
  return (
    <View
      style={{
        aspectRatio: 4 / 3,
        width: dimensions.width - 60,
        borderRadius: 16,
        overflow: "hidden",
      }}
    >
      <Image
        src={`https://picsum.photos/seed/${Math.floor(
          Math.random() * 1000
        )}/640/480`}
        style={{ width: "100%", height: "100%", position: "absolute" }}
      />
      <LinearGradient
        colors={["transparent", "transparent", "black"]}
        style={{ width: "100%", height: "100%", position: "absolute" }}
      ></LinearGradient>
      <View style={{ flex: 1 }} />
      <View style={{ margin: 16 }}>
        <Text style={{ fontSize: 20, color: colors.symbolImportant }}>
          {props.name}
        </Text>
        <Text style={{ fontSize: 15, color: colors.symbolUnimportant }}>
          {props.suggestReason}
        </Text>
        <View style={{ borderRadius: 4, flexDirection: "row", width: "100%" }}>
          <View
            style={{
              borderRadius: 4,
              flexDirection: "row",
              overflow: "hidden",
            }}
          >
            {props.discountPercent ? (
              <>
                <View style={{ padding: 5, backgroundColor: "green" }}>
                  <Text>-{props.discountPercent}%</Text>
                </View>
                <View
                  style={{
                    padding: 5,
                    backgroundColor: "#0000007f",
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      textDecorationLine: "line-through",
                      color: "white",
                    }}
                  >
                    ${props.fullPrice}{" "}
                  </Text>
                  <Text
                    style={{
                      color: "white",
                    }}
                  >
                    $
                    {Math.round(
                      props.fullPrice * 0.01 * (100 - props.discountPercent)
                    ) - 0.01}
                  </Text>
                </View>
              </>
            ) : (
              <View style={{ padding: 5, backgroundColor: "#0000007f" }}>
                <Text
                  style={{
                    color: "white",
                  }}
                >
                  ${props.fullPrice}
                </Text>
              </View>
            )}
          </View>
          <View style={{ flex: 1 }} />
          <View style={{ flexDirection: "row" }}>
            {[...props.platforms.values()]
              .map((platform) => PlatformIcon[platform])
              .map((PlatformIcon, index) => (
                <PlatformIcon
                  stroke={1.2}
                  key={index}
                  color={colors.symbolImportant}
                />
              ))}
          </View>
        </View>
      </View>
    </View>
  );
}

function SmallGame(props: Game): JSX.Element {
  const colors = useColors();
  return (
    <View
      style={{
        flexDirection: "row",
        padding: 1,
        alignItems: "center",
        width: "100%",
        height: 50,
        marginVertical: 6,
      }}
    >
      <Image
        src={`https://picsum.photos/seed/${Math.floor(
          Math.random() * 1000
        )}/320/240`}
        style={{
          height: "100%",
          aspectRatio: 4 / 3,
          borderRadius: 8,
          marginRight: 10,
        }}
      />
      <View style={{ flex: 1 }}>
        <Text
          numberOfLines={1}
          style={{ fontSize: 16, color: colors.symbolImportant }}
        >
          {props.name}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {[...props.platforms.values()]
            .map((platform) => PlatformIcon[platform])
            .map((PlatformIcon, index) => (
              <PlatformIcon
                key={index}
                color={colors.symbolUnimportant}
                stroke={1.2}
              />
            ))}
          <Text
            style={{
              fontSize: 16,
              color: colors.symbolUnimportant,
              fontWeight: "black",
            }}
          >
            {[...props.platforms.values()].join(", ")}
          </Text>
        </View>
      </View>
      <View>
        {props.discountPercent ? (
          <>
            <View
              style={{
                padding: 5,
                flexDirection: "row",
                alignItems: "flex-end",
              }}
            >
              <Text
                style={{
                  textDecorationLine: "line-through",
                  color: "white",
                }}
              >
                ${props.fullPrice}{" "}
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                }}
              >
                $
                {Math.round(
                  props.fullPrice * 0.01 * (100 - props.discountPercent)
                ) - 0.01}
              </Text>
            </View>
            <View style={{ flexDirection: "row-reverse" }}>
              <View
                style={{
                  padding: 5,
                  backgroundColor: "green",
                  borderRadius: 4,
                }}
              >
                <Text>-{props.discountPercent}%</Text>
              </View>
            </View>
          </>
        ) : (
          <>
            <View style={{ padding: 5 }}>
              <Text style={{ fontSize: 20, color: colors.symbolImportant }}>
                ${props.fullPrice}
              </Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
}
