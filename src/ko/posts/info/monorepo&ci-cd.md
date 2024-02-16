# 모노레포 & Github CI/CD

멀티레포에서는 project repo가 각각 있기때문에 관리와 유지보수에 대한 비용이 늘어나게 됩니다.

모노레포에서는 하나의 레포에 프로젝트들이 있기때문에 통합적인 관리가 가능합니다.

멀티레포는 브랜치가 꼬이거나 하는 일이 적지만, 모노레포에서는 브랜치끼리 꼬이거나 ci/cd의 과정에서 몇 가지 문제가 발생할 수가 있습니다. (조심하지않으면..)

Root
╚ project1
╚ project2
╚ project3

## 자동 Github CI/CD

## 수동 Github CI/CD

### Window

다음 사이트에서 github cli를 설치해주세요.

<a href="https://cli.github.com" target="_blank">https://cli.github.com</a>

그 후 프로젝트 루트에서 `inquirer` 라이브러리를 설치해주세요.
타입스크립트의 경우 `@types/inquirer`를 같이 설치해주세요.

```shell
$ yarn -W add -D inquirer @types/inquirer
```
