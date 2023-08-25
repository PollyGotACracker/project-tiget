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

6. IDE 프로그램에서 프로젝트를 연 후, 터미널에서 다음 명령어 실행  
   오류 없이 모든 table 이 생성되었는지 확인

```bash
npm install
npm start
```

7. `docs` 폴더의 csv 데이터 파일을 mySQL Workbench 에서 아래 테이블 순서대로 import(Table Data Import Wizard)  
   아티스트와 공연 테이블의 기본키(...코드)는 `autoIncrement` 설정이 되어있으므로 체크 해제 후, 각 column 명이 일치하는지 확인  
   (2022.12 ~ 2023.01 파일)

   1. genre: 장르.csv
   2. artist: 아티스트.csv
   3. concert_info: 공연정보.csv
   4. artist_genre: 아티스트-장르.csv
   5. genre_concert: 공연-장르.csv
   6. concert_artist: 공연-아티스트.csv

8. IDE 프로그램에서 `npm start` 한 후 터미널에 나타난 주소를 ctrl + 클릭

## 실행 화면(캘린더 및 추천페이지)

![calendar](https://file.notion.so/f/s/0decf419-b2c8-4280-8d65-9b721a95e82c/calendar.gif?id=982790eb-3f70-4068-b1d5-91530e67a7ae&table=block&spaceId=f0e0ab15-e9ec-46c4-97fe-8808a1f369e6&expirationTimestamp=1692979200000&signature=xhBs51IHqbdiCa_OR0YtVbRadbZudcwK7n7luw3yE6E&downloadName=calendar.gif)
![user-recommend](https://file.notion.so/f/s/9167d73b-9747-4e7b-aa46-6bb98f99f8ca/user-recommend.gif?id=6b5a46b4-ac02-40e0-96c7-178c66f1d0ee&table=block&spaceId=f0e0ab15-e9ec-46c4-97fe-8808a1f369e6&expirationTimestamp=1692979200000&signature=FgE0rw4h82-ahr5FHJfA7Y3lUqnpch47ZJzAw6NEOko&downloadName=user-recommend.gif)
