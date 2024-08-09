---
date: 2024-08-09
category:
  - typescript
order: 1
---

# 타입스크립트 any 타입 경고 무시하기

```cjs
module.exports = {
  rules: {
    "@typescript-eslint/no-explicit-any": "off", // 추가
  },
};
```

요즘은 기본 설정으로 any가 있으면 에러처리가 되어버리는데 꼭 그래야만 하나 싶긴하다. 타입을 아예 지정하지 못할때도 있는데말이지..

`// eslint-disable-next-line @typescript-eslint/no-explicit-any`

이런거를 계속 쓸수는 없으니까..
