# 모노레포 & Github CI/CD

멀티레포에서는 project repo가 각각 있기때문에 관리와 유지보수에 대한 비용이 늘어나게 됩니다.

모노레포에서는 하나의 레포에 프로젝트들이 있기때문에 통합적인 관리가 가능합니다.

멀티레포는 브랜치가 꼬이거나 하는 일이 적지만, 모노레포에서는 브랜치끼리 꼬이거나 ci/cd의 과정에서 몇 가지 문제가 발생할 수가 있습니다. (조심하지않으면..)

브랜치는 main, stage, dev 세개가 있고 프로젝트는 다음처럼 세개가 있다고 가정하겠습니다.

예제에서는 quasar와 yarn을 사용하기에 quasar를 사용하지 않으면 관련 내용은 모두 없애셔도 됩니다.

다음과 같은 프로젝트가 3개 있는 모노레포의 예시입니다.

Root
╚ project1
╚ project2
╚ project3

## 자동 Github CI/CD

자동 CI/CD를 위해 .github/workflows 에 .yml 파일을 만들고 다음과 같이 작성해주세요.

project1, 2, 3에 쓰일 yml파일을 하나씩 만들었지만, 하나에 모두 다 작성하셔도 됩니다.

```yml
name: Build & Deploy
on:
  push:
    branches:
      - main
      - stage
      - dev
    paths:
      - project1/**

jobs:
  build:
    runs-on: ubuntu-latest

    defaults:
      run:
        shell: bash

    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Install Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 20

      - name: Install dependencies
        run: yarn global add @quasar/cli && yarn install

      - name: Set env
        run: |
          if [[ ${{ github.ref }} == 'refs/heads/dev' ]]; then
            echo "VUE_APP_ENV=${{ secrets.DEV_PUBLISH_ENV }}" >> project1/.env
            echo "VUE_APP_API=${{ secrets.DEV_API }}" >> project1/.env
            echo "VUE_APP_CHAT_API"=${{ secrets.DEV_CHAT_API }} >> project1/.env
            cat project1/.env
          elif [[ ${{ github.ref }} == 'refs/heads/stage' ]]; then
            echo "VUE_APP_ENV=${{ secrets.STAGE_PUBLISH_ENV }}" >> project1/.env
            echo "VUE_APP_API=${{ secrets.STAGE_API }}" >> project1/.env
            echo "VUE_APP_CHAT_API"=${{ secrets.STAGE_CHAT_API }} >> project1/.env
            cat project1/.env
          elif [[ ${{ github.ref }} == 'refs/heads/main' ]]; then
            echo "VUE_APP_ENV=${{ secrets.PROD_PUBLISH_ENV }}" >> project1/.env
            echo "VUE_APP_API=${{ secrets.PROD_API }}" >> project1/.env
            echo "VUE_APP_CHAT_API"=${{ secrets.PROD_CHAT_API }} >> project1/.env
            cat project1/.env
          fi
      - name: Build and Deploy
        run: |
          if [[ ${{ github.ref }} == 'refs/heads/dev' ]]; then
            # build_process - ex) yarn build
            aws s3 sync <BUILD_FOLDER> <BUCKET_NAME> --acl public-read --delete
            aws cloudfront create-invalidation --distribution-id ${{ secrets.DEV_DISTRIBUTION }} --paths "/*"
          elif [[ ${{ github.ref }} == 'refs/heads/stage' ]]; then
            # build_process
            aws s3 sync <BUILD_FOLDER> <BUCKET_NAME> --acl public-read --delete
            aws cloudfront create-invalidation --distribution-id ${{ secrets.STAGE_DISTRIBUTION }} --paths "/*"
          elif [[ ${{ github.ref }} == 'refs/heads/main' ]]; then
            # build_process
            aws s3 sync <BUILD_FOLDER> <BUCKET_NAME> --acl public-read --delete
            aws cloudfront create-invalidation --distribution-id ${{ secrets.PROD_DISTRIBUTION }} --paths "/*"
          fi
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          AWS_DEFAULT_REGION: ${{ secrets.AWS_DEFAULT_REGION }}
```

