const express = require(`express`);
const app = express();
const bodyParser = require(`body-parser`);

const PORT = process.env.PORT || 6969;
let array = [];
let score = 0;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(express.static(`public`));

// app.get(`/`, (req, res) => {
//   console.log("__dirname", __dirname);
//   res.sendFile(`index.html`, { root: __dirname });
// });

app.get("/buzzwords", (req, res) => {
  console.log("here's all the buzzwords :", array);
  res.json({ buzzWords: array });
});

app.post("/buzzwords", (req, res) => {
  const { body } = req;
  if (array.length < 5) {
    array.push(body);
    res.json({ success: true });
    console.log("added a new buzzword", body);
  } else {
    res.json({ success: false });
  }
});

app.put("/buzzwords", (req, res) => {
  const { body } = req;
  const editted = array.forEach((element, i) => {
    if (element.buzzWord === body.buzzWord) {
      array[i].points = Number(body.points);
      console.log("editted a value", editted);
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  });
});

app.delete("/buzzwords", (req, res) => {
  const { body } = req;
  const deleted = array.findIndex(
    element => element.buzzWord === body.buzzWord
  );
  if (deleted >= 0) {
    array.splice(deleted, 1);
    console.log("deleted a buzzword", deleted);
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.post("/reset", (req, res) => {
  array = [];
  score = 0;
  console.log("reset everything");
  res.json({ success: true });
});

app.post("/heard", (req, res) => {
  const { body } = req;
  const heard = array.filter(element => {
    if (element.buzzWord === body.buzzWord) {
      score = Number(score) + Number(element.points);
      console.log("updated the score", heard);
      res.json({ totalScore: heard });
    } else {
      res.json({ totalScore: false });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
