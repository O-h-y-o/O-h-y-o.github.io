# Vuepress Theme 로 블로그 만들기

Vuepress hope theme 로 개발 블로그를 만들어보자.

::: code-tabs#shell

@tab:active pnpm

```bash
pnpm create vuepress-theme-hope [dir]
```

@tab yarn

```bash
yarn create vuepress-theme-hope [dir]
```

@tab npm

```bash
npm init vuepress-theme-hope [dir]
```

:::

- [dir] 에는 만들고자하는 실제 폴더 이름을 넣어주어야 합니다.

```
language
package manager
Project Name
Project version
Project description
license
multiple languages
github workflow
type of project
initialize repo
```

- 10가지 정도의 선택을 해야합니다.

<br/>
<br/>

프로젝트가 만들어졌으면, 깃허브 홈페이지로 들어가서 `username.github.io` 라는 이름으로 github public repo 를 만들어줍니다. 아무것도 건들지 말고, repo 이름만 적고 만들어줍니다.

::: info 권한 수정하기

repo 를 만들고 Settings 탭 => Actions => General 로 들어가서 Workflow permissions의 옵션 중 Read and write permissions 로 바꿔주고 Save를 해줍니다.

:::

<br/>

::: warning deploy-docs.yml

vuepress hope 에서는 기본적으로 github actions 템플릿을 제공해줍니다.

```yml
# deploy-docs.yml
- name: Install pnpm
  uses: pnpm/action-setup@v2
  with:
    run_install: true
```

중간쯤에 `Install pnpm` 이란것이 있는데 다음과 같이 version을 넣어주어야 합니다.

```yml
# deploy-docs.yml
- name: Install pnpm
  uses: pnpm/action-setup@v2
  with:
    version: 8
    run_install: true
```

:::

<br/> <br/>

::: note 깃에 소스를 올리기 전 빌드 테스트를 해보겠습니다.

::: code-tabs#shell

@tab:active pnpm

```bash
pnpm run docs:build
```

@tab yarn

```bash
yarn docs:build
```

@tab npm

```bash
npm run docs:build
```

:::

::: tip 'useXXX() is called without provider' 에러 발생시

vuepress와 호환되지 않는 버전의 라이브러리가 있을시 해당 에러가 발생합니다.
vp-update를 하면 자동으로 버전이 vuepress와 호환되는 버전으로 맞춰집니다.

::: code-tabs#shell

@tab:active pnpm

```bash
$ pnpm dlx vp-update
```

@tab yarn

```bash
$ yarn dlx vp-update
```

@tab npm

```bash
$ npx vp-update
```

:::

<br/>

정상적으로 빌드가 되었다면 이제 깃 저장소에 소스를 올려보도록 하겠습니다.

<br/>

vuepress로 만든 프로젝트에서 터미널을 열어주고 깃 저장소에 연결하여 소스를 올려주겠습니다.

```sh
$ git init
$ git remote add origin [url]
$ git branch -m master main
$ git add .
$ git commit -m "message"
$ git push
```

<br/>

::: tip 브랜치 에러

git push에서 브랜치 에러가 난다면 다음 명령어를 입력해주세요.

```sh
$ git push --set-upstream origin main
```

:::

<br/>

여기까지 모두 git repo에 올렸으면, 이제 빌드가 되면서 따로 .yml 파일을 수정하지 않았다면 gh-pages 라는 브랜치가 새로 생겼을겁니다.

이번에는 Settings tab => Pages 로 들어가 Build and deployment 에서 Branch를 gh-pages로 바꾸고 Save 해주겠습니다.

잠시 기다린 뒤, username.github.io 로 들어가면 예쁜 홈페이지가 보일겁니다. 만약 홈페이지에 올라가지 않았다면 한번더 깃 저장소에 푸쉬를 해주세요.
