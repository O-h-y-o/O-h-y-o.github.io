# i18n으로 다국어 처리하기

미들웨어로서 다국어를 처리하는 법입니다.

클라이언트에게 사용 언어를 받아와 처리할 수도 있고, 유저에게 언어값을 저장하여 처리할 수도 있습니다.

클라이언트에서 헤더에 Language 라는 키로 언어를 넘기면 됩니다.

```ts
// src/middleware/language
import { Request, Response, NextFunction } from "express";
import i18n from "i18n";

i18n.configure({
  locales: ["en", "ko"],
  defaultLocale: "ko",
  directory: "src/i18n",
  // extension: ".ts",
  objectNotation: true,
});

export const language = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const language = (req.headers.language as string) || "ko";
    req.headers.language = language;
    i18n.setLocale(language);
    i18n.init(req, res);
    next();
  };
};
```

json으로 언어 관리를 하시면 src/i18n 폴더에 locales에 적어둔 언어만큼 en.json, ko.json 이 있어야합니다. extension은 프로젝트에서 관리하는 언어파일 확장자입니다. ts파일로 관리한다면 ts로 적어주시면 됩니다. (잘 안될수도...)

```ts
// src/routes
import { Router } from "express";
import { language } from "src/middleware/language";

const router: Router = Router();

router.use(language());
```

이렇게 설정을 해주시면 매 통신시마다 클라이언트의 언어를 가져와 다국어 처리를 해줄 수 있습니다.

번역처리는 `req.__()`, `res.__()` 로 번역을 할 수 있습니다.

예로들어서,

```json
// ko.json
{
  "word.change": "바꾸다"
}

// en.json
{
  "word.change": "Change"
}

```

라고 되어있다고할때, 클라이언트가 "en" 을 보내면 en이 설정값이 되어 res.\_\_("word.change") 는 Change 라는 값을 내어줍니다.

파라미터를 넣고싶으면 json에서는 이렇게 적어주세요

```json
// ko.json
{
  "word.change": "{{ word }} 바꾸다"
}
```

이렇게 하고 `res.__('word.change', { word: '세상을' })` 이라고 했을때 결과물은 `세상을 바꾸다` 가 됩니다. 이런식으로 파라미터 처리도 가능합니다.
