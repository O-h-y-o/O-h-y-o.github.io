# Koyeb 으로 nodejs 서버 배포하기

Koyeb은 github 로그인을 지원하고, github 프로젝트를 연결하여 배포까지 해주는 올인원 서비스입니다. Netlify와 똑같다고 생각해주시면 될 것 같습니다. 도커 이미지를 통한 배포 방법도 있으나 저는 깃허브와 연동하여 배포하겠습니다.

단순히 프로젝트를 깃허브에 올리는 것만으로도 별다른 세팅 해줄 것 없이 바로 서버 배포가 가능합니다.

한달에 5.5달러를 지원해줘서 서버 비용도 크게 부담이 되지 않는 장점이 있습니다.

1. github 아이디 연동을 하여 로그인 해주세요.

2. `Create App` 버튼을 누른 뒤 Github를 선택해주세요.

3. 배포하고자 하는 레포를 선택해주세요.

4. 배포 서비스 이름을 적어주고, 배포를 원하는 브랜치를 선택해주세요.

5. `Buildpack` 을 선택해주고 `Build and deployment settings` 를 눌러 커맨드들을 자신의 프로젝트의 package.json에서 정한 커맨드와 맞추어주고, Work directory도 따로 있다면 적어주세요.

저같은 경우에는 `Build command` 에는 yarn build, `Run command` 에는 yarn build:dev, `Work directory` 에는 client-backapi 폴더명을 적어주었습니다.

```json
"scripts": {
  "build": "tsc",
  "build:dev": "ts-node -r module-alias/register dist/app.js",
}
```

Autodeploy 를 활성화하면 해당 프로젝트에 변화가 감지되면 애플리케이션이 다시 배포됩니다. 원하시지 않는다면 비활성화를 해주세요.

6. `Choose your service type`에는 Web Service를 선택해주세요.

7. `Regions`는 프리티어를 사용하면 미국과 프랑스를 선택할수있는데 원하시는것을 선택해주시면 됩니다. 둘다 선택할 수도 있습니다.

8. Instance는 비용을 잘 고려해서 선택해주세요.

9. Advanced에는 프로젝트에서 사용되는 환경 변수를 설정해주세요. 포트도 지정해줄 수 있습니다. Scaling은 Autoscaling이 지원되므로 1로 두어도 됩니다.

10. 마지막으로 App name을 적어주고 Deploy를 눌러주세요.
