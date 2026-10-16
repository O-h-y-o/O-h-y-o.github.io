---
date: 2026-08-13
category:
  - Unreal
order: 1
---

# UBT / UHT / 리플렉션 / CDO

## 전체 그림

언리얼에서 C++ 코드 한 줄이 실제로 빌드되어 에디터/블루프린트에서 쓰이기까지는 대략 이런 순서를 거친다.

1. **UBT(Unreal Build Tool)**가 빌드 전체를 지휘한다 — 어떤 모듈을 어떤 순서로, 어떤 플랫폼 설정으로 컴파일할지 결정한다.
2. UBT는 실제 C++ 컴파일러를 돌리기 전에 **UHT(Unreal Header Tool)**를 먼저 실행한다. UHT는 `UCLASS`/`UPROPERTY`/`UFUNCTION` 같은 매크로가 붙은 헤더를 스캔해서 **리플렉션**에 필요한 보일러플레이트 코드(`.generated.h`)를 생성한다.
3. 이렇게 생성된 리플렉션 데이터를 바탕으로, 클래스가 처음 로드될 때 그 클래스의 "기본값 템플릿"인 **CDO(Class Default Object)**가 하나 만들어진다. 이후 `new`나 `SpawnActor`로 만들어지는 모든 인스턴스는 이 CDO의 값을 기본값으로 물려받는다.

`UBT(빌드 오케스트레이션) → UHT(리플렉션 코드 생성) → 리플렉션 데이터(UClass) → CDO(그 클래스의 기본 인스턴스)`로 이어지는 하나의 파이프라인이다.

## UBT (Unreal Build Tool)

UBT는 C#으로 작성된 언리얼 전용 빌드 시스템이다. Visual Studio의 MSBuild나 일반 Makefile을 그대로 쓰는 대신, 언리얼은 자체 빌드 도구를 통해 모듈 단위로 프로젝트를 관리한다.

**주로 다루는 파일**

- `*.Build.cs` — 모듈 하나의 빌드 규칙. 어떤 다른 모듈에 의존하는지(`PublicDependencyModuleNames` 등), 어떤 include 경로를 쓰는지 정의한다.
- `*.Target.cs` — 빌드 타깃 규칙. Game/Editor/Server/Client 중 어떤 타깃인지, 어떤 플랫폼/설정(Debug, Development, Shipping)인지를 정의한다.

**주요 역할**

- 모듈 간 의존성 그래프를 분석해서 컴파일 순서를 결정
- 플랫폼(Windows/Mac/콘솔 등)에 맞는 컴파일러 호출
- Unity Build(여러 `.cpp` 파일을 하나로 합쳐 컴파일해 빌드 속도 향상), 증분 빌드, Hot Reload 처리
- 실제 컴파일 이전에 **UHT를 호출해서 리플렉션 코드를 먼저 생성**하도록 조율

에디터에서 `Ctrl+Alt+F11`(핫 리로드)이나 IDE의 빌드 버튼을 누르는 순간 뒤에서 실행되는 것이 바로 UBT다.

## UHT (Unreal Header Tool)

UHT는 UBT가 컴파일을 시작하기 전에 먼저 실행되는 파서다. `UCLASS` / `USTRUCT` / `UENUM` / `UPROPERTY` / `UFUNCTION` / `GENERATED_BODY()` 같은 매크로가 붙은 헤더 파일을 분석해서, 리플렉션에 필요한 코드를 자동으로 생성해준다.

```cpp
UCLASS()
class AMyActor : public AActor {
    GENERATED_BODY()

public:
    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    int32 Health;

    UFUNCTION(BlueprintCallable)
    void TakeDamage(int32 Amount);
};
// UHT가 이 헤더를 분석해서 Health, TakeDamage에 대한 리플렉션 코드를 생성한다.
```