## 수동 Github CI/CD

### Window

다음 사이트에서 github cli를 설치해주세요.

<a href="https://cli.github.com" target="_blank">https://cli.github.com</a>

### Mac

다음 명령어로 github cli를 설치해주세요.

```bash
$ brew install gh
```

github cli 설치가 완료되었다면, 다음으로 깃허브 로그인을 해주세요.

```shell
$ gh auth login
```

.github/workflows에 다음과 비슷하게 작성해주세요. 상황에 따라 다르게 적어주시면 됩니다.

```yml
name: deploy
on:
  workflow_dispatch:
    inputs:
      target:
        required: true
        type: string
      bucketName:
        required: true
        type: string
      branch:
        required: true
        type: string

jobs:
  build:
    runs-on: ubuntu-latest

    defaults:
      run:
        shell: bash

    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Install Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 20

      - name: Install dependencies
        run: yarn global add @quasar/cli & yarn install

      - name: Create .env & Build & Deploy
        run: |
          if [[ ${{ github.event.inputs.branch }} == 'dev' ]]; then
            echo "VUE_APP_API=${{ secrets.DEV_API }}" >> ${{github.event.inputs.target}}/.env
          elif [[ ${{ github.event.inputs.branch }} == 'stage' ]]; then
            echo "VUE_APP_API=${{ secrets.STAGE_API }}" >> ${{github.event.inputs.target}}/.env
          elif [[ ${{ github.event.inputs.branch }} == 'main' ]]; then
            echo "VUE_APP_API=${{ secrets.PROD_API }}" >> ${{github.event.inputs.target}}/.env
          fi
          cat ${{github.event.inputs.target}}/.env

          if [[ ${{ github.event.inputs.target }} == 'project1' ]]; then
            # build_process - ex) yarn build
          elif [[ ${{ github.event.inputs.target }} == 'project2' ]]; then
            # build_process
          elif [[ ${{ github.event.inputs.target }} == 'project3' ]]; then
            # build_process
          fi

          aws s3 sync ${{github.event.inputs.target}}/<BUILD_FOLDER> s3://${{github.event.inputs.bucketName}} --acl public-read --delete

          if [[ ${{ github.event.inputs.branch }} == 'dev' ]]; then

            if [[ ${{ github.event.inputs.target }} == 'project1' ]]; then
              aws cloudfront create-invalidation --distribution-id ${{ secrets.PROJECT1_DEV_DISTRIBUTION }} --paths "/*"
            elif [[ ${{ github.event.inputs.target }} == 'project2' ]]; then
              aws cloudfront create-invalidation --distribution-id ${{ secrets.PROJECT2_DEV_DISTRIBUTION }} --paths "/*"
            elif [[ ${{ github.event.inputs.target }} == 'project3' ]]; then
              aws cloudfront create-invalidation --distribution-id ${{ secrets.PROJECT3_DEV_DISTRIBUTION }} --paths "/*"
            fi

          elif [[ ${{ github.event.inputs.branch }} == 'stage' ]]; then

            if [[ ${{ github.event.inputs.target }} == 'project1' ]]; then
              aws cloudfront create-invalidation --distribution-id ${{ secrets.PROJECT1_STAGE_DISTRIBUTION }} --paths "/*"
            elif [[ ${{ github.event.inputs.target }} == 'project2' ]]; then
              aws cloudfront create-invalidation --distribution-id ${{ secrets.PROJECT2_STAGE_DISTRIBUTION }} --paths "/*"
            elif [[ ${{ github.event.inputs.target }} == 'project3' ]]; then
              aws cloudfront create-invalidation --distribution-id ${{ secrets.PROJECT3_STAGE_DISTRIBUTION }} --paths "/*"
            fi

          elif [[ ${{ github.event.inputs.branch }} == 'main' ]]; then

            if [[ ${{ github.event.inputs.target }} == 'project1' ]]; then
              aws cloudfront create-invalidation --distribution-id ${{ secrets.PROJECT1_PROD_DISTRIBUTION }} --paths "/*"
            elif [[ ${{ github.event.inputs.target }} == 'project2' ]]; then
              aws cloudfront create-invalidation --distribution-id ${{ secrets.PROJECT2_PROD_DISTRIBUTION }} --paths "/*"
            elif [[ ${{ github.event.inputs.target }} == 'project3' ]]; then
              aws cloudfront create-invalidation --distribution-id ${{ secrets.PROJECT3_DISTRIBUTION }} --paths "/*"
            fi

          fi

        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          AWS_DEFAULT_REGION: ap-northeast-2
```

