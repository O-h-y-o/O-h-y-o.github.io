# Vuepress Theme 로 블로그 만들기

Let's create a development blog with the Vuepress Hope theme.

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

- In [dir], you must put the name of the actual folder you want to create.

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

- You have to make about 10 choices.

<br/>
<br/>

When the project is created, go to the GitHub homepage and create a github public repo with the name `username.github.io`.

::: info

Create a repo, go to Settings tab => Actions => General, change the Workflow permissions option to `Read and write permissions` and click Save.

:::

I'll open a terminal in the project created with vuepress and connect to the git repository.

```sh
$ git init
$ git remote add origin [url]
$ git branch -m master main
$ git add .
$ git commit -m "message"
$ git push
```

If you get a branch error in git push, please enter the following command.

```sh
$ git push --set-upstream origin main
```

vuepress hope provides a github actions template by default.

```
- name: Install pnpm
  uses: pnpm/action-setup@v2
  with:
    run_install: true
```

There is something called `Install pnpm` in the middle, and you need to put the version as follows.

```
- name: Install pnpm
  uses: pnpm/action-setup@v2
  with:
    version: 8
    run_install: true
```
