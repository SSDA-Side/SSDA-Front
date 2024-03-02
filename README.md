# SSDA팀의 Dassda.
*소중한 일상을 공유해보세요* /released 240225

![dassda-og-image](https://github.com/SSDA-Side/SSDA-Front/assets/48979587/ab6673f3-8f7c-4f9a-8d2d-a7aaceb03ad1)

## 서비스 소개

> #### 당신의 일상을 공유하고, 소중한 순간을 함께 나누는 '공유 일기장' 어플!

- **다양한 일기 작성 탬플릿**과 특별한 기능으로, 더 심플하게 일기를 쓸 수 있어요.
- 회원 등급에 따라 차별된 서비스를 제공하며, **공유 일기장을 통해 친구들과 소통**하세요.
- **기분 스티커, 댓글, 좋아요 기능**을 통해 더 풍성한 일기 작성 경험을 제공해요.
- **모바일웹**을 통해 언제 어디서든 편리하게 이용 가능합니다.

***함께 쓰는 일기장으로 더 특별한 순간을 기록해보세요🙌***

## 서비스 정보 개요

#### 개발 인원
- 총 6명

| 역할 | 이름 | 연락처 | 비고 |
| ------------- | ------------- | ------------- | ------------- |
| 📝 PM | 이세은 | wntkfkd95@naver.com | 팀장 |
| 🎨 DE | 유수 | - | - |
| ⚙ BE | 권동휘 | - | BE 리드 |
| ⚙ BE | 김범준 | - | - |
| 📺 FE | 김주현 | sang.pok.e@gmail.com | FE 리드 |
| 📺 FE | 이어진 | - | - |

#### 개발 기간
- 총 4달, 2023년 11월 02일 ~ 2023년 02월 25일
- 기존 팀원: 이세은, 유수, 권동휘, 김범준
- 24년 01월 01일 이후 합류 팀원: 김주현, 이어진

#### 배포 주소
- https://dassda.today, by Vercel

#### 화면설계 URL
- [쓰다 Prototyping UI / Figma URL](https://www.figma.com/file/nx8EkCrbjOGxo22KYulTcP/%EA%B3%B5%EC%9C%A0-%EC%9D%BC%EA%B8%B0%EC%9E%A5?type=design&node-id=0%3A1&mode=design&t=dibWmhUdCesJXOy9-1)

#### 기술 스택 /Frontend
`React`, `Typescript`
- 2차 배포 목표가 PWA이기 때문에 하나의 어플리케이션으로 느끼게 만들고 싶어 React UI Library를 사용하였습니다.

`Module SCSS`
- CSS in JS는 스타일을 직렬화하는 과정에서 런타임 오버헤드가 걸리고 번들 크기를 늘리는 단점이 있습니다.
- 초기 로딩을 최대한 앞당기기 위함과, 스코프 지정 스타일을 사용하기 위해 Module SCSS를 선택했습니다.

`React Query`, `Recoil`
- 서버 사이드 상태를 효율적으로 캐싱하기 위해 React Query를 사용하였습니다.
- Header Config 등 클라이언트 상태를 효율적으로 관리하기 위해 Recoil을 사용하였습니다.

`Axios`
- 뭐시기 뭐시기

#### 협업 툴 /팀 전체
`Jira`
- ㅗㅓㅗㅓㅗ

`Figma`
- 뭐시기 뭐시기

`Slack`
- 블라블라

## 협업 과정 /FE

**`Github Action`을 통한 티켓 넘버 관리**
- 상황
  - Github Repository와 Jira의 연동은 Jira에서 생성한 티켓 넘버를 기준으로 연동이 됩니다.
  - Branch 이름에 해당 티켓 넘버가 포함되어 있어야 연동이 됩니다.
  - 매번 수기로 기입하다보니 휴먼 에러 및 개발 경험이 떨어지는 상황이 존재했습니다.
- 해결
  - Github Action을 작성하여 Github Issue를 작성 시, 자동으로 Jira에 이슈를 생성합니다.
  - 생성한 Jira 이슈의 티켓 넘버를 받아와 develop에서 branch를 따와 생성합니다.

**`Husky`를 통한 커밋 컨벤션 관리**
- 위의 상황과 마찬가지로, Commit 내용에도 해당 티켓 넘버가 포함되어 있어야 연동이 됩니다.
- Github Hook을 편하게 사용할 수 있게 제공해주는 Husky를 통해 커밋 시 자동으로 티켓 넘버가 기입되게 만들었습니다.

## 서비스 특징

### Oauth(Kakao) 로그인
- Oauth를 통한 간편한 로그인

| 쓰다 로그인 흐름 순서도 |
| -------- |
| ![쓰다 로그인 흐름](https://github.com/SSDA-Side/SSDA-Front/assets/48979587/7f7c6086-fb49-43a5-8c8c-2711c6efcfa5) |


### 알림
- 나에게맞는 알림

| 쓰다 알림 화면 |
| -------- |
| ![image](https://github.com/SSDA-Side/SSDA-Front/assets/48979587/54324464-f0f9-4a32-8d85-052d07760d80) |


### 공유 일기장 초대
| 쓰다 초대하기 모달 | 카카오톡 공유하기 }
| -------- | ------- |
| ![image](https://github.com/SSDA-Side/SSDA-Front/assets/48979587/fcb9af26-c0f7-476a-a580-fc1eada330ba) | ![image](https://github.com/SSDA-Side/SSDA-Front/assets/48979587/a5d4bdea-447b-46d9-aa8a-1840f272bcaf) |




| 쓰다 초대하기 흐름 순서도 |
| -------- |
| ![쓰다 초대 흐름](https://github.com/SSDA-Side/SSDA-Front/assets/48979587/8e5d0fe8-8ce3-4485-ae0c-4011c21dae54) |


### 스켈레톤 및 오류 화면 대응
- 오호라 ..

### ID 기반 모달 관리
- 음음
