# Project Tiget

## 실행 방법

1. git bash 에서 다음 명령어 실행

```bash
git clone https://github.com/PollyGotACracker/team-project-tiget.git
```

2. 데이터베이스 설정:

- mySQL Workbench 실행
- root 의 `config` 폴더에서 `db_config.js` 파일을 workbench 설정에 맞게 `username`, `password`, `host` 수정
- 데이터베이스 생성을 위해 다음 명령어 실행

```sql
CREATE DATABASE tigetDB;
```

3. 공공데이터포털 API 연결

- 공공데이터포털 [한국천문연구원 특일 정보](https://www.data.go.kr/iim/api/selectAPIAcountView.do) 활용 신청 후 인증키 발급
- 마이페이지에서 인증키 복사(Encoding) 버튼 클릭
- `config` 의 `openapi_config_sample.js` 를 `openapi_config.js` 로 복사 후 인증키 작성
- _데이터가 불필요할 경우, `openapi_config.js` 복사 및 `bin` 의 `app.js` 파일에서 execute scheduler 영역 코드 주석 처리_

4. IDE 프로그램에서 프로젝트를 연 후, 터미널에서 다음 명령어 실행  
   오류 없이 모든 table 이 생성되었는지 확인

```bash
npm install
npm start
```

5. `docs` 폴더의 csv 데이터 파일을 mySQL Workbench 에서 아래 테이블 순서대로 import(Table Data Import Wizard)  
   아티스트와 공연 테이블의 기본키(...코드)는 `autoIncrement` 설정이 되어있으므로 체크 해제 후, 각 column 명이 일치하는지 확인  
   (2022.12 ~ 2023.01 파일)

   1. genre: 장르.csv
   2. artist: 아티스트.csv
   3. concert_info: 공연정보.csv
   4. artist_genre: 아티스트-장르.csv
   5. genre_concert: 공연-장르.csv
   6. concert_artist: 공연-아티스트.csv

6. IDE 프로그램에서 `npm start` 한 후 터미널에 나타난 주소를 ctrl + 클릭

## 실행 화면(캘린더 및 추천페이지)

![calendar](https://github.com/PollyGotACracker/team-project-tiget/assets/92136750/369365a8-6f6c-4810-b12d-7faf409af4b7)
![user-recommend](https://github.com/PollyGotACracker/team-project-tiget/assets/92136750/f40c6748-4c2e-4c92-8b19-abf833d15dce)
