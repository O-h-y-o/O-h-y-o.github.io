# 타입스크립트 절대 경로 설정하기

```ts
import Test from "../../test.ts";
```

../../ 이런식으로 상대경로로 import 해오는 것을 절대경로로 바꾸는 방법에 대해 설명하겠습니다.

먼저 module-alias 모듈을 설치해주세요.

```sh
$ yarn add -D module-alias
```

package.json에 다음 문구를 추가해주세요.

```json
// package.json
{
  "_moduleAliases": {
    "src": "./src"
  }
}
```

src 라는 이름이 절대 경로가 되고, ./src 가 경로가 됩니다.

"@test": "./test"

로 하면 @test 라는 이름이 절대 경로가 되고, ./test 가 경로가 됩니다.

설정이 되었다면, 이제 다음과 같이 사용이 가능합니다.

```ts
import Test from "src/test";
```

타입스크립트 빌드를 위해서 다음과 같이 해주세요.

```ts
// root.ts (app.ts)
import "module-alias/register";
```

javascript는 절대 경로를 이해하지 못하므로 `import "module-alias/register";` 를 넣어주어야 합니다.

배포를 할때는 다음과 같이 빌드결과물이 있는 폴더명으로 바꾸어주어야 합니다.

```json
// package.json
{
  "_moduleAliases": {
    "src": "./dist"
  }
}
```

npm run start 가 디폴트 실행 명령으로 되어있다면 다음처럼 해주세요.

```json
// package.json
{
  "scripts": {
    "start": "node dist/app.js"
  }
}
```
