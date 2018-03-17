const express = require(`express`);
const app = express();
const bodyParser = require(`body-parser`);

const PORT = process.env.PORT || 6969;
let array = [];

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
    res.send({ success: true });
    console.log("added a new buzzword", body);
  } else {
    res.send({ success: false });
  }
});

app.put("/buzzwords", (req, res) => {
  console.log("editted a new buzzword");
  res.send();
});

app.delete("/buzzwords", (req, res) => {
  console.log("deleted a buzzword");
  res.send();
});

app.post("/rest", (req, res) => {
  console.log("reset everything");
  res.send();
});

app.post("/heard", (req, res) => {
  console.log("updated the score");
  res.send();
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
