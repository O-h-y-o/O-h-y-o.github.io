# Nodejs cors 설정하기

부연설명없이 크게 설정을 많이 하지않으니 바로 코드만 적겠습니다.

```ts
// src/middleware/cors
import { NextFunction, Request, Response } from "express";

const corsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const allowedOrigins = ["url"];

  res.header("Access-Control-Allow-Origin", allowedOrigins); // '*'를 넣으면 전체 허용합니다.
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  // header에 다른 값을 허용하고싶으면 추가로 적어주세요.
  res.header(
    "Access-Control-Allow-Methods",
    "GET, PUT, UPDATE, PATCH, POST, DELETE"
  );

  next();
};

export default corsMiddleware;
```

```ts
// app.ts
import express, { Express } from "express";
import corsMiddleware from "src/middleware/cors";

const app: Express = express();

app.use(corsMiddleware);

// 만약 corsMiddleware에서 설정한 Methods들이 정상적으로 작동되지않으면 아래 코드를 추가해주세요.
app.use(
  cors({
    origin: "*", // url
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);
```
