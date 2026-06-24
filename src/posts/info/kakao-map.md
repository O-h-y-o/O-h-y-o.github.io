---
date: 2024-07-02
category:
  - KAKAO
tag:
  - KAKAO Map
  - KAKAO Develope
---

# 카카오 맵 구현하기 (Typescript)

우선 카카오 개발자 센터를 들어가서 앱 등록을 해주세요.

[https://developers.kakao.com](https://developers.kakao.com)

플랫폼에 들어가 사용할 플랫폼을 등록해줍니다.

앱키에서 Javascript 키를 복사하여 다음 코드에 넣어서 `index.html`에 넣어주세요.

```html
<!-- index.html -->
<head>
  <script
    type="text/javascript"
    src="//dapi.kakao.com/v2/maps/sdk.js?appkey={Javascript Key}&libraries=services"
  ></script>
</head>
```

<br/> <br/>

다음은 navigator.geolocation과 kakao API를 이용하여 주소를 구하는 예제입니다. `ex) 서울 동작구`

```ts
interface IGeoLocationResponse {
  address_name: string;
  building_name: string;
  main_building_no: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  road_name: string;
  sub_building_no: string;
  underground_yn: "Y" | "N";
  zone_no: string;
}

const getGeoLocation = (coords: {
  lat: number;
  lng: number;
}): Promise<IGeoLocationResponse> => {
  return new Promise((resolve, reject) => {
    const geocoder = new window.kakao.maps.services.Geocoder();

    const coord = new window.kakao.maps.LatLng(coords.lat, coords.lng);

    geocoder.coord2Address(
      coord.getLng(),
      coord.getLat(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (result: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          resolve(result[0].road_address);
        } else {
          reject("주소를 찾는데 실패하였습니다.");
        }
      }
    );
  });
};

navigator.geolocation.getCurrentPosition(async (position) => {
  const res = await getGeoLocation({
    lat: position.coords.latitude,
    lng: position.coords.longitude,
  });

  currentPosition.value = `${res.region_1depth_name} ${res.region_2depth_name}`;
});
```

다음은 kakao API의 addressSearch를 이용하여 지도를 그리고 마커를 찍는 간단한 예제입니다.

```vue
<!-- KakaoMap.vue -->
<template>
  <div ref="mapElement" style="width: 100%; height: 400px"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getAddressSearch } from "src/util/functions";

const mapElement = ref<HTMLElement>();

const props = defineProps({
  address: { type: String, required: true },
});

const getAddressSearch = (
  address: string
): Promise<{ lat: number; lng: number }> => {
  return new Promise((resolve, reject) => {
    const geocoder = new window.kakao.maps.services.Geocoder();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    geocoder.addressSearch(address, (result: any, status: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        resolve({ lat: Number(result[0].y), lng: Number(result[0].x) });
      } else {
        reject(new Error("주소를 찾는데 실패하였습니다."));
      }
    });
  });
};

onMounted(async () => {
  const latLng = await getAddressSearch(props.address);

  const mapOptions = {
    center: new window.kakao.maps.LatLng(latLng.lat, latLng.lng),
    level: 3,
  };

  const map = new window.kakao.maps.Map(mapElement.value, mapOptions);

  const marker = new window.kakao.maps.Marker({
    position: new window.kakao.maps.LatLng(latLng.lat, latLng.lng),
  });

  marker.setMap(map);
});
</script>
```

`Typescript`의 경우에 window객체에 kakao를 추가하지 않으면 타입스크립트 에러가 발생합니다. 다음과 같이 추가해주세요.

```ts
// global.d.ts
export {};

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}
```
