const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const config = require("./config/key");
const { User } = require("./models/User");

//app에서 body 에 데이터를 바로 접근하기 위한 라이브러리
app.use(bodyParser.urlencoded({ extended: true }));
//application/json
app.use(bodyParser.json());

const mongoose = require("mongoose");

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("mongoDB 연결되었습니다..");
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World! 여러분들 정말 반갑다고 생각합니다. 안녕하세요");
});

app.post("/register", (req, res) => {
  //회원 가입 할때 필요한 정보들을 client에서 가저오면
  //그것들을 데이터 베이스에 넣어준다.

  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.listen(port, () => console.log(`${port}:서버 열림`));
