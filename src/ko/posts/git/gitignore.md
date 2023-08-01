# .gitignore 로 staging 제외 시키기

환경변수 파일, 보안에 민감한 파일 등 올리는 것을 원하지 않을때 .gitignore를 사용합니다.

프로젝트 최상단에 .gitignore 를 만들어주세요.

만약 내가 제외시키고 싶은 파일이
path/file.exe 라면,

```bash
# .gitignore
$ path/file.exe
```

만약 path/path2/folder 가 있을때, 폴더의 하위 모든 것들을 제외시키고 싶다면

```bash
# .gitignore
$ path/path2/folder/
```

이후 .gitignore 파일을 저장하고 커밋하면 Git이 해당 디렉토리와 하위 디렉토리를 추적하지 않고 무시합니다.

::: tip

참고: .gitignore 파일에 패턴을 추가할 때 주의해야 할 점은 이미 버전 관리 중인 파일이 있는 경우 .gitignore 파일을 추가해도 해당 파일은 이미 추적이 되었으므로 .gitignore가 적용되지 않을 수 있습니다. 이런 경우에는 먼저 해당 파일들을 버전 관리에서 제거하고 커밋해야 합니다. 제거하는 방법은 다음과 같습니다.

```bash
$ git rm -r --cached path/path2/folder
```

`git rm -r --cached` 명령어는 Git으로부터 파일 또는 디렉토리를 삭제하지만 실제 파일 시스템에서는 삭제하지 않고, Git의 버전 관리에서만 해당 파일 또는 디렉토리를 제거하는 역할을 합니다. 이를 "unstage"라고도 합니다.

기본적으로 git add 명령어로 파일을 스테이징 영역에 추가하면, Git은 해당 파일을 추적하고 커밋에 포함시킵니다. 하지만 `git rm --cached`를 사용하면 스테이징 영역에서 해당 파일을 제거하여 이후 커밋에서 해당 파일을 더 이상 추적하지 않게 됩니다.

예를 들어, .gitignore 파일을 생성하고 이미 추적 중인 path/path2/folder 디렉토리와 하위 디렉토리를 Git에서 무시하려고 할 때, `git rm -r --cached path/path2/folder` 명령어를 사용합니다.

이후 커밋을 해주겠습니다.

```bash
$ git commit -m "Remove path/path2/folder from tracking"
```

변경 사항을 커밋으로 기록하기 위해: `git rm -r --cached` 명령어를 실행하면 스테이징 영역에서 파일 또는 디렉토리가 제거되었지만, 아직 커밋으로는 기록되지 않았습니다. 커밋을 실행하면 스테이징 영역의 변경 사항이 Git의 버전 기록에 포함되어 영구적으로 기록됩니다. 이로 인해 .gitignore 파일에 추가한 변경 사항도 함께 커밋으로 남게 됩니다.

따라서 `git rm -r --cached path/path2/folder` 명령어로 스테이징 영역에서 디렉토리를 제거한 후, `git commit -m "Remove path/path2/folder from tracking"` 명령어로 해당 변경 사항을 커밋함으로써 Git이 `path/path2/folder` 디렉토리를 추적하지 않도록 하고, .gitignore 파일에 해당 디렉토리를 추가한 변경 사항을 영구적으로 저장하는 것입니다.

:::
