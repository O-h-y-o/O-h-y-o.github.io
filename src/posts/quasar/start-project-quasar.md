---
icon: pen-to-square
date: 2023-06-23
category:
tag:
  - red
  - big
  - round
---

# Start project with Quasar

`Quasar strongly recommends using yarn as the package manager.`

`pnpm is not officially supported.`

## Installing Quasar Globally

```sh
$ yarn global add @quasar/cli
# or:
$ npm i -g @quasar/cli
# or:
$ pnpm add -g @quasar/cli # experimental support
```

## Creating a project with Quasar

```sh
$ yarn create quasar
# or:
$ npm init quasar
# or:
$ pnpm create quasar # experimental support
```

Choose according to the guidelines. <br />
`Make it vite. You can have a faster developer experience than webpack.`

## Add the following statement to your package.json file

```json
// package.json
"scripts": {
  "dev": "quasar dev", # Open development server
  "build": "quasar build", # Build
}
```

## Make sure the server is running well

```sh
$ yarn quasar dev
$ yarn quasar inspect
$ pnpm run dev
# ..etc
```
