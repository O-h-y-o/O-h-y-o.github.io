# Cloudfront로 HTTPS 사용하기

## 먼저 AWS Certificate Manager(ACM) 에서 SSL 인증서를 발급받겠습니다.

1. <a href="https://ap-northeast-2.console.aws.amazon.com/acm/home?region=ap-northeast-2#/welcome" target="_blank" > AWS Certificate Manager(ACM)</a> 에 들어갑니다.
2. 인증서 요청을 누르고 퍼블릭 인증서 요청을 선택합니다.
3. 도메인 이름(구매한 도메인)을 입력하고 맨 밑에 요청 버튼을 눌러줍니다.

## 이제 CloudFront 설정을 해주겠습니다.

1. <a href="https://us-east-1.console.aws.amazon.com/cloudfront/v3/home?region=ap-northeast-2#/welcome" target="_blank">CloudFront</a> 에서 CloutFront 배포 생성 버튼을 눌러줍니다.
2. 원본 도메인 선택을 해주고 웹 사이트 엔드포인트 사용을 눌러줍니다.
3. 프로토콜은 HTTP만 해당 을 선택하고, 이름 에는 `{{domain}}.s3-website.ap-northeast-2.amazonaws.com` 을 입력해줍니다. EC2서버나 S3는 HTTPS를 위한 작업이 필요하지 않습니다.
4. 기본 캐시 동작에서 뷰어 프로토콜 정책 => `Redirect HTTP to HTTPS` 를 선택해줍니다.
5. 웹 애플리케이션 방화벽을 선택해줍니다. 저같은 경우에는 활성화 를 선택하고, Use Monitor mode 도 선택해주었습니다.
6. 설정 에서 가격 분류는 원하는 것을 선택해줍니다. 저같은 경우에는 `북미, 유럽, 아시아, 중동 및 아프리카에서 사용` 을 선택하였습니다.
7. 대체 도메인 이름(CNAME) 항목 추가를 누르고 {domain.com} 도메인을 입력해줍니다.
8. `사용자 정의 SSL 인증서` 는 ACM에서 발급받은 인증서를 선택해줍니다.

CloudFront 설정은 끝났습니다.

이제 다시 Route53 으로 가서 CloudFront 를 대상으로 한 라우팅 레코드를 하나 더 추가해주겠습니다.

1. S3 => Route53 으로 http://domain.com 을 접속하게했던 레코드를 삭제해줍니다.
2. Route53에서 레코트 생성을 눌러줍니다.
3. 별칭 스위치를 on 해주고 트래픽 라우트 대상을 이번에는 `CloudFront 배포에 대한 별칭` 을 선택하겠습니다.
4. 배포 선택을 눌러 cloudfront 도메인 이름을 선택해주고 레코드를 생성해줍니다.

::: tip

S3 => Route53 은 http 사용이고,
S3 => Cloudfront => Route53 은 https 사용입니다.

:::

이제 https://domain.com 이 잘 들어가지는것을 확인해보면 됩니다.
