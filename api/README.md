# Leitner Box - API

`ExpressJS`로 제작한 API 서버입니다. `MySQL` 데이터베이스에 학습카드를 저장하며, REST API로 학습 카드에 접근할 수 있습니다.

## API

### 단어 카드

- 학습 상자에서 학습 카드 조회
  `GET /wordBox/:boxId`
- 학습 카드 생성
  `POST /wordBox`
  
``` json
{
    "word": "what you want to learn",
    "answer": "the answer"
}
```

- 학습 성공
  `GET /wordBox/succ/:id`
- 학습 실패
  `GET /wordBox/fail/:id`
- 단어 카드 수량 조회
  `GET /wordBox/board`
- 단어 카드 전체 삭제
  `GET /wordBox/deleteAll`

### 이미지 카드

- 학습 상자에서 학습 카드 조회
  `GET /imageBox/:boxId`
- 학습 카드 생성
  `POST /imageBox`
  
``` json
{
    "image": "what you want to learn",
    "answer": "the answer"
}
```

- 이미지 조회
  `GET /imageBox/image/:filename`
- 학습 성공
  `GET /imageBox/succ/:id`
- 학습 실패
  `GET /imageBox/fail/:id`
- 이미지 카드 수량 조회
  `GET /imageBox/board`
- 이미지 카드 전체 삭제
  `GET /imageBox/deleteAll`
---

## Get start

```
npm install
npm run start
```

---

## MySQL Schema
- `MySQL` >= 8.0.*

```
CREATE TABLE wordBox(
 id INT(8) NOT NULL AUTO_INCREMENT,
 word VARCHAR(255) NOT NULL,
 answer VARCHAR(255) NOT NULL,
 box_id INT(5) NOT NULL,
 updateAt DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(), 
 PRIMARY KEY(id)
);

CREATE TABLE imageBox(
 id INT(8) NOT NULL AUTO_INCREMENT,
 img_path VARCHAR(100) NOT NULL,
 answer VARCHAR(255) NOT NULL,
 box_id INT(5) NOT NULL, 
 updateAt DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(), 
 PRIMARY KEY(id)
);
```
