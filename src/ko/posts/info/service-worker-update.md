# 서비스워커 업데이트

서비스워커를 이용하는 웹페이지에서, 서비스를 업데이트 하였을때 새로고침을 하더라도 바로 업데이트 사항을 반영받지 못할 수 있습니다.

퀘이사 홈페이지나 흔히 사용하는 노션같은 곳에서 업데이트 된 내용이 있으니 새로고침을 하라는 문구를 흔히 볼 수 있습니다.

해당 기능을 구현하려면 여러가지 방법이 있습니다. 그 중 하나의 방법을 적겠습니다.

1. 현재 버전을 저장할 데이터베이스를 만들어줍니다.
   버전을 수정하는 API를 만들어 버전관리를 할 수 있으면 더 편리합니다. 수동으로 데이터를 수정하여도 됩니다.

2. 버전을 체크하는 API를 만듭니다. (소켓으로도 가능합니다.)

3. 클라이언트에서 setInterval으로 서버에 버전 체크 API를 호출합니다.
   Web Storage에 버전 정보를 저장해두고, 계속하여 서버에서 주는 값과 비교를 해줍니다.
   최초에는 단순 저장만 하며, 이후에 버전이 일치하지 않다면 사용자에게 새로고침을 권유합니다.

저 같은 경우에는 다음의 코드처럼 사용자에게 알려줍니다.

```vue
<script setup lang="ts">
// 업데이트 사항과 현재 작업중인게 있다면 초기화 될 수 있다는 메시지를 보여줍니다.
// 지금 적용하는 것을 원치않으면 잠시 후 다시 알림을 노출시키는 버튼을 만들어줍니다.
$q.dialog({
  progress: { spinner: QSpinnerRadio },
  message: `<div class="fs-16 lh-24 fw-600">
            ${i18n.global.t("word.new_version")}
            </div>`,
  position: "top",
  ok: {
    push: true,
    label: i18n.global.t("word.download"),
  },
  cancel: {
    push: true,
    color: "white",
    textColor: "black",
    label: i18n.global.t("word.download_later"),
  },
  persistent: true,
  color: "primary",
  class: "bg-white",
  html: true,
});
</script>
```

4. 사용자가 지금 적용하겠다는 버튼을 누를시 새로운 버전을 Web Storage에 저장하고 서비스워커를 업데이트하고, 캐시를 초기화하며 마지막으로 새로고침을 해주겠습니다.

```vue
<script setup lang="ts">
LocalStorage.set("version", version);

await navigator.serviceWorker.ready.then(async (registration) => {
  await registration.update().then(() => {
    caches.keys().then((names) => {
      for (let name of names) {
        caches.delete(name);
      }
    });
  });
});

setTimeout(() => {
  window.location.reload();
}, 500);
</script>
```

전체 코드입니다.

isAsk는 현재 사용자에게 업데이트 사항이 있다는 것을 알린 것이 있을때 다음 Interval로 한번 더 check하는 것을 방지하기 위함입니다.
setInterval 자체를 멈추어도 됩니다.

```vue
<script setup lang="ts">
const checkClientVersion = async () => {
  if (isAsk.value) {
    return;
  }

  try {
    const version = await api.getVersion();

    const localVersion = LocalStorage.getItem<number>("version");

    if (localVersion) {
      if (localVersion !== version) {
        isAsk.value = true;
        $q.dialog({
          progress: { spinner: QSpinnerRadio },
          message: `<div class="fs-16 lh-24 fw-600">
              ${i18n.global.t("word.new_version")}
              </div>`,
          position: "top",
          ok: {
            push: true,
            label: i18n.global.t("word.download"),
          },
          cancel: {
            push: true,
            color: "white",
            textColor: "black",
            label: i18n.global.t("word.download_later"),
          },
          persistent: true,
          color: "primary",
          class: "bg-white",
          html: true,
        })
          .onOk(async () => {
            LocalStorage.set("version", version);

            await navigator.serviceWorker.ready.then(async (registration) => {
              await registration.update().then(() => {
                caches.keys().then((names) => {
                  for (let name of names) {
                    caches.delete(name);
                  }
                });
              });
            });

            setTimeout(() => {
              window.location.reload();
            }, 500);
          })
          .onCancel(() => {
            clearInterval(checkInterval);

            checkInterval = setInterval(() => {
              checkClientVersion();
            }, 1000 * 60 * 10);
          })
          .onDismiss(() => {
            isAsk.value = false;
          });
      }
    } else {
      LocalStorage.set("version", version);
    }
  } catch (error) {
    console.error(error);
  }
};

onBeforeMount(() => {
  checkClientVersion();

  checkInterval = setInterval(() => {
    checkClientVersion();
  }, 1000 * 60);
});
</script>
```