- 생성된 코드는 `ClassName.generated.h` (그리고 `.gen.cpp`) 파일에 들어가고, 원본 헤더는 `#include "ClassName.generated.h"`로 이 생성 파일을 반드시 포함해야 한다. `GENERATED_BODY()` 매크로 자체도 이 생성 코드로 치환되는 자리다.
- 이 생성된 코드 안에 `UClass`를 등록하는 로직, 프로퍼티/함수 메타데이터 테이블 등이 들어있다 — 즉 **UHT의 출력물이 곧 리플렉션 시스템의 실체**다.
- UHT가 먼저 끝나야 실제 C++ 컴파일이 시작되므로, 매크로 문법이 틀리면(예: `GENERATED_BODY()` 누락) 일반 C++ 컴파일 에러가 아니라 UHT 단계에서 별도의 에러가 난다.

::: tip UHT가 개발 환경에 미치는 영향
언리얼은 이런 매크로들을 UHT가 빌드 시점에 실제 코드로 생성해서 채워 넣는 구조이기 때문에, Visual Studio가 이 부분의 IntelliSense/오류 표시를 VSCode보다 정확하게 인식하는 편이다. 디버거도 TArray/FString 같은 언리얼 자료구조를 Watch 창에서 보기 좋게 표시해주는 등 언리얼과 더 깊게 붙어있다. UnrealVS라는 Epic 공식 확장도 Visual Studio 전용이다. 다만 최근엔 VSCode + C++ 확장도 많이 좋아져서, 무조건 바꿔야만 하는 건 아니라고 한다.
:::

## 리플렉션 (Reflection)

리플렉션 시스템은 언리얼 엔진이 객체와 클래스 정보를 **런타임에 동적으로 조회하고 활용**할 수 있게 해주는 메타데이터 시스템이다. 코드에 정의된 클래스와 속성을 엔진이 스스로 이해하고 다룰 수 있도록 하는 장치라고 볼 수 있다.

일반적인 C++은 컴파일 시점에 타입이 결정되기 때문에, 런타임에 "이 객체가 어떤 클래스인지", "어떤 변수와 함수를 가지고 있는지"를 알아내기가 어렵다. 하지만 언리얼은 에디터, 블루프린트, 네트워크 복제, 직렬화(저장/로드) 같은 기능을 위해 런타임에 클래스 정보를 알아야 한다. 리플렉션 시스템은 이 문제를 풀기 위해 도입됐고, 위에서 본 UHT가 그 데이터를 실제로 만들어내는 도구다.

**런타임 활용처**

- 블루프린트에서 변수/함수 노출
- 직렬화(저장/로드)
- 네트워크 복제
- 에디터에서 속성 편집

### UPROPERTY() 안에 주로 들어가는 지정자(specifier)

`UPROPERTY()` 괄호 안은 크게 네 부류의 지정자로 채워진다.

**에디터 노출**

| 지정자                                                            | 의미                                                |
| ----------------------------------------------------------------- | --------------------------------------------------- |
| `EditAnywhere`                                                    | 인스턴스 + 블루프린트 기본값 어디서든 편집 가능     |
| `EditInstanceOnly`                                                | 레벨에 배치된 인스턴스에서만 편집 가능              |
| `EditDefaultsOnly`                                                | 블루프린트 기본값에서만 편집 가능                   |
| `VisibleAnywhere` / `VisibleInstanceOnly` / `VisibleDefaultsOnly` | 에디터에 보이기만 하고 편집은 불가 (읽기 전용 표시) |

**블루프린트 접근**

| 지정자                | 의미                                                  |
| --------------------- | ----------------------------------------------------- |
| `BlueprintReadWrite`  | 블루프린트에서 읽기/쓰기 모두 가능                    |
| `BlueprintReadOnly`   | 블루프린트에서 읽기만 가능                            |
| `BlueprintAssignable` | (델리게이트 전용) 블루프린트에서 이벤트에 바인딩 가능 |

**네트워크 복제**

| 지정자                             | 의미                                 |
| ---------------------------------- | ------------------------------------ |
| `Replicated`                       | 서버 → 클라이언트로 값 자동 동기화   |
| `ReplicatedUsing = OnRep_함수이름` | 복제될 때 콜백 함수 실행 (RepNotify) |

**기타 메타/카테고리/제약**

| 지정자                                      | 의미                                            |
| ------------------------------------------- | ----------------------------------------------- |
| `Category = "이름"`                         | 디테일 패널에서 묶이는 카테고리 지정            |
| `meta = (ClampMin = "0", ClampMax = "100")` | 범위·툴팁 등 세부 제약을 `meta=(...)` 안에 추가 |
| `Transient`                                 | 저장/로드 대상에서 제외 (직렬화 안 함)          |
| `SaveGame`                                  | SaveGame 직렬화 대상에 포함                     |
| `Config`                                    | ini 설정 파일에서 값을 읽어옴                   |

