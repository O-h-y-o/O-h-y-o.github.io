<template>
  <div ref="threeContainer"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

const threeContainer = ref();
let scene, camera, renderer, coin;

onMounted(() => {
  // Scene 생성
  scene = new THREE.Scene();

  // Camera 생성
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  // Renderer 생성 및 DOM에 추가
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  threeContainer.value.appendChild(renderer.domElement);

  // OBJ Loader 생성
  const loader = new OBJLoader();

  // 비트코인 3D 모델 파일 로드
  loader.load("../../../assets/icon/Coin.obj", function (object) {
    coin = object;

    // 재질(Material) 설정 (예: 색상 또는 텍스처)
    // const material = new THREE.MeshBasicMaterial({ color: "#FFD700" });

    coin.traverse(function (child) {
      if (child instanceof THREE.Mesh) {
        // child.material = material;
      }
    });

    scene.add(coin);

    animate();
  });
});

function animate() {
  requestAnimationFrame(animate);

  if (coin) {
    // Coin 회전
    coin.rotation.y += Math.PI / 180; // 한 바퀴 돌리려면 Math.PI / 180 값으로 조정

    // Scene 렌더링
    renderer.render(scene, camera);
  }
}
</script>
