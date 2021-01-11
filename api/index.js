const express = require('express');
const cors = require('cors');
require('dotenv').config();

const wordBoxRouter = require('./router/wordBox.js');
const imageBoxRouter = require('./router/imageBox.js');

const app = express();
app.use(express.static("image"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use("/wordBox", wordBoxRouter)
app.use("/imageBox", imageBoxRouter)

app.get("/", (req, res) => {
  res.send("Hello world!");
  res.end();
})

app.listen(process.env.PORT)
