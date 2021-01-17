const express = require('express');
const mysql = require('mysql');
const router = express.Router();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
})

router.get('/board', async (req, res) => {
  const board = {}
  db.query(`SELECT * FROM wordBox WHERE box_id='1'`, (err, data) => {
    board[1] = data.length;
    db.query(`SELECT * FROM wordBox WHERE box_id='2'`, (err, data) => {
      board[2] = data.length;
      db.query(`SELECT * FROM wordBox WHERE box_id='3'`, (err, data) => {
        board[3] = data.length;
        db.query(`SELECT * FROM wordBox WHERE box_id='4'`, (err, data) => {
          board[4] = data.length;
          db.query(`SELECT * FROM wordBox WHERE box_id='5'`, (err, data) => {
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
  db.query(`DELETE FROM wordBox`, (err, data) => {
    res.send("Delete All Word Cards Complete!");
    res.end();
  })
})

// GET word from specific box
router.get("/:boxId", (req, res) => {
  db.query(`SELECT * FROM wordBox WHERE box_id='${req.params.boxId}' ORDER BY updateAt`, (err, data) => {
    if (err) throw err;
    if (data.length !== 0) {
      res.send(JSON.stringify(data[0]))
    } else {
      res.status(204)
    }
    res.end();
  });
});


// POST a new word card to 1st word box
router.post("/", (req, res) => {
  const body = req.body;
  if (body) {
    db.query(`INSERT INTO wordBox (word, answer, box_id) VALUES ('${body.word}', '${body.answer}', '1')`, (err, data) => {
      if (err) throw err;
      res.end();
    });
  }
});


// MOVE card to next box
router.get("/succ/:id", (req, res) => {
  // GET card's box id
  db.query(`SELECT * FROM wordBox WHERE id='${req.params.id}'`, (err, data) => {
    if (err) throw err;
    data = data[0];
    if (data.box_id != 5) {
      db.query(`UPDATE wordBox SET box_id='${data.box_id + 1}' WHERE id='${req.params.id}'`, (err, data) => {
        if (err) throw err;
        res.end();
      });
    } else {
      db.query(`DELETE FROM wordBox WHERE id='${req.params.id}'`, (err, data) => {
        if (err) throw err;
        res.end();
      });
    }
  })
})


// MOVE box to the 1st box
router.get("/fail/:id", (req, res) => {
  db.query(`UPDATE wordBox SET box_id=1, updateAt=NOW() WHERE id='${req.params.id}'`, (err, data) => {
    if (err) throw err;
    res.end();
  });
})


module.exports = router