가장 흔한 조합은 `UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Stats")`처럼 "에디터 노출 + 블루프린트 접근 + 카테고리"를 함께 쓰는 형태다.

### UCLASS() 안에 주로 들어가는 지정자

| 지정자                                        | 의미                                                         |
| --------------------------------------------- | ------------------------------------------------------------ |
| `Blueprintable`                               | 이 클래스를 부모로 하는 블루프린트 생성을 허용               |
| `NotBlueprintable`                            | 블루프린트 자식 클래스 생성을 금지                           |
| `Abstract`                                    | 추상 클래스로 지정 — 직접 인스턴스화 불가, 상속용으로만 사용 |
| `BlueprintType`                               | 블루프린트에서 변수 타입으로 사용 가능                       |
| `NotBlueprintType`                            | 블루프린트 변수 타입으로 사용 불가                           |
| `placeable` / `NotPlaceable`                  | 에디터에서 레벨에 직접 배치 가능 여부                        |
| `HideCategories(...)` / `ShowCategories(...)` | 디테일 패널에서 특정 카테고리를 숨기거나 표시                |
| `Config = Game`                               | `Config` 지정자가 붙은 프로퍼티를 지정한 ini 파일에 저장     |
| `ClassGroup = (이름)`                         | Class Viewer/액터 배치 목록에서의 그룹 분류                  |

```cpp
UCLASS(Blueprintable, BlueprintType, Category = "Character")
class AMyCharacter : public ACharacter {
    GENERATED_BODY()
};
```

### UFUNCTION() 안에 주로 들어가는 지정자

| 지정자                               | 의미                                                                                |
| ------------------------------------ | ----------------------------------------------------------------------------------- |
| `BlueprintCallable`                  | 블루프린트 그래프에서 노드로 호출 가능 (실행 핀 있음)                               |
| `BlueprintPure`                      | 실행 핀 없이 값만 반환하는 순수 함수(게터 성격)로 노출                              |
| `BlueprintImplementableEvent`        | C++에는 선언만 하고, 실제 구현은 블루프린트에서만 작성                              |
| `BlueprintNativeEvent`               | C++ 기본 구현이 있고, 블루프린트에서 필요하면 오버라이드 가능                       |
| `Server` / `Client` / `NetMulticast` | 네트워크 RPC(원격 함수 호출) 지정 — 각각 서버로/클라이언트로/모든 클라이언트로 호출 |
| `Reliable` / `Unreliable`            | 위 RPC 지정자와 함께 사용, 패킷 유실 시 재전송 보장 여부                            |
| `Exec`                               | 콘솔 명령어로 호출 가능한 함수로 등록                                               |
| `CallInEditor`                       | 디테일 패널에 이 함수를 실행하는 버튼을 추가 (에디터에서 즉시 호출용)               |
| `Category = "이름"`                  | 블루프린트 노드 검색/팔레트에서 묶이는 카테고리 지정                                |

```cpp
UFUNCTION(BlueprintCallable, Category = "Combat")
void TakeDamage(int32 Amount);

UFUNCTION(BlueprintPure, Category = "Stats")
int32 GetHealth() const;

UFUNCTION(Server, Reliable)
void ServerFire();
```

### USTRUCT() / UENUM() 안에 주로 들어가는 지정자

구조체와 열거형은 클래스보다 지정자 종류가 단순하다.

| 지정자              | 대상                | 의미                                                             |
| ------------------- | ------------------- | ---------------------------------------------------------------- |
| `BlueprintType`     | USTRUCT, UENUM 공통 | 블루프린트에서 변수 타입으로 사용 가능                           |
| `Atomic`            | USTRUCT             | 네트워크 복제 시 멤버 단위가 아닌 구조체 전체를 하나로 묶어 복제 |
| `meta = (Bitflags)` | UENUM               | 값들을 비트 플래그(각 값이 2의 거듭제곱)로 다루도록 지정         |

