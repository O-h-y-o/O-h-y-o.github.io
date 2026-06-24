# 구글 검색에 노출시키기

<a href="https://analytics.google.com/analytics/web/?authuser=0#/provision/SignUp/" target="_blank">구글 애널리틱스</a> 계정을 만들어 줍니다.

저는 비즈니스 세부정보에서 업종은 `온라인 커뮤니티`, 비즈니스 목표는 `리드 생성`, `사용자 행동 검토` 로 하였습니다. 다른걸로 해도 됩니다.

배포 프로젝트 루트 혹은 theme를 사용한다면 src/public 폴더에 `_config.yml` 파일을 만들어주고 밑의 코드를 입력해줍니다.

```yml
# _config.yml
google_analytics: { 추적ID }
url: { 배포URL } # https://username.github.io/
```

<a href="https://search.google.com/search-console/about?hl=ko&utm_source=wmx&utm_medium=wmx-welcome" target="_blank">구글 서치 콘솔</a>에서 시작하기를 눌러줍니다.

`URL 접두어`를 선택해주고 `https://username.github.io/` 를 입력해줍니다.

권장 확인 방법 혹은 4가지의 다른 확인 방법을 선택하여 소유권을 확인시켜줍니다.

저는 권장 확인 방법으로 하겠습니다. html 파일을 다운로드해서 루트에 넣어줍니다.

그리고 루트 폴더 혹은 theme를 사용한다면 src/public 폴더에에 `sitemap.yml` 파일을 만들어주고 밑의 코드를 그대로 넣어줍니다.

```yml
---
---
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    {% for post in site.posts %}
    <url>
        <loc>{{ site.url }}{{ post.url | remove: 'index.html' }}</loc>
    </url>
    {% endfor %}

    {% for page in site.pages %}
    {% if page.layout != nil %}
    {% if page.layout != 'feed' %}
    <url>
        <loc>{{ site.url }}{{ page.url | remove: 'index.html' }}</loc>
    </url>
    {% endif %}
    {% endif %}
    {% endfor %}
</urlset>
```

::: tip

vuepress를 사용한다면 <a href="https://plugin-sitemap2.vuejs.press/" target="_blank">vuepress-plugin-sitemap2</a> 를 이용하여 sitemap 자동 생성, 관리를 할 수 있습니다.

:::

이후 google search console => 색인생성 => `Sitemaps` 에서 `https://username.github.io/sitemap.xml` 로 하고 제출해줍니다. 이후 구글 검색에서 자신의 블로그가 잘 노출되는지 확인해봅니다. 노출되기 전까지 시간이 좀 걸릴 수도 있습니다.
