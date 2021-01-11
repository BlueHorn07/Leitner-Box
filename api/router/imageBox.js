const express = require('express');
const fs = require('fs');
const multer = require('multer')
const mysql = require('mysql');
const path = require("path");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "image/");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  }
})
const upload = multer({storage: storage});

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
})

router.get('/board', async (req, res) => {
  const board = {}
  db.query(`SELECT * FROM imageBox WHERE box_id='1'`, (err, data) => {
    board[1] = data.length;
    db.query(`SELECT * FROM imageBox WHERE box_id='2'`, (err, data) => {
      board[2] = data.length;
      db.query(`SELECT * FROM imageBox WHERE box_id='3'`, (err, data) => {
        board[3] = data.length;
        db.query(`SELECT * FROM imageBox WHERE box_id='4'`, (err, data) => {
          board[4] = data.length;
          db.query(`SELECT * FROM imageBox WHERE box_id='5'`, (err, data) => {
            board[5] = data.length;
            res.send(board);
            res.end();
          });
        });
      });
    });
  });
})

router.get("/deleteAll", (req, res) => {
  const _directory = path.join(__dirname, "../image");
  fs.readdir(_directory, (err, files) => {
    if (err) throw err;
    for (const file of files) {
      fs.unlink(path.join(_directory, file), (err) => {
        if (err) throw err
        db.query(`DELETE FROM imageBox`, (err, data) => {
          res.send("Delete All Image Cards Complete!");
          res.end();
        });
      });
    }
  });
})

// GET word from specific box
router.get("/:boxId", (req, res) => {
  db.query(`SELECT * FROM imageBox WHERE box_id='${req.params.boxId}'`, (err, data) => {
    if (err) throw err;
    if (data.length !== 0) {
      data = data[0];
      res.send(data);
    } else {
      res.status(204)
    }
    res.end();
  });
});

router.get("/image/:filename", (req, res) => {
  res.sendFile(path.join(__dirname, '../image', req.params.filename));
})


// POST a new word card to 1st word box
router.post("/", upload.single('image'), (req, res) => {
  if (req.body) {
    db.query(`INSERT INTO imageBox (img_path, answer, box_id) VALUES ('${req.file.filename}', '${req.body.answer}', '1')`, (err, data) => {
      if (err) throw err;
      res.end();
    });
  }
});


// MOVE card to next box
router.get("/succ/:id", (req, res) => {
  // GET card's box id
  db.query(`SELECT * FROM imageBox WHERE id='${req.params.id}'`, (err, data) => {
    if (err) throw err;
    data = data[0];
    if (data.box_id != 5) {
      db.query(`UPDATE imageBox SET box_id='${data.box_id + 1}' WHERE id='${req.params.id}'`, (err, data) => {
        if (err) throw err;
        res.end();
      });
    } else {
      fs.unlink(path.join(__dirname, '../image', data.img_path), (err) => {
        db.query(`DELETE FROM imageBox WHERE id='${req.params.id}'`, (err, data) => {
          if (err) throw err;
          res.end();
        });
      });
    }
  })
})


// MOVE box to the 1st box
router.get("/fail/:id", (req, res) => {
  db.query(`UPDATE imageBox SET box_id='1' WHERE id='${req.params.id}'`, (err, data) => {
    if (err) throw err;
    res.end();
  });
})

router.get("/deleteAll", (req, res) => {
  db.query(`DELETE FROM imageBox`, (err, data) => {
    res.end();
  })
})

module.exports = router