```cpp
USTRUCT(BlueprintType)
struct FInventorySlot {
    GENERATED_BODY()

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    int32 ItemId;
};

UENUM(BlueprintType)
enum class EWeaponType : uint8 {
    Sword,
    Bow,
    Staff
};
```

## CDO (Class Default Object)

CDO는 `UClass` 하나마다 정확히 하나씩 존재하는 **그 클래스의 "기본값 템플릿" 오브젝트**다. 이름은 내부적으로 `Default__클래스이름` 형태로 관리된다.

- 클래스가 처음 로드/등록될 때(대략 UHT가 생성한 리플렉션 데이터를 바탕으로) 엔진이 그 클래스의 CDO를 자동으로 하나 생성한다.
- 이후 `NewObject<T>()`나 `SpawnActor<T>()`로 새 인스턴스를 만들면, 생성자가 실행된 뒤 **CDO가 들고 있는 프로퍼티 값들이 새 인스턴스로 복사**되어 초기값이 된다. C++ 생성자에서 정한 기본값과, 블루프린트 에디터의 "Class Defaults" 패널에서 덮어쓴 값이 최종적으로 합쳐지는 지점이 바로 CDO다.
- 블루프린트 에디터의 **Class Defaults** 탭에서 값을 바꾸는 것은 그 블루프린트 클래스의 CDO 프로퍼티를 직접 수정하는 것과 같다.
- `GetDefault<T>()`(읽기 전용) / `GetMutableDefault<T>()`(수정 가능)로 코드에서 직접 CDO에 접근할 수 있다.

```cpp
// AMyCharacter 클래스의 CDO에서 기본 체력값만 조회
int32 DefaultHealth = GetDefault<AMyCharacter>()->Health;
```

::: warning 생성자와 CDO
UObject 계열 클래스의 C++ 생성자는 **일반 인스턴스를 만들 때뿐 아니라 CDO 자체를 만들 때도 호출된다.** 그런데 CDO는 "월드 안에 실제로 존재하는 오브젝트"가 아니라 값만 들고 있는 템플릿이므로, 생성자 안에서 다른 액터를 스폰하거나 월드 상태에 의존하는 로직을 넣으면 CDO 생성 시점에 문제가 생길 수 있다. 생성자에는 프로퍼티 기본값 설정, 컴포넌트 생성(`CreateDefaultSubobject`) 정도만 두고, 실제 게임 로직은 `BeginPlay()` 같은 곳으로 미루는 것이 원칙이다.
:::

## 가비지 컬렉션과의 관계

리플렉션으로 붙는 `UPROPERTY` 태그는 GC(가비지 컬렉션)에도 그대로 쓰인다. `UPROPERTY`로 선언된 포인터는 GC가 추적 가능한 참조가 되어, 더 이상 쓰이지 않으면 엔진이 알아서 해제해준다. 반대로 원시 포인터로 `UObject`를 들고 있으면 GC가 그 참조를 인식하지 못해 메모리 누수나 잘못된 참조가 발생할 수 있다(최신 UE에서는 `TObjectPtr`을 권장).

::: tip UObject와 std 스마트 포인터를 섞지 않는 이유
언리얼의 `UObject` 계열(`AActor`, `UActorComponent` 등)은 std 스마트 포인터가 아니라 **언리얼 자체 가비지 컬렉터(GC)**가 수명을 관리한다. 그래서 UObject를 `std::shared_ptr`이나 `std::unique_ptr`로 감싸면 GC와 충돌해서 오히려 위험하다. UObject를 가리킬 땐 그냥 raw 포인터(`UPROPERTY()`로 GC에게 참조를 알려줌) 또는 `TWeakObjectPtr`를 쓰고, `std::unique_ptr`/`std::shared_ptr`은 UObject가 아닌 순수 C++ 클래스(커스텀 게임 로직 클래스, 알고리즘용 자료구조 등)에만 쓰는 것이 원칙이다. 언리얼에는 별도로 `TSharedPtr`/`TWeakPtr`/`TUniquePtr`이라는 자체 스마트 포인터 세트도 있는데, 이건 non-UObject 타입(Slate 위젯 등)에서 std 대신 쓰라고 만들어진 것이다.
:::
