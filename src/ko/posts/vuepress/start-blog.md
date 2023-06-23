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

프로젝트가 만들어졌으면, 깃허브 홈페이지로 들어가서 `username.github.io` 라는 이름으로 github public repo 를 만들어줍니다.

vuepress로 만든 프로젝트에서 터미널을 열어주고 깃 저장소에 연결하겠습니다..

```sh
$ git init
$ git remote add origin [url]
$ git branch -m master main
$ git add .
$ git commit -m "message"
$ git push
```

git push에서 브랜치 에러가 난다면 다음 명령어를 입력해주세요.

```sh
$ git push --set-upstream origin main
```

vuepress hope 에서는 기본적으로 github actions 템플릿을 제공해줍니다.

```
- name: Install pnpm
  uses: pnpm/action-setup@v2
  with:
    run_install: true
```

중간쯤에 `Install pnpm` 이란것이 있는데 다음과 같이 version을 넣어주어야 합니다.

```
- name: Install pnpm
  uses: pnpm/action-setup@v2
  with:
    version: 8
    run_install: true
```
