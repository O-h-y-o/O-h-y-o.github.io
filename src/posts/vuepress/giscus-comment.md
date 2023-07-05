# Using the Giscus blog comment feature

1. Create a github repository to manage comments.

I made it with the name `GiscusComment`.

2. Enter the created repo and enable General => Features => `Discussions`.

3. Then, the Discussions tab is added. Go in and click the 'pencil' in the Categories on the left and click 'New category'.

4. Set Category name: Comment, Discussion Format: Announcement and create it.

5. I will add <a href="https://github.com/apps/giscus" target="_blank">Giscus</a> app. I will select and add only the GiscusComment repository.

6. Enter <a href="https://giscus.app/en" target="_blank">Giscus setting page</a>.

7. Enter username/comment-repo in the repository and change the Discussion category to Comment.

8. I haven't changed anything else, but you can change it if you like.

9. Copy the script part and paste it into the website template.

10. If you are using `vuepress home theme` like me, please do the following.

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

Just make sure the comment window pops up.
