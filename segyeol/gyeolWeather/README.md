## 1. Introduction

#### 환경 설정

1. `npm install --global expo-cli`

2. aos/ios app store 에서 expo 다운로드

#### 동작 원리

Native 단에서 event -> bridget를 통해 JS에 메시지 전달

#### expo 프로젝트 생성

1. `expo init` 후, empty project 선택
2. `npm start` 친 후, project 실행
3. ios/aos 에서 실행

## 2. Weather App

#### Snack

snack.expo.dev에서 react 애플리케이션 생성 가능

#### The rules of RN

1. `<div>` 대신 `<View>` 사용. 항상 View import 해야함.
2. 모든 Text는 `<Text>` component 를 사용해야함.
3. `<View>` 에는 style이 존재함. 일부 사용하지 못하는 속성이 존재함. 웹에서 사용하던 모든 것을 사용할 수는 없음.
4. `StyleSheet.create` : object 생성하는 것을 뜻함. 자동완성 지원. styles 를 분리할지 말지는 본인의 선택.
5. status-bar : third-party package. 시계, 배터리, WIFI 와 같은 것들.

#### React Native Packages

**reactnative.dev**

기존에 많은 Component들이 React Native Core Component로 존재하고 있었음. 현재는 많은 APIs 와 Component가 사라지고, 핵심 Component만 남아있다.

**reactnative.directory**

third-party 패키지 및 API. 커뮤니티에 의존해야한다는 단점.

**Expo SDK**

https://docs.expo.dev/

앱 개발할 때 쓸만한 왠만한 API들은 모두 제공하고 있음.

#### Layout System

1. 모든 View는 `Flex Container` 이다. Flex direction의 기본값은 모두 `column`이다. (웹과의 차이점)
   `flexdirection : "row"` 를 통해서, 가로로 setting 가능함.
2. 너비와 높이에 기반해서 레이아웃을 만들일은 없다고 보면 됨 (아이콘 제외). 각 폰의 크기가 다 다를것이기 때문에 반응형으로 짜야함.
3. `flex` 사용하기. `flex` 는 비율이라고 생각하는게 편하다.
4. Flex의 부모가 중요함. Flex 부모에 `flex : value값 ` 이라고 설정하는 것이 중요함. flex는 같은 depth의 컴포넌트가 존재할 경우에 유효하다.

**Code**

```react
import React from "react";
import { View } from "react-native";

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "tomato" }}></View>
      <View style={{ flex: 1.5, backgroundColor: "green" }}></View>
      <View style={{ flex: 1, backgroundColor: "orange" }}></View>
      <View></View>
    </View>
  );
}
```

#### Styles

** 폰 흔들면 메뉴 보임 **

스크롤하기 -> `ScrollView` Component 사용하기.

- horizontal 사용 -> 가로로 스크롤 가능
- ScrollView를 쓸 때, ScrollView의 style을 주고싶다면 contentContainerStyle을 사용해야함.
- ScrollView에서는 flex를 사용해야할 필요가 없음.
- pagingEnabled 속성
- showsHorizontalScrollIndicator : false || true
- indicatorStyle : 페이지 인디케이터 속성 변경 가능

핸드폰 사이즈 API -> `Dimenstions` Component

#### location

`expo install expo-location`

#### Weather

https://openweathermap.org/api

Activity Indicator : Loading Component

다른 style + 개별 스타일 : 이중괄호 + spread 연산자 쓰기

`{{ ...styles.day, alignItems: "center" }}`

#### result images

<img src="https://user-images.githubusercontent.com/46738049/172659243-bbbe5707-14ab-4184-a70e-20fb4a2387d3.png" width="200" height="400"/>


