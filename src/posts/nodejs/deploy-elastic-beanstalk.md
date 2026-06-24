# Elastic Beanstalk + Github actions 로 nodejs 배포하기

## IAM 권한 설정 & 역할 만들기

우선 IAM 권한 설정을 하겠습니다.

<a href="http://us-east-1.console.aws.amazon.com/iamv2/home" target="_blank"> IAM </a>

IAM에 들어가서 사용자가 없다면 사용자 생성을 해주고 사용자가 있다면 바로 권한 추가를 하여 `AdministratorAccess-AWSElasticBeanstalk` 를 추가해주세요.

그리고 `역할 탭`을 눌러서 `역할 만들기`를 눌러주세요.

엔티티 유형은 AWS서비스, 사용사례는 EC2를 선택하고 다음을 눌러주세요.

다음 3가지에 대한 정책을 추가해주세요.

```
AWSElasticBeanstalkWebTier
AWSElasticBeanstalkWorkerTier
AWSElasticBeanstalkMulticontainerDocker
```

역할 이름은 편하신대로 지어주고 역할을 생성해주세요. 저는 EC2profile 이라고 짓겠습니다.

한번 더 `역할 만들기` 를 눌러주시고 이번에는 사용 사례에서 다른 AWS 서비스의 사용 사례를 눌러 `Elastic Beanstalk`을 찾아 `Elastic Beanstalk - Customizable`를 선택해주세요.

그 다음, `권한 경계 설정 - 선택사항` 을 눌러 `권한 경계를 사용하여 최대 역할 권한 제어` 를 선택해주세요.

`AdministratorAccess-AWSElasticBeanstalk` 해당 정책을 찾아서 추가해주세요.

역할 이름을 설정하고 역할을 만들어주세요. 저는 ElasticBeanstalk 이라고 지었습니다.

## EC2 KeyPair 생성

<a href="https://us-east-1.console.aws.amazon.com/ec2/home?region=us-east-1#KeyPairs:" target="_blank"> EC2 KeyPair </a> 로 들어가서 키 페어 생성 버튼을 눌러주세요.

키페어 이름을 입력하고 파일 형식을 `.pem` 으로 설정하고 키 페어 생성을 해주세요.

1. <a href="https://us-east-1.console.aws.amazon.com/elasticbeanstalk/" target="_blank">Elastic beanstalk</a> 페이지로 들어가서 로그인 후 애플리케이션 생성을 눌러주세요.

2. 환경 티어는 웹 서버 환경을 체크해주세요.

3. 애플리케이션 이름을 적어주세요.

4. 환경 이름을 적어주고 잘 기억해두세요. github 환경변수에 넣어야합니다.

5. 플랫폼을 `Node.js` 를 선택해주세요.

6. 플랫폼 브랜치는 원하는 것을 선택해주세요. 저같은 경우에는 로컬 nodejs 버전이 16이기 때문에 16을 선택해주겠습니다.

7. 애플리케이션 코드는 샘플 애플리케이션 코드로 해주세요.

8. 사전 설정에서는 고가용성을 선택하면 로드밸런서를 자동으로 만들어주니 원하시는분은 선택해주시고 아니라면 단일 인스턴스로 진행해주세요.

9. 다음을 눌러 서비스 액세스 구성 창으로 이동해주세요.

10. 기존 서비스 역할을 눌러 만들어둔 `ElasticBeanstalk` 을 선택해줍니다.

11. 만들어둔 EC2 키 페어를 선택해주세요. 만약 없다면 Region이 다른것입니다. 같은 Region에서 EC2 키페어를 생성하거나 Elastic beanstalk Region을 바꾸어주세요.

12. EC2 인스턴스 프로파일에서는 만들어둔 `EC2profile` 을 선택해주세요

13. `네트워킹, 데이터베이스 및 태그 설정`, `인스턴스 트래픽 및 크기 조정 구성`, `업데이트, 모니터링 및 로깅 구성` 은 잘 설정해주세요. 처음이라면 건들지 않아도 됩니다.

14. 3,4,5 단계가 끝났으면 제출을 해주세요.

이제 EB 설정은 다 되었습니다.

깃허브로 넘어가서 github actions를 실행해보겠습니다.

우선 .yml 파일을 하나 만들고 다음 내용을 문구들을 넣어주세요.

```yml
name: Deploy to EB

on:
  push:
    branches:
      - dev-client-ba
      - live-client-ba
    paths:
      - client-backapi/**

jobs:
  buildAndDeploy:
    runs-on: ubuntu-latest

    defaults:
      run:
        shell: bash
        working-directory: client-backapi

    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Create env file
        run: |
          touch .env
          echo PORT=5000 >> .env
          echo "MONGODB_URI=${{ secrets.MONGODB_URI }}" >> .env
          echo "JWT_SECRET_KEY=${{ secrets.JWT_SECRET_KEY }}" >> .env
          cat .env

      - name: Install Node.js
        uses: actions/setup-node@v2
        with:
          node-version: 16

      - name: Install dependencies
        run: yarn install

      - name: Run build
        run: yarn build

      - name: Generate deployment package
        run: zip -r deploy.zip package.json ./dist

      - name: Deploy to EB
        uses: einaregilsson/beanstalk-deploy@v20
        with:
          aws_access_key: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws_secret_key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          application_name: Name
          environment_name: Name-env
          region: ${{ secrets.AWS_DEFAULT_REGION }}
          version_label: ${{ github.run_number }}
          use_existing_version_if_available: true
          deployment_package: deploy.zip
          wait_for_environment_recovery: 120
```

마지막으로, 잘 배포가 되는지 확인해주세요.
