---
date: 2026-08-03
category:
  - Camp
  - Unreal
order: 2
---

# 캠프 25일차

## 프로그래머스 코테 연습

<programmers-coding :test-id="70128">

::: tabs

@tab 반복문

```cpp
#include <vector>

using namespace std;

int solution(vector<int> a, vector<int> b) {
    int answer = 0;

    for (int i = 0; i < a.size(); i++) {
        answer += a[i]*b[i];
    }

    return answer;
}
```

:::

</programmers-coding>

## 팀프로젝트

TRPG 팀프로젝트에 사운드 기능을 추가하려 했다.

```cpp
#include <windows.h>
PlaySound(TEXT("sound.wav"), NULL, SND_FILENAME | SND_ASYNC);
```

Windows 기본 API를 활용하여 BGM과 효과음들을 넣어보려 했는데, 이 기본 API는 사운드를 단 하나만 실행할 수 있어서 두 가지 이상의 사운드를 동시에 출력하지 못했다.

그래서 다른 방법을 찾아보았다.
FMOD, SDL2, OpenAL 등 다양한 방법이 있었지만, 그 중에서 가장 간편하게 사용할 수 있는 `miniaudio` 라이브러리를 선택했다.
사용 방법은, 라이브러리를 다운로드 받아 프로젝트에 추가해주기만 하면 된다.

BGM은 게임 시작(인트로), 일반 전투, 보스 전투, 상점, 마을(메인 메뉴), 이렇게 기본 5가지 상황을 먼저 정했고, Attack 같은 일반 효과음들은 이후에 더 추가할 예정이다.

```cpp
// SoundManager.h
#pragma once
#include "miniaudio.h"
#include <string>
#include <map>

enum class SoundStates
{
    INTRO, // INTRO.mp3
    NORMAL_BATTLE, //
    BOSS_BATTLE, // BOSS.mp3
    SHOP, // charity-shop.mp3
    VILLAGE,// village.mp3
    ATTACK_01, // attack-01.wav
    ATTACK_02, // attack-02.wav
    ATTACK_03 // attack-03.wav
};

extern std::map<SoundStates, std::string> soundMap;

class SoundManager
{
public:
    bool Init();
    void Shutdown();
    void PlayBGM(const std::string& path, bool loop = true);
    void StopBGM();
    void PlaySFX(const std::string& path);

   private:
    ma_engine engine;
    ma_sound currentBgm;
    std::string currentBgmPath;
    bool isBgmPlaying = false;
};
```

```cpp
// SoundManager.cpp
#define MINIAUDIO_IMPLEMENTATION
#include "miniaudio.h"
#include <iostream>
#include "SoundManager.h"

std::map<SoundStates, std::string> soundMap = {
    {SoundStates::INTRO,  "assets/intro.mp3"},
    {SoundStates::NORMAL_BATTLE,  "assets/INBATTLE.mp3"},
    {SoundStates::BOSS_BATTLE, "assets/BOSS.mp3"},
    {SoundStates::SHOP, "assets/charity-shop.wav"},
    {SoundStates::VILLAGE, "assets/village.mp3"},
    {SoundStates::ATTACK_01, "assets/attack-01.wav"},
    {SoundStates::ATTACK_02, "assets/attack-02.wav"},
    {SoundStates::ATTACK_03, "assets/attack-03.wav"},
};

bool SoundManager::Init()
{
    return ma_engine_init(NULL, &engine) == MA_SUCCESS;
}

void SoundManager::Shutdown()
{
    StopBGM();
    ma_engine_uninit(&engine);
}

void SoundManager::PlayBGM(const std::string& path, bool loop)
{
    if (currentBgmPath == path && isBgmPlaying)
        return;

    StopBGM();

    if (ma_sound_init_from_file(&engine, path.c_str(),
                                MA_SOUND_FLAG_STREAM, NULL, NULL, &currentBgm) == MA_SUCCESS)
    {
        ma_sound_set_looping(&currentBgm, loop ? MA_TRUE : MA_FALSE);
        ma_sound_start(&currentBgm);
        currentBgmPath = path;
        isBgmPlaying = true;
    }
}

void SoundManager::StopBGM()
{
    if (isBgmPlaying)
    {
        ma_sound_stop(&currentBgm);
        ma_sound_uninit(&currentBgm);
        isBgmPlaying = false;
        currentBgmPath.clear();
    }
}

void SoundManager::PlaySFX(const std::string& path)
{
    ma_engine_play_sound(&engine, path.c_str(), NULL);
}
```

`SoundManager`의 핵심은 BGM과 효과음을 서로 다르게 다루는 것이다. BGM은 `ma_sound` 하나만 계속 유지하면서, `PlayBGM`이 호출될 때 이미 같은 경로가 재생 중이면 그냥 무시해서 불필요한 재시작을 막고, 다른 트랙이면 기존 걸 `StopBGM`으로 정지시킨 뒤 새로 시작한다. 반면 효과음(`PlaySFX`)은 `ma_engine_play_sound`로 그때그때 짧게 재생만 시키고 따로 상태를 들고 있지 않는다. 어떤 상황(인트로, 전투, 상점 등)에 어떤 파일을 틀지는 `SoundStates` enum과 `soundMap`으로 따로 빼둬서, "재생하는 로직"과 "무슨 상황에 무슨 파일을 쓸지"라는 데이터를 분리했다.
