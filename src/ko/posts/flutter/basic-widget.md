---
icon: install
date: 2024-06-28
category:
  - App
  - Flutter
  - Cross Platform
tag:
  - App
  - Flutter
  - Cross Platform
order: 2
---

# 플러터 기초

## 플러터의 기본 위젯 4가지

플러터는 위젯을 조합하여 뷰를 그려냅니다.

`Text, Image, Icon, Box` 기본 4가지가 있습니다.

::: code-tabs

@tab:active Text

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Text('안녕')
    );
  }
}
```

@tab Image

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Image.asset('assets/XXX.png')
    );
  }
}
```

@tab Icon

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Icon(Icons.shop)
    );
  }
}
```

@tab Container

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Center(
        child: Container( width: 50, height: 50, color: Colors.blue) // 혹은 SizedBox(), 50은 1.2cm 정도되는 단위인 LP
      )
    );
  }
}
```

:::

이미지 같은 경우 다음과 같이 설정해주세요.

`pubspec.yaml`
이 파일은 앱에서 필요한 모든 것들이 담겨있는 파일입니다.

이곳에 이미지를 등록시켜주어야 합니다.

프로젝트 루트에 `assets` 폴더를 만들어주고 안에 이미지를 넣어주고, `pubspec.yaml`에 다음과 같이 해주시면 됩니다.

```yaml
flutter:
  assets:
    - assets/
    # assets 폴더 안의 모든 것을 사용
```

<br/>
<br/>

## 레이아웃

앱에는 기본적으로 상단 중단 하단으로 나뉘어져 있습니다. 다음 예시의 `Scaffold` 는 상중하 를 나눌 수 있게 해주는 레이아웃입니다.

```dart
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        home: Scaffold(
          appBar: AppBar(backgroundColor: Colors.blue, title: Text('타이틀'), titleTextStyle: TextStyle(color: Colors.white, fontSize: 20)),
          body: Container(
            width: 50,
            height: 50,
            padding: EdgeInsets.all(50),
            decoration: BoxDecoration(
              color: Colors.blue,
              border: Border.all(color: Colors.black)
            )
          ),
          bottomNavigationBar: BottomAppBar(
            color: Colors.white,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: const [
                Icon(Icons.phone),
                Icon(Icons.message),
                Icon(Icons.contact_page)
              ],
            )
          ),
        )
    );
  }
}
```

### Row, Column

```dart
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        home: Scaffold(
          body: Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly, // 좌우 정렬, Web의 justify-content와 유사
            crossAxisAlignment: CrossAxisAlignment.center, // 상하 정렬
            children: const [
              Icon(Icons.star),
              Icon(Icons.star)
            ]
          )
        )
    );
  }
}
```

### 글자, 아이콘 스타일

```dart
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        home: Scaffold(
          body: SizedBox(
            child: Text('안녕',
                style: TextStyle(color: Colors.amber, fontWeight: FontWeight.w600)
            )
          )
        )
    );
  }
}
```

TextStyle에는 다양한 파라미터를 넣을 수 있습니다.
color 에는 Colors, Color(0xffffffff), Color.fromRGBO(r, g, b, opacity) 세 가지 방법으로 색상을 줄 수 있습니다.

### 버튼

::: code-tabs

@tab-active TextButton

```dart
body: SizedBox(
  child: TextButton(
    child: Text('버튼입니다'),
    onPressed: (){},
  )
)
```

@tab ElevatedButton

```dart
body: SizedBox(
  child: ElevatedButton(
    style: ElevatedButton.styleFrom(
      foregroundColor: Colors.redAccent,
      backgroundColor: Colors.greenAccent,
      shadowColor: Colors.greenAccent,
      elevation: 10.0,
    ),
    onPressed: (){},
    child: Text('버튼입니다11'),
  )
)
```

@tab IconButton

```dart
body: SizedBox(
  child: IconButton(
    icon: Icon(Icons.star),
    style: IconButton.styleFrom(
      foregroundColor: Colors.redAccent,
      backgroundColor: Colors.greenAccent,
      shadowColor: Colors.greenAccent,
      elevation: 10.0,
    ),
    onPressed: () {},
  )
)
```

@tab OutlinedButton

```dart
body: SizedBox(
  child: OutlinedButton(
    style: OutlinedButton.styleFrom(
      foregroundColor: Colors.redAccent,
      shadowColor: Colors.black26,
      elevation: 10.0,
    ),
    onPressed: () {},
    child: Text('버튼입니다'),
  )
)
```

:::

버튼의 종류에는 `TextButton, ElevatedButton, IconButton, OutlinedButton` 등이 있습니다.
onPressed 를 안적으면 에러가 발생합니다.

<br/>
<br/>

### AppBar 디자인

```dart
appBar: AppBar(
  actions: const [
    Icon(Icons.star),
    Icon(Icons.star),
  ],
  leading: Icon(Icons.star),
  title: Text('ddd')
),
```

<br/>
<br/>

### Flexible Expanded

Flexible은 박스폭을 %로 주고 싶을 때 사용하고, Expanded는 박스 하나를 넓게 채울 때 사용합니다.

::: code-tabs

@tab:active Example1

```dart
Row(
  children: [
    Flexible(flex: 5, child: Container(color: Colors.blue)),
    Flexible(flex: 5, child: Container(color: Colors.greenAccent)),
    Flexible(flex: 5, child: Container(color: Colors.redAccent))
  ]
)
```

@tab Example2

```dart
Row(
  children: [
    Expanded(child: Container(color: Colors.blue)),
    Container(width: 100, color: Colors.redAccent)
  ]
)
```

:::

<br/>
<br/>

### Custom Widget

