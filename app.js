const express = require(`express`);
const app = express();
const bodyParser = require(`body-parser`);

const PORT = process.env.PORT || 6969;

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(express.static(`public`));

app.get(`/`, (req, res) => {
  res.sendFile(`index.html`, { root: __dirname });
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
