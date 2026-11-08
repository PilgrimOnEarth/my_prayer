# my_prayer

아침기도와 저녁기도를 나누어 바치는 개인 기도 앱입니다. 설치하면 오프라인에서도 열립니다.

## 파일

| 파일 | 역할 |
|---|---|
| `index.html` | 앱 전체(화면, 기도문, 동작) |
| `manifest.webmanifest` | 홈 화면 설치 정보 |
| `sw.js` | 오프라인 저장 |
| `icons/` | 앱 아이콘 |

## 배포 (Cloudflare Pages)

Workers & Pages → 만들기 → Pages → Git에 연결 → 이 저장소 선택.
프레임워크 None, 빌드 명령 비움, 출력 디렉터리 `/`.

## 폰에 설치

배포된 주소를 열고 홈 화면에 추가합니다.
- iPhone(Safari): 공유 → 홈 화면에 추가
- Android(Chrome): 메뉴 → 앱 설치

주소 끝에 `#am` 또는 `#pm`을 붙이면 아침기도 또는 저녁기도 화면으로 바로 열립니다.

## 기도문을 고칠 때

`index.html`의 `PRAYERS` 목록을 수정합니다. 고친 뒤에는 `sw.js`의 `VERSION` 숫자를 올려야 폰의 저장본이 바뀝니다.
