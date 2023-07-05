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
