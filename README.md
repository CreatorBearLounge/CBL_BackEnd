# CreatorBearLounge_BackEnd

#### npm install 오류시

`npm i typeorm@0.2.41 @nestjs/typeorm@8.0.2`
터미널에 입력

#### DB 오류시

Postgresql에 aws 정보 넣기


## 예상 스택

Design: Figma - https://www.figma.com/file/HqwC3yHqip2Rjtgw86BUoc/Untitled?node-id=0%3A1
기획 문서: https://docs.google.com/spreadsheets/d/1LiPcUMlPF9di5wOVqVem_wyeNrSH5BDzBfModDqlHSs/edit#gid=0
<br>
Front:React
<br>
Backend: Nest
<br>
server: AWS - S3 EC2, RDS
Contents storeage: gooleDrive
<br>
ERD 스키마: https://www.erdcloud.com/d/KQ7oBLmx89SjyuTTE
<br>

## 페이지 개요

### 1. 메인페이지

- navbar: 카테고리, Metamask 연결
- section1: 웹페이지 환영글
- section2: Creator Bears Club에 관련한 소개
- section3: Open Sea 링크 & my nft 소개
- section4: RoadMap - creator bears Club이 나아갈 방향 소개
- section5: 팀원과 파트너 소개

### 2. 팀 소개 페이지

### 3. Holder

- CBC에서 제공하는 컨텐츠들과 이와 관련된 카테고리

### 4. Holder 세부 페이지

- CBC에서 제공하는 컨텐츠들의 세부 내용들 제공 (아티스트 프로필, 내용, 다운로드 버튼)

<br/>

## 요구 사항 분석

1. 로그인:

- Metamask 확장 프로그램과 연동하여 계정과 서버를 연동

2. Holder 페이지:

- 로그인 여부와 관계없이 CBC에서 제공하는 컨텐츠가 무엇이 있는지 볼 수 있음. (하지만 다운로드는 하지 못함)
- 로그인을 하면 다운로드 버튼을 누를 수 있게 되고, 저장되어 있는 google Drive에 연결됨
- 가지고 있는 NFT개수에 따라서 5개 이상 가지고 있는 회원과 1~4개를 가지고 있는 회원의 다운로드 가능 컨텐츠는 차이를 둠.
- 한 계정 당 횟수에 관계없이 다운로드 횟수는 0혹은 1로만 지정함

3. ADMIN:

- 분배: 작가 별 자신의 작품의 다운로드 횟수에 따라 수익이 차등 분배됨. - 작가 DB 속성: PK, 작가 이름, 등록한 컨텐츠 명 ..., ..., 다운로드 횟수 - 분배되어야 할 수익과 작가들의 다운로드 퍼센트에 따라서 차등분배되도록 만듬
  <br/>





## 개발요구사항
### [ 포트폴리오 페이지 - 퍼블리싱 ]
#### 구성 :

1. 타이틀
2. 설명(스토리)
3. 구매링크
4. 로드맵
5. 파트너, 팀

### [ 팀 포트폴리오 페이지 - 퍼블리싱 ]

GBF팀에 대해 (디자인 구성중)

### [ 홀더 페이지 ]
메타마스크 지갑 연결 → CBL홀더만 다운로드 가능, 접속은 모두가 가능
웹페이지 퍼블리싱 → 카테고리 형태 디자인
페이지 내에 들어갔을때 아티스트, 내용, 다운로드 버튼 있음 → 운영진이 작성가능
다운로드 버튼은 메타마스크 지갑 연결한 CBL홀더만 가능
다운로드시 웹서버 내에 파일을 다 넣으면 해킹 및 비용 관리 부분 리스크가 있어 구글 드라이브도 고려해야할 듯. 구글 드라이브로 할 시 링크 무단 복제가 우려됨, 다운로드 버튼 눌렀을때 바로 다운이 되는 방식이였으면 좋겠음 → 아니더라도 파일 자체를 배포시키는건 못막더라도 다운링크 자체를 무단 배포하게 하는건 막는 방법이 있을까?
NFT5개 이상 홀더만 들어갈 수 있는 카테고리 개설 가능?

[ 데이터 베이스 관련 ]
수익금의 60%를 다운로드 횟수 비례, 다운로드 횟수는 컨텐츠당 인당 1회만 기록
아티스트들에게 배분 각 카테고리마다 다운로드 횟수 상이 (카테고리별)



| ContentCategoryID(PK) |       ContentCategory        | Download Distribution Count |
| :-------------------: | :--------------------------: | :-------------------------: |
|           1           |   Mincraft Building Asset    |              1              |
|           2           |    Building Architecture     |             0.3             |
|           3           |    VOX File Architecture     |              1              |
|           4           |         3D Modeling          |             0.5             |
|           5           |     blockBanch Modeling      |             0.3             |
|           6           | Background Music for YOUTUBE |              1              |
|           7           |    Plug In  & Server Pack    |             0.6             |
|           8           |             Font             |              1              |
|           9           |       Effective sound        |             0.2             |



마인크래프트 건물 에셋 0.5회
마인크래프트 건축 1회
vox파일 건축 0.3회
3D 모델링(obj) 1회
블록벤치 모델링(json) 0.5회
2D 텍스쳐, 스킨 0.3회
음악(오케스트라) 1회
유튜브용 배경음악 0.6회
플러그인, 서버팩 1회
폰트 1회
효과음 0.2회(아마)
날자 기간동안 아티스트별 다운로드 횟수 조회기능 / 예) 3월 한달간 영민 총 5회 승엽 총 16회
날자 기간동안 콘텐츠별 다운로드 횟수 조회가능

[ 차후 지갑연결 관련 ]
디스코드 홀더 인증 봇 → 디스코드에서 홀더 인증하면 권한부여

### 기획 초기 이미지

<img src = "https://user-images.githubusercontent.com/63040492/163362678-983ec58f-0fd6-4f33-b7be-e413a9992778.png"  width="300" height="300">
<img src = "https://user-images.githubusercontent.com/63040492/163362697-071823a5-d8d5-43e0-998f-b3ac35cba6b8.png"  width="300" height="300">
<img src = "https://user-images.githubusercontent.com/63040492/163362713-b462c5a1-8a51-495e-9925-515941ff7b5d.png"  width="300" height="300">

### API 문서
https://satin-loganberry-da5.notion.site/2c5be6e066b841b5b166b2d1de1a1a7b?v=9a55442702294771a31fcf28329cae3c

