import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { theme } from "./color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Fontisto } from "@expo/vector-icons";

const STORAGE_KEY = "@toDos";
// touchableOpacity : listener가 준비된 컴포넌트
// touchableHighlight : touchableopacity 보다 더 많은 속성. 눌렀을 때, 배경색이 바뀌도록 해줄수 있음.
// onPress : 손가락이 눌렀다 나갔을 때, onPressout 영역 나갔을 대, onLongPress : 오래 눌렀을 때
// touchableWithoutFeedback : Touchable 컴포넌트. 화면의 가장 위에서 일어나는 탭 이벤트 listen -> no animation
// Pressable : 더 많은 설정 가능.

// TextInput keyboard type 설정할수 있는 프로퍼티 있음. 숫자만이라던지... url, mail,,,
// return Key Type : 키보드에 return 이라고 써져잇는 거 고칠수 있음. send/search/done...
// passworkd 사용시 secure~ prop 사용
// multiline : 줄바꿈시, 글자 초과시 계속 확장됨.
// 글자고쳐주개(대문자), 바꿔주기 가능

// object.keys(x) : obejct key들의 array 이제 map 사용 가능.
// object.keys(x).map(key => x[key]) : 각 key의 내용 얻기 가능.

// 사용자 폰에 저장하도록 하기 -> asyncstorage
// expo install @react-native-async-storage/async-storage

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  // not array, hashmap 처럼. state 직접 수정 불가능. object assign 사용 해서 기존의 object에 합치기 가능.
  const [toDos, setToDos] = useState({});

  useEffect(() => {
    loadToDos();
  }, []);

  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = (payload) => setText(payload);
  const saveToDos = async (toSave) => {
    // string으로 바꾼 후, 저장
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  };
  const loadToDos = async () => {
    const s = await AsyncStorage.getItem(STORAGE_KEY);
    setToDos(JSON.parse(s));
  };
  const addTodo = async () => {
    if (text === "") {
      return;
    }
    // 비어있는 object, 이전의 todo, 새로운 todo를 합침.

    // 1st 방법
    const newToDos = Object.assign({}, toDos, {
      [Date.now()]: { text, working },
    });

    // 2nd 방법
    const newToDos2 = { ...toDos, [Date.now()]: { text, work: working } };
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText("");
    // console.log(newToDos);
  };
  const deleteToDo = async (key) => {
    Alert.alert("Delete To Do", "Are you Sure?", [
      { text: "Cancel" },
      {
        text: "OK",
        style: "destructive",
        onPress: async () => {
          const newToDos = { ...toDos }; // state 내용으로 새로운 object 생성
          delete newToDos[key]; // 이게 되네...?
          setToDos(newToDos); // state는 mutate 하면 안됨.
          await saveToDos(newToDos);
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text
            style={{ ...styles.btnText, color: working ? "white" : theme.grey }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text
            style={{
              ...styles.btnText,
              color: !working ? "white" : theme.grey,
            }}
          >
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput
          onSubmitEditing={addTodo}
          returnKeyType="done"
          value={text}
          onChangeText={onChangeText}
          placeholder={working ? "Add a To do" : "where do you want to go? "}
          style={styles.input}
        />
        <ScrollView>
          {Object.keys(toDos).map((key) =>
            toDos[key].working === working ? (
              <View style={styles.toDo} key={key}>
                <Text style={styles.toDoText}>{toDos[key].text}</Text>
                <TouchableOpacity onPress={() => deleteToDo(key)}>
                  <Fontisto name="trash" size={18} color={theme.toDoBg} />
                </TouchableOpacity>
              </View>
            ) : null
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 100,
  },
  btnText: {
    fontSize: 38,
    fontWeight: "600",
    color: "white",
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginVertical: 20,
    fontSize: 18,
  },
  toDo: {
    backgroundColor: theme.grey,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toDoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});
