import { useEffect, useRef, useState } from "react";
import {
  Button,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import DatePicker from "react-native-date-picker";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { differenceInMinutes, differenceInSeconds, format } from "date-fns";

import axios from "axios";
import { OneSignal } from "react-native-onesignal";

// ConfigStorage.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_KEY, APP_ID } from "./_layout";
const url = "https://api.onesignal.com/notifications";

let i__ = 0;
export default function HomeScreen() {
  const name = useRef<string>("");
  const description = useRef<string>("");
  const date = useRef<Date>(new Date() /* NOW */);
  const insets = useSafeAreaInsets();
  const dimensions = useWindowDimensions();

  const [saveData, setSaveData] = useState<Config | null>({
    notifications: [],
  });

  useEffect(() => {
    load();
    setSaveData(getConfig()!);
  }, []);

  console.log(i__++);
  console.log(JSON.stringify(saveData));

  const [pushSubscription, setPushSubscription] = useState<string | "error">(
    "error"
  );

  let buttonActive = true;
  if (differenceInSeconds(new Date(), date.current) > 0) {
    buttonActive = false;
  }

  useEffect(() => {
    setTimeout(() => {
      OneSignal.User.getOnesignalId()
        .then((s) => {
          console.log("subscription:", s);
          setPushSubscription(s ?? "error");
        })
        .catch(() => {
          setPushSubscription("error");
        });
    }, 2000);
  }, [pushSubscription]);

  const onClick = () => {
    if (pushSubscription === "error") {
      return;
    }
    const name_push = name.current;
    const description_push = description.current;
    const date_push = date.current.toISOString();
    axios
      .post(
        url,
        {
          app_id: APP_ID,
          contents: { en: name_push + ": " + description_push },
          send_after: date_push,
          include_aliases: {
            onesignal_id: [pushSubscription],
          },
          target_channel: "push",
        },
        {
          headers: {
            Authorization: "basic " + API_KEY,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((e) => {
        const newSaveData = JSON.parse(JSON.stringify(saveData)) as Config;

        mutateConfig((config) => {
          const newSave = config;
          newSave.notifications = newSave.notifications ?? [];

          newSave.notifications.push({
            date: date_push,
            name: name_push,
            description: description_push,
            id: e.data.id,
          });
          return newSave;
        }).then(setSaveData);

        setSaveData(newSaveData);
      })
      .catch((e) => {
        console.log("errror: ", e);
      });
  };

  const cancelNotification = (notification: any) => {
    axios
      .delete(
        "https://api.onesignal.com/notifications/" +
          notification.id +
          "?app_id=" +
          APP_ID,
        {
          headers: {
            Authorization:
              "basic " +
              API_KEY,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        mutateConfig((config) => {
          const newSave = config;
          newSave.notifications = (newSave.notifications ?? []).filter(
            (n) => n.id !== notification.id
          );
          return newSave;
        }).then(setSaveData);
      })
      .catch((e) => {
        console.log("error: ", e);
      });
  };

  useEffect(() => {
    mutateConfig((c) => {
      c.notifications = c.notifications.filter((a) => {
        let diff = differenceInSeconds(a.date, new Date());
        console.log("diff:", diff);
        return diff > 0;
      });
      return c;
    }).then(setSaveData);
  }, [JSON.stringify(saveData?.notifications)]);

  return (
    <View
      style={{
        marginTop: insets.top,
        marginBottom: insets.bottom,
        marginLeft: insets.left,
        marginRight: insets.right,
        alignItems: "center",
      }}
    >
      <View style={{ padding: 20, alignItems: "center", gap: 10 }}>
        <TextInput
          style={{
            paddingHorizontal: 12,
            alignSelf: "stretch",
            alignContent: "center",
            borderColor: "dodgerblue",
            borderWidth: 1,
            borderRadius: 8,
          }}
          onChange={(t) => (name.current = t.nativeEvent.text)}
          placeholder="Name"
        />
        <TextInput
          style={{
            paddingHorizontal: 12,
            alignSelf: "stretch",
            alignContent: "center",
            borderColor: "dodgerblue",
            borderWidth: 1,
            borderRadius: 8,
          }}
          onChange={(t) => (description.current = t.nativeEvent.text)}
          placeholder="Description"
        />
        <View
          style={{
            backgroundColor: "#7f7f7f1f",
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          <DatePicker
            date={date.current}
            minimumDate={date.current}
            onDateChange={(d) => (date.current = d)}
          />
        </View>
        <TouchableOpacity
          style={{
            padding: 12,
            paddingHorizontal: 50,
            alignContent: "center",
            backgroundColor:
              pushSubscription !== "error" ? "dodgerblue" : "gray",
            borderWidth: 1,
            borderRadius: 8,
          }}
          onPress={onClick}
        >
          <Text style={{ color: "white" }}>
            {pushSubscription === "error" ? "Loading" : "Add"}
          </Text>
        </TouchableOpacity>
        <FlatList
          contentContainerStyle={{
            alignSelf: "flex-end",
            width: dimensions.width - 40,
          }}
          renderItem={(notification) => {
            return (
              <>
                <View
                  style={{
                    margin: 10,
                    borderWidth: 1,
                    borderColor: "7f7f7f3f",
                    borderRadius: 8,
                    padding: 8,
                  }}
                >
                  <Text>Name: {notification.item.name}</Text>
                  <Text>Description: {notification.item.description}</Text>
                  <Text>
                    {format(notification.item.date, "yy.MM.dd HH:mm")}
                  </Text>
                  <Text></Text>
                  <Button
                    title="Delete"
                    onPress={() => {
                      cancelNotification(notification.item);
                    }}
                  />
                </View>
              </>
            );
          }}
          data={getConfig()?.notifications ?? []}
        ></FlatList>
      </View>
    </View>
  );
}

const CONFIG_KEY = "APP_CONFIG";

type Config = {
  notifications: {
    id: string;
    date: string;
    name: string;
    description: string;
  }[];
};

let configCache: Config | null = null;

export async function save(config: Config): Promise<void> {
  configCache = config;
  await AsyncStorage.setItem(CONFIG_KEY, JSON.stringify(config));
}

export async function load(): Promise<Config> {
  const stored = await AsyncStorage.getItem(CONFIG_KEY);
  configCache = stored ? JSON.parse(stored) : {};
  if (configCache) return configCache;
  else throw "config is null";
}

export function getConfig(): Config | null {
  return configCache;
}

const mutationQueue: (() => Promise<void>)[] = [];
let processing = false;

export function mutateConfig(
  mutator: (config: Config) => Config
): Promise<Config> {
  return new Promise<Config>((resolve, reject) => {
    mutationQueue.push(async () => {
      try {
        const config = await load();
        const result = await mutator(config);
        await save(result);
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });

    if (!processing) {
      processQueue();
    }
  });
}

async function processQueue() {
  processing = true;
  while (mutationQueue.length > 0) {
    const task = mutationQueue.shift();
    if (task) {
      await task();
    }
  }
  processing = false;
}
