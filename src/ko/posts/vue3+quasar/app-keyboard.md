# Capacitor 웹뷰 키보드 제어

모바일 웹에서는 input focus 상태일때 키보드가 나타나게 됩니다.

android의 경우 키보드가 나타날때 자동으로 viewport가 조절이 되지만,

ios의 경우 키보드의 높이 만큼 viewport가 그대로 display 위로 올라가버리게 됩니다.

이에 따라 fixed top을 한 상단 네비게이션 바가 보이지 않게된다거나, footer영역이 위로 올라오게 되어버립니다.

이때 @capacitor/keyboard 플러그인을 이용하여 제어해줄 수 있습니다.

@capacitor/keyboard 플러그인을 설치 후 `npx cap sync` 를 해줍니다.

그리고 다음 코드를 넣으면 더 이상 viewport가 올라가지 않게됩니다.

```vue
<script setup lang="ts">
import { Keyboard, KeyboardResize } from "@capacitor/keyboard";

Keyboard.setResizeMode({ mode: KeyboardResize.None });
</script>
```

viewport 처리는 요소마다 다르게 처리해주어야 합니다.

keyboard가 올라올때 height를 keyboard가 올라온 만큼 줄여주거나 원하는 영역만 다시 위로 올리는 방법이 있습니다.

```ts
Keyboard.addListener('keyboardWillShow', (info: KeyboardInfo) => {
    console.log(info.keyboardHeight)
}
```

키보드가 보여질때 키보드의 크기를 가져오는 방법입니다. 이것으로 영역 제어를 해주어 자연스러운 동작을 만들어 줄 수 있습니다.

채팅의 경우 input이 하단에 있어 키보드가 올라오면 input 영역이 가려지게 됩니다. 채팅 input 영역을 우선 키보드 영역만큼 위로 올려주어야합니다.

그리고 보내기 버튼을 누르면, input의 focus가 해제되고 키보드가 내려가게됩니다. 계속 유지되어야 좋을텐데요.

계속 유지시켜주기 위해서는 다음 코드처럼 입력해주세요.

```ts
const sendBtn = document.querySelector(".send-btn") as HTMLElement;

sendBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
});

sendBtn.addEventListener("touchend", (e) => {
  sendChatting(e);
});
```

이렇게 되면 더 이상 focus가 풀리지 않고 키보드도 내려가지 않습니다.

하지만 e.preventDefault() 때문에 한글 입력이 끝나지 않은채로 그대로 남아 있을 수 있습니다.

그럴때엔 다음의 코드를 추가해주세요.

```ts
const sendBtn = document.querySelector(".send-btn") as HTMLElement;

sendBtn.addEventListener("touchstart", (e) => {
  const chattingInput = document.querySelector(
    ".chatting-input"
  ) as HTMLInputElement;

  const emptyInput = document.getElementById("empty-input") as HTMLInputElement;

  emptyInput.focus();

  chattingInput.focus();

  e.preventDefault();
});

sendBtn.addEventListener("touchend", (e) => {
  sendChatting(e);
});
```

화면에 보이지 않는 input을 하나 만들어주고, z-index 는 -1로 해주세요. focus가 가능한 상태여야 합니다.

input의 포커스를 변경하여 입력상태를 멈추어 초기화 시켜주었습니다.

<br/> <br/>

## input 다음 input 을 클릭할때 (심화)

input이 focus된 상태에서 다른 input을 누르면 키보드가 내려갔다가 다시 올라오는 현상이 있는데 이를 방지하기 위한 코드입니다.

```ts
// project/functions.ts
export const controlKeyboard = (
  containerId: string,
  isOpen: boolean,
  e: Event
) => {
  if (
    useCommonStore().isKeyboardUp &&
    document.activeElement instanceof HTMLInputElement &&
    useCommonStore().previousTargetInstance ===
      useCommonStore().currentTargetInstance
  ) {
    return;
  }

  const footerHeight = document.querySelector(".q-footer") ? 90 : 0;

  const height =
    useCommonStore().keyboardHeight - useCommonStore().sab - footerHeight;

  const targetY = (e.target as HTMLElement).getBoundingClientRect().y;

  if (
    window.innerHeight < targetY + useCommonStore().keyboardHeight + 100 ||
    useCommonStore().isKeyboardUp
  ) {
    controlKeyboardMain(containerId, isOpen, height);
  }
};
```

```ts
// core/functions.ts
export const controlKeyboardMain = (
  containerId: string,
  isOpen: boolean,
  height: number
) => {
  const container = document.getElementById(containerId) as HTMLElement;

  if (!container) {
    return;
  }

  if (isOpen) {
    container.style.transition = "0.3s ease-out";
    container.style.transform = `translateY(-${height}px)`;
  } else {
    container.style.transform = "translateY(0)";
    setTimeout(() => {
      container.style.transition = "";
    }, 300);
  }
};
```

올리고 싶은 영역 전체를 감싼 element에 id값을 설정하고, containerId로 넘겨주세요.

이때 fixed나 sticky 영역을 조심히 케어해주어야합니다. 아예 fixed나 sticky가 있는 영역은 포함시키지 않는 것이 더 좋습니다.

키보드가 올라오는 속도는 기기마다 모두 다릅니다. 적당한 transition을 부여해주세요.
