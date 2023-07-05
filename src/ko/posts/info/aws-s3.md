# AWS S3 배포하기 (Vue3 + Quasar + pnpm)

확장성이 뛰어나고 경제적인 클라우드 스토리지 서비스인 AWS(Amazon Web Services) Simple Storage Service(S3) 로 배포를 진행하겠습니다.

프로젝트를 AWS S3에 구축하면 AWS 클라우드의 확장성, 안정성 및 비용 효율성을 활용할 수 있습니다.

또한 AWS S3는 정적 웹 사이트를 쉽게 제공하여 배포 프로세스를 단순화하고 인프라의 복잡성을 줄일 수 있습니다.

AWS 계정이 없다면 만들어주세요.
github actions를 이용할 것이니 github repository에 프로젝트를 올려주세요.

1. <a href="https://ap-northeast-2.console.aws.amazon.com/console/home">AWS</a> 계정에 로그인 해주세요.

2. S3 대시보드로 이동하고 버킷 만들기 버튼을 눌러주세요.

3. 버킷 이름을 작성해주시교 `AWS 리전` 은 `아시아 태평양(서울) ap-northeast-2` 로 해주세요.

4. 객체소유권은 `ACL 활성화`를 눌러주세요.

5. 모든 퍼블릭 액세스 차단을 풀어준 뒤 버킷만들기 버튼을 눌러주세요.

6. 만든 버킷을 눌러 들어간 뒤 속성 탭을 클릭해주세요.

7. 속성 탭의 최하단 `정적 웹 사이트 호스팅` 의 편집 버튼을 눌러 `활성화` 해주세요.

8. 인덱스 문서는 `index.html`, 오류 문서는 에러페이지를 구현하였다면 해당하는 페이지를 넣어주거나, index.html 혹은 아무것도 입력하지 않아도 됩니다. 변경사항을 저장해줍니다.

9. 권한 탭으로 들어가 `버킷 정책` 편집 버튼을 눌러 하단의 텍스트를 붙여넣어주세요.

```json
// 공개 액세스를 허용하는 버킷 정책
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::nextbit/*"
    }
  ]
}
```

프로젝트 빌드 폴더를 수동적으로 올릴 수 있지만 github actions을 이용해 자동 배포를 해보겠습니다.

먼저 `AWS_ACCESS_KEY_ID` 와 `AWS_SECRET_ACCESS_KEY` 를 <a href="http://us-east-1.console.aws.amazon.com/iamv2/home" target="_blank">IAM</a>에서 발급 받겠습니다.

1. IAM 에서 액세스 관리 => 사용자 => 사용자 추가 버튼을 눌러줍니다.

2. 사용자 이름을 입력하고 다음을 눌러줍니다.

3. 권한 옵션을 직접 정책 연결로 바꾸고 `AmazonS3FullAccess` 를 검색한 뒤 체크해주고 다음을 눌러주고 사용자 생성 버튼을 눌러줍니다.

4. 만들어진 사용자를 클릭하여 들어가 `보안 자격 증명` 탭에서 `액세스 키 만들기` 를 눌러줍니다.

5. 사용 사례는 `로컬 코드` 로 선택하고 다음을 눌러 `액세스 키 만들기` 를 눌러줍니다.

6. `.csv 파일 다운로드`를 하고 액세스 키, `비밀 액세스 키(시크릿 키)`를 잘 저장해둡니다.

7. Github repository 에서 `Settings` 탭을 눌러줍니다.

8. Security => Secrets and variables => Actions 를 눌러 New repository secret 을 눌러줍니다.

9. Name: `AWS_ACCESS_KEY_ID` , Secret: 발급한 `액세스 키` 를 입력하고 생성해줍니다.

10. Name: `AWS_SECRET_ACCESS_KEY` , Secret: 발급한 `비밀 액세스 키(시크릿 키)`를 입력하고 생성해줍니다.

11. github repository 에서 `Actions` 탭을 눌러줍니다.

12. `New workflow` 버튼을 눌러줍니다.

13. `set up a workflow yourself` 를 눌러줍니다.

14. yml 파일명을 자유롭게 지어줍니다.

15. 밑의 코드를 넣어줍니다.

```yml
name: Vue Build and Deploy to S3

on:
  push:
    branches: main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Install Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 16

      - uses: pnpm/action-setup@v2
        name: Install pnpm
        id: pnpm-install
        with:
          version: 8
          run_install: false

      - name: Install dependencies
        run: pnpm add @quasar/cli -g && pnpm install

      - name: Build
        run: pnpm run build:pwa

      - uses: jakejarvis/s3-sync-action@master
        with:
          args: --acl public-read --follow-symlinks --delete
        env:
          AWS_S3_BUCKET: <Bucket_Name>
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          AWS_REGION: ap-northeast-2
          SOURCE_DIR: "dist/pwa"
```

`<Bucket_Name>` 에는 S3버킷의 이름을 넣어줍니다.

해당 포스팅의 과정을 잘 따라왔다면 AWS S3 에 자동적으로 잘 배포가 될 것입니다.
