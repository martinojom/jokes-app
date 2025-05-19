import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

const API_URL = "https://v2.jokeapi.dev/joke";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "/Any");
    res.render("index.ejs", {
      setup: result.data.setup ?? "",
      delivery: result.data.delivery ?? "",
      joke: result.data.joke ?? "",
    });
  } catch (error) {
    res.render("index.ejs", error.response.data);
  }
});

app.post("/get-joke", async (req, res) => {
  const category = req.body.category;
  const type = req.body.type;
  const flags = req.body.flags;

  console.log(req.body);
  try {
    const result = await axios.get(
      `${API_URL}/${category}?type=${type}&flags=${flags}`
    );
    console.log(result);
    res.render("index.ejs", {
      setup: result.data.setup ?? "",
      delivery: result.data.delivery ?? "",
      joke: result.data.joke ?? "",
    });
  } catch (error) {
    res.render("index.ejs", error.response.data);
  }
});

app.listen(port, () => {
  console.log(`Server listening on Port ${port}`);
});
