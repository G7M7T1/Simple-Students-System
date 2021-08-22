// require need
const ejs = require("ejs");
const chalk = require("chalk");
const express = require("express");
const mongoose = require("mongoose");
const Student = require("./models/student");

// static file here
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// connect mongoose
mongoose
  .connect("mongodb://localhost:27017/studentDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(chalk.green("Successfully connected to MongoDB"));
  })
  .catch((e) => {
    console.log("Connection failed");
    console.log(e);
  });

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/students", async (req, res) => {
  try {
    let data = await Student.find();
    res.render("students.ejs", { data });
  } catch {
    res.render("datanotfound.ejs");
  }
});

app.get("/students/insert", (req, res) => {
  res.render("studentInsert.ejs");
});

app.get("/students/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let data = await Student.findOne({ id });
    if (data !== null) {
      res.render("studentpage.ejs", { data });
    } else {
      res.render("idnotfound.ejs", { id });
    }
  } catch (e) {
    console.log(e);
  }
});

app.post("/students/insert", (req, res) => {
  let { id, name, age, merit, other } = req.body;
  let newStudent = new Student({
    id,
    name,
    age,
    scholarship: { merit, other },
  });
  newStudent
    .save()
    .then(() => {
      console.log("New Student data accepted");
      res.render("thanks.ejs");
    })
    .catch((e) => {
      console.log("data not accept");
      console.log(e);
      res.render("reject.ejs");
    });
});

app.get("/*", (req, res) => {
  res.status(404);
  res.render("404.ejs");
});

app.listen(3000, () => {
  console.log(`Server is running on port ${chalk.green(3000)}`);
});
