import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,f as e}from"./app-c6258a4f.js";const t={},p=e(`<h1 id="elastic-beanstalk-github-actions-로-nodejs-배포하기" tabindex="-1"><a class="header-anchor" href="#elastic-beanstalk-github-actions-로-nodejs-배포하기" aria-hidden="true">#</a> Elastic Beanstalk + Github actions 로 nodejs 배포하기</h1><h2 id="iam-권한-설정-역할-만들기" tabindex="-1"><a class="header-anchor" href="#iam-권한-설정-역할-만들기" aria-hidden="true">#</a> IAM 권한 설정 &amp; 역할 만들기</h2><p>우선 IAM 권한 설정을 하겠습니다.</p><p><a href="http://us-east-1.console.aws.amazon.com/iamv2/home" target="_blank"> IAM </a></p><p>IAM에 들어가서 사용자가 없다면 사용자 생성을 해주고 사용자가 있다면 바로 권한 추가를 하여 <code>AdministratorAccess-AWSElasticBeanstalk</code> 를 추가해주세요.</p><p>그리고 <code>역할 탭</code>을 눌러서 <code>역할 만들기</code>를 눌러주세요.</p><p>엔티티 유형은 AWS서비스, 사용사례는 EC2를 선택하고 다음을 눌러주세요.</p><p>다음 3가지에 대한 정책을 추가해주세요.</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>AWSElasticBeanstalkWebTier
AWSElasticBeanstalkWorkerTier
AWSElasticBeanstalkMulticontainerDocker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>역할 이름은 편하신대로 지어주고 역할을 생성해주세요. 저는 EC2profile 이라고 짓겠습니다.</p><p>한번 더 <code>역할 만들기</code> 를 눌러주시고 이번에는 사용 사례에서 다른 AWS 서비스의 사용 사례를 눌러 <code>Elastic Beanstalk</code>을 찾아 <code>Elastic Beanstalk - Customizable</code>를 선택해주세요.</p><p>그 다음, <code>권한 경계 설정 - 선택사항</code> 을 눌러 <code>권한 경계를 사용하여 최대 역할 권한 제어</code> 를 선택해주세요.</p><p><code>AdministratorAccess-AWSElasticBeanstalk</code> 해당 정책을 찾아서 추가해주세요.</p><p>역할 이름을 설정하고 역할을 만들어주세요. 저는 ElasticBeanstalk 이라고 지었습니다.</p><h2 id="ec2-keypair-생성" tabindex="-1"><a class="header-anchor" href="#ec2-keypair-생성" aria-hidden="true">#</a> EC2 KeyPair 생성</h2><p><a href="https://us-east-1.console.aws.amazon.com/ec2/home?region=us-east-1#KeyPairs:" target="_blank"> EC2 KeyPair </a> 로 들어가서 키 페어 생성 버튼을 눌러주세요.</p><p>키페어 이름을 입력하고 파일 형식을 <code>.pem</code> 으로 설정하고 키 페어 생성을 해주세요.</p><ol><li><p><a href="https://us-east-1.console.aws.amazon.com/elasticbeanstalk/" target="_blank">Elastic beanstalk</a> 페이지로 들어가서 로그인 후 애플리케이션 생성을 눌러주세요.</p></li><li><p>환경 티어는 웹 서버 환경을 체크해주세요.</p></li><li><p>애플리케이션 이름을 적어주세요.</p></li><li><p>환경 이름을 적어주고 잘 기억해두세요. github 환경변수에 넣어야합니다.</p></li><li><p>플랫폼을 <code>Node.js</code> 를 선택해주세요.</p></li><li><p>플랫폼 브랜치는 원하는 것을 선택해주세요. 저같은 경우에는 로컬 nodejs 버전이 16이기 때문에 16을 선택해주겠습니다.</p></li><li><p>애플리케이션 코드는 샘플 애플리케이션 코드로 해주세요.</p></li><li><p>사전 설정에서는 고가용성을 선택하면 로드밸런서를 자동으로 만들어주니 원하시는분은 선택해주시고 아니라면 단일 인스턴스로 진행해주세요.</p></li><li><p>다음을 눌러 서비스 액세스 구성 창으로 이동해주세요.</p></li><li><p>기존 서비스 역할을 눌러 만들어둔 <code>ElasticBeanstalk</code> 을 선택해줍니다.</p></li><li><p>만들어둔 EC2 키 페어를 선택해주세요. 만약 없다면 Region이 다른것입니다. 같은 Region에서 EC2 키페어를 생성하거나 Elastic beanstalk Region을 바꾸어주세요.</p></li><li><p>EC2 인스턴스 프로파일에서는 만들어둔 <code>EC2profile</code> 을 선택해주세요</p></li><li><p><code>네트워킹, 데이터베이스 및 태그 설정</code>, <code>인스턴스 트래픽 및 크기 조정 구성</code>, <code>업데이트, 모니터링 및 로깅 구성</code> 은 잘 설정해주세요. 처음이라면 건들지 않아도 됩니다.</p></li><li><p>3,4,5 단계가 끝났으면 제출을 해주세요.</p></li></ol><p>이제 EB 설정은 다 되었습니다.</p><p>깃허브로 넘어가서 github actions를 실행해보겠습니다.</p><p>우선 .yml 파일을 하나 만들고 다음 내용을 문구들을 넣어주세요.</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">name</span><span class="token punctuation">:</span> Deploy to EB

<span class="token key atrule">on</span><span class="token punctuation">:</span>
  <span class="token key atrule">push</span><span class="token punctuation">:</span>
    <span class="token key atrule">branches</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> dev<span class="token punctuation">-</span>client<span class="token punctuation">-</span>ba
      <span class="token punctuation">-</span> live<span class="token punctuation">-</span>client<span class="token punctuation">-</span>ba
    <span class="token key atrule">paths</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> client<span class="token punctuation">-</span>backapi/<span class="token important">**</span>

<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">buildAndDeploy</span><span class="token punctuation">:</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest

    <span class="token key atrule">defaults</span><span class="token punctuation">:</span>
      <span class="token key atrule">run</span><span class="token punctuation">:</span>
        <span class="token key atrule">shell</span><span class="token punctuation">:</span> bash
        <span class="token key atrule">working-directory</span><span class="token punctuation">:</span> client<span class="token punctuation">-</span>backapi

    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Checkout
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v2

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Create env file
        <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
          touch .env
          echo PORT=5000 &gt;&gt; .env
          echo &quot;MONGODB_URI=\${{ secrets.MONGODB_URI }}&quot; &gt;&gt; .env
          echo &quot;JWT_SECRET_KEY=\${{ secrets.JWT_SECRET_KEY }}&quot; &gt;&gt; .env
          cat .env</span>

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Install Node.js
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/setup<span class="token punctuation">-</span>node@v2
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">node-version</span><span class="token punctuation">:</span> <span class="token number">16</span>

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Install dependencies
        <span class="token key atrule">run</span><span class="token punctuation">:</span> yarn install

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Run build
        <span class="token key atrule">run</span><span class="token punctuation">:</span> yarn build

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Generate deployment package
        <span class="token key atrule">run</span><span class="token punctuation">:</span> zip <span class="token punctuation">-</span>r deploy.zip package.json ./dist

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Deploy to EB
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> einaregilsson/beanstalk<span class="token punctuation">-</span>deploy@v20
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">aws_access_key</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.AWS_ACCESS_KEY_ID <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token key atrule">aws_secret_key</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.AWS_SECRET_ACCESS_KEY <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token key atrule">application_name</span><span class="token punctuation">:</span> Name
          <span class="token key atrule">environment_name</span><span class="token punctuation">:</span> Name<span class="token punctuation">-</span>env
          <span class="token key atrule">region</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.AWS_DEFAULT_REGION <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token key atrule">version_label</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> github.run_number <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token key atrule">use_existing_version_if_available</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
          <span class="token key atrule">deployment_package</span><span class="token punctuation">:</span> deploy.zip
          <span class="token key atrule">wait_for_environment_recovery</span><span class="token punctuation">:</span> <span class="token number">120</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>마지막으로, 잘 배포가 되는지 확인해주세요.</p>`,23),l=[p];function i(c,o){return s(),a("div",null,l)}const r=n(t,[["render",i],["__file","deploy-elastic-beanstalk.html.vue"]]);export{r as default};
