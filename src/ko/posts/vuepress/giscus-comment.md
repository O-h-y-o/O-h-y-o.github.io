# Giscus 블로그 댓글 기능 사용하기

1. 댓글을 관리할 github repository 를 하나 만들어줍니다.

저는 `GiscusComment` 라는 이름으로 만들었습니다.

2. 만든 Repo 에 들어가서 General => Features => `Discussions` 를 활성화 해줍니다.

3. 그러면 Discussions 탭이 추가가 됩니다. 들어가서 왼쪽 Categories 에서 `연필 모양`을 눌러주고 `New category` 를 눌러줍니다.

4. Category name: Comment, Discussion Format: Announcement 로 설정해주고 생성해줍니다.

5. <a href="https://github.com/apps/giscus" target="_blank">Giscus</a>앱 추가 를 해주겠습니다. GiscusComment 레포지토리만 선택해서 추가해주겠습니다.

6. <a href="https://giscus.app/ko" target="_blank">Giscus 설정 페이지</a>에 들어가줍니다.

7. 저장소에 username/comment-repo 를 입력해주고, Discussion 카테고리는 Comment로 바꾸어줍니다.

8. 저는 다른 것은 바꾸지 않았지만 원한다면 바꾸셔도 됩니다.

9. script 부분을 복사하여 웹 사이트 템플릿에 붙여넣어 줍니다.

10. 저처럼 `vuepress home theme` 를 이용하시는분은 다음과 같이 해주시면 됩니다.

```ts
// theme.ts
export default hopeTheme({
  plugins: {
    comment: {
      provider: "Giscus",
      repo: "data-repo",
      repoId: "data-repo-id",
      category: "data-category",
      categoryId: "data-category-id",
      comment: true,
      mapping: "pathname",
      strict: false,
    },
  },
});
```

댓글창이 잘 나오는지 확인하면 됩니다.