저는 branch와 배포할 프로젝트인 target을 값으로 받겠습니다. 그리고 branch에 따라 bucketName을 보내주겠습니다.

`inquirer` 라이브러리를 통하여 값을 받아주겠습니다.
프로젝트 루트에서 `inquirer` 라이브러리를 설치해주세요.
타입스크립트의 경우 `@types/inquirer`를 같이 설치해주세요.

```shell
$ yarn -W add -D inquirer @types/inquirer
```

그리고 프로젝트 루트에 `deploy.ts`를 만들어주시고 다음 코드와 비슷하게 작성해주세요.

```js
import inquirer from "inquirer";
import { exec } from "child_process";

const inquirerBranch = async () => {
  const { branch } = await inquirer.prompt([
    {
      type: "list",
      name: "branch",
      message: "배포를 진행할 브랜치를 선택해주세요.",
      choices: ["dev", "stage", "main"],
    },
  ]);

  return branch;
};

const inquirerTarget = async () => {
  const { target } = await inquirer.prompt([
    {
      type: "list",
      name: "target",
      message: "배포를 진행할 프로젝트를 선택해주세요.",
      choices: ["project1", "project2", "project3"],
    },
  ]);

  return target;
};

(async () => {
  try {
    const branch = await inquirerBranch();
    const target = await inquirerTarget();
    let bucketName;

    if (branch === "dev") {
      if (target === "project1") {
        bucketName = "dev_project1";
      } else if (target === "project2") {
        bucketName = "dev_project2";
      } else if (target === "project3") {
        bucketName === "dev_project3";
      }
    } else if (branch === "stage") {
      if (target === "project1") {
        bucketName = "stage_project1";
      } else if (target === "project2") {
        bucketName = "stage_project2";
      } else if (target === "project3") {
        bucketName = "stage_project3";
        return;
      }
    } else if (branch === "main") {
      if (target === "project1") {
        bucketName = "prod_project1";
      } else if (target === "project2") {
        bucketName = "prod_project2";
      } else if (target === "project3") {
        bucketName === "prod_project3";
      }
    }

    exec(
      `gh workflow run deploy --ref ${branch} -F target=${target} -F bucketName=${bucketName} -F branch=${branch}`,
      (error) => {
        if (error) {
          console.error(error.message);

          return;
        } else {
          console.log(
            `
        /** DEPLOY INFO **/\n
          deploy branch: ${branch}\n
          deploy project: ${target}\n
          deploy bucket name: ${bucketName}\n
        /** The deployment will begin shortly. **/
        `
          );
        }
      }
    );
  } catch (ex) {
    console.error(ex);
  }
})();
```

그리고 루트의 `package.json` 에 `type은 "module"`로 설정해주시고, scripts에 다음과 비슷하게 작성해주시면 됩니다.

```json
    "deploy": "node ./deploy"
```

그리고 터미널에서 `npm run deploy` 혹은 `yarn deploy` 등등을 입력해주시면 됩니다.

```info
노드버전 18이하는 에러가 발생합니다. 18버전 이상이나 최신버전의 node.js를 설치해주세요.
```
