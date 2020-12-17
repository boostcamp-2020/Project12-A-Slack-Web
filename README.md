# Project12-A-Slack-Web

<div align="center">
<img src="https://user-images.githubusercontent.com/48546343/101989147-ce37be80-3ce1-11eb-82a6-aa35d989789b.png" width="" height=""/>
<br />
<br />

## 💥 프로젝트 소개
`I'm slack`은 팀 협업 도구인 Slack의 Web 버전을 개발하는 클론 프로젝트입니다. 팀이 공유하는 Workspace 내에서 Channel, DM을 통해 특정 멤버를 구성하고 실시간 채팅을 통해 자유롭게 소통할 수 있습니다. 

## 👥 Team

| J039_김서영 | J062_김혜지 | J088_박준호 |J165_이한주 |
| :------: | :------: | :------: | :------: |
| <img width=85 src="https://ca.slack-edge.com/T019JFET9H7-U01A1NXHW5P-6ad3ec6e0275-512"> | <img width=85 src="https://ca.slack-edge.com/T019JFET9H7-U019PAHD2BV-c7785a9ef0f7-512">| <img width=85 src="https://ca.slack-edge.com/T019JFET9H7-U019P4W0YUA-41504186feaf-512"> | <img width=85 src="https://ca.slack-edge.com/T019JFET9H7-U019VBGPEAG-c7259ab3d955-512"> |
</div>


## 🖥 기술 스택
<img src="https://user-images.githubusercontent.com/46681729/102215468-1abb0e00-3f1d-11eb-976d-c75f094e77db.png">


## Architecture


### DevOps
<img src="https://user-images.githubusercontent.com/63051473/101992417-6d66b100-3cf6-11eb-8df9-ef7f65e90bf3.png"/>

### Socket flow
<img width="815" alt="socket-flow" src="https://user-images.githubusercontent.com/57661699/101992609-f9c5a380-3cf7-11eb-8593-2205a5df694f.png">


## 🚦 How to start?

### 1. NPM

> npm, node가 설치되어 있다면 이 방법으로 시작할 수 있습니다.

#### (1) Clone

```bash
git clone https://github.com/boostcamp-2020/Project12-A-Slack-Web.git
```

#### (2) Frontend Setting

```bash
cd client
npm install
# .env 파일 생성
```

`.env`

```
NODE_ENV=development
SERVER_DOMAIN_DEVELOP = http://localhost:3000
SERVER_DOMAIN_PRODUCTION = <배포 BE 서버 URL>
SOCKET_SERVER_DOMAIN_DEVELOP = http://localhost:4000
SOCKET_SERVER_DOMAIN_PRODUCTION = <배포 BE 서버 URL>
```

> `SERVER_DOMAIN_PRODUCTION`와 `SOCKET_SERVER_DOMAIN_PRODUCTION`은 `URL:3000`, `URL:4000`와 같이 작성해주시면 됩니다.
> 
#### (3) Backend Setting

```bash 
cd ../server
npm install
# .env 파일 생성
```

`.env`

```
PORT = 3000
SOCKET_PORT = 4000
NODE_ENV = development
DB_HOST = <DB host>
DB_USER_NAME = <DB user name>
DB_PASSWORD = <DB password>
DB_PORT = <DB port>
DB_DATABASE = <DB database name>
JWT_SECRET_KEY = <JWT secret key>
BACK_DOMAIN_DEVELOP = http://localhost:3000
BACK_DOMAIN_PRODUCTION = <배포 BE 서버 URL>
FRONT_DOMAIN_DEVELOP = http://localhost:8000
FRONT_DOMAIN_DEVELOP_2 = http://127.0.0.1:8000
FRONT_DOMAIN_PRODUCTION = <배포 FE 서버 URL>
NCP_ACCESS_KEY= <Ncloud access key>
NCP_SECRET_KEY= <Ncloud secret key>
GOOGLE_CLIENT_ID= <Google client ID>
GOOGLE_CLIENT_SECRET = <Google client secret key>
```

#### (4) Backend 실행

```bash=
npm start
```

#### (5) Frontend 실행

```bash=
cd ../client
npm run dev
```



## 📄 Documents
- [FE 기능 명세서](https://docs.google.com/presentation/d/1fi3qxlIQIMb2RBOowvshsdAujtwnlJcHvdZBSS9jVLM/edit#slide=id.p)
- [Backlog](https://docs.google.com/spreadsheets/d/1ETdbHj9wcMq7f9w6AYJnS_aCk9H8cTeX2V2qf03RcGM/edit#gid=0)
- [DB Schema](https://github.com/boostcamp-2020/Project12-A-Slack-Web/wiki/DB-Schema)


