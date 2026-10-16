# Nodejs Swagger API 문서 만들기 (typescript)

먼저 패키지 설치를 해주세요.

```sh
$ yarn add @types/swagger-jsdoc @types/swagger-ui-express -D
```

그리고 Swagger를 연동시켜줄 파일을 하나 만들어주세요. 저는 `src/middleware/swagger.ts`에 만들겠습니다.

```ts
// src/middleware/swagger.ts

import { Router } from "express";
import swaggerJSDoc, { OAS3Options } from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

const router: Router = Router();

const swaggerOptions: OAS3Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API 문서",
      version: "1.0.0",
    },
    components: {
      // 스키마 정의 예시
      schemas: {
        Example: {
          type: "object",
          properties: {
            example1: {
              type: String,
            },
            example2: {
              type: Number,
            },
            example3: {
              type: Object,
              additionalProperties: {
                type: Object,
                properties: {
                  additionalExample1: { type: Number },
                  additionalExample2: { type: Number },
                },
              },
            },
          },
        },
      },
      securitySchemes: {
        // 토큰 예시
        bearerAuth: {
          type: "apiKey",
          name: "authorization",
          scheme: "bearer",
          in: "header",
        },
      },
    },
  },
  apis: ["src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

router.use("/api-docs", swaggerUI.serve);
router.get("/api-docs", swaggerUI.setup(swaggerSpec));

export default router;
```

만들어둔 스웨거 파일을 app.ts에 등록시켜주겠습니다.

```ts
// app.ts
import express, { Express } from "express";
import swagger from "src/middleware/swagger";

const app: Express = express();

app.use(swagger);
```

다음으로 Routes에 스웨거를 적용시켜보겠습니다.

```ts
import { Router } from "express";

const router: Router = Router();

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: 로그인
 *     description: >
 *       아이디: 특수 문자를 제외한 4-16자리의 문자열 <br/>
 *       비밀번호: 특수 문자, 숫자를 한 개 이상 포함한 8-15자리의 문자열
 *       관련 코드: 1001, 1002, 1003, 1004, 1005
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               identity:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: 로그인 성공
 *         content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/loginResponse'
 *       400:
 *         description: 유효성 검사 실패 또는 이미 존재하는 유저
 *       500:
 *         description: 서버 오류
 */
router.post("/login", checkExistMember, checkPassword, userController.login);

/**
 * @swagger
 * /api/ko/exchange/candle:
 *   get:
 *     summary: 차트 candle 정보 가져오기
 *     description: >
 *       intervalUnit ex) minutes <br/>
 *       intervalCount ex) 1 | 5 | 15 <br/>
 *       cd ex) KRW-BTC <br/>
 *       count ex) 50 <br/>
 *       to ex) 1692473880000
 *     tags: [Ko-Exchange]
 *     parameters:
 *       - in: query
 *         name: cd
 *         required: true
 *         description: 코인 코드
 *         schema:
 *           type: string
 *       - in: query
 *         name: intervalUnit
 *         required: true
 *         description: 불러올 단위
 *         schema:
 *           type: string
 *       - in: query
 *         name: intervalCount
 *         required: true
 *         description: 불러올 유닛의 단위
 *         schema:
 *           type: string
 *       - in: query
 *         name: count
 *         required: true
 *         description: 몇개 불러올지
 *         schema:
 *           type: number
 *       - in: query
 *         name: to
 *         description: 추가로 불러올 데이터 시간(가지고있는 데이터의 가장 예전)
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: 캔들 조회 성공
 *       400:
 *         description: 잘못된 파라미터
 *       500:
 *         description: 서버 오류
 */
router.get("/candle", koExchangeController.getCandle);
```

제가 작성한 get, post 중 하나씩 가져왔습니다.

yml 파일을 작성하는것처럼 적어주시면 됩니다. swagger문서를 자동으로 만들어주는 툴도 있는 것 같지만 저는 이렇게 하나하나 다 적어주었습니다.

routes를 app에 등록시켜주고, 서버를 실행시켜 `localhost:PORT/api-docs` 로 들어가면 스웨거 문서가 나옵니다.
